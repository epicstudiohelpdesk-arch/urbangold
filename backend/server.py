from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import Any, Dict, List
import uuid
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'change-this-secret-in-production')
JWT_ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get('ACCESS_TOKEN_EXPIRE_MINUTES', '180'))
ADMIN_USERNAME = os.environ.get('AUTH_ADMIN_USERNAME', '').strip()
ADMIN_PASSWORD = os.environ.get('AUTH_ADMIN_PASSWORD', '')
ADMIN_PASSWORD_HASH = os.environ.get('AUTH_ADMIN_PASSWORD_HASH')
SYSTEM_ADMIN_ENABLED = bool(ADMIN_USERNAME and (ADMIN_PASSWORD_HASH or ADMIN_PASSWORD))
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
auth_scheme = HTTPBearer(auto_error=False)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class AuthUser(BaseModel):
    username: str
    role: str = 'admin'

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'
    expires_at: datetime
    user: AuthUser

class BackendDashboard(BaseModel):
    user: AuthUser
    generated_at: datetime
    status_check_count: int

def verify_admin_credentials(username: str, password: str) -> bool:
    if not SYSTEM_ADMIN_ENABLED:
        return False

    if username.strip() != ADMIN_USERNAME:
        return False

    if ADMIN_PASSWORD_HASH:
        try:
            return pwd_context.verify(password, ADMIN_PASSWORD_HASH)
        except Exception:
            return False

    return password == ADMIN_PASSWORD

def create_access_token(username: str, role: str = 'admin') -> tuple[str, datetime]:
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {'sub': username, 'role': role, 'exp': expires_at}
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return token, expires_at

def decode_access_token(token: str) -> Dict[str, Any]:
    try:
        return jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid or expired token'
        ) from exc

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)
) -> AuthUser:
    if credentials is None or credentials.scheme.lower() != 'bearer':
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Authentication required'
        )

    payload = decode_access_token(credentials.credentials)
    username = payload.get('sub')
    role = payload.get('role', 'admin')

    if not SYSTEM_ADMIN_ENABLED or username != ADMIN_USERNAME:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid token subject'
        )

    return AuthUser(username=username, role=role)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post('/auth/login', response_model=LoginResponse)
async def login(input: LoginRequest):
    if not verify_admin_credentials(input.username, input.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid username or password'
        )

    access_token, expires_at = create_access_token(username=ADMIN_USERNAME, role='admin')
    user = AuthUser(username=ADMIN_USERNAME, role='admin')
    return LoginResponse(access_token=access_token, expires_at=expires_at, user=user)

@api_router.get('/auth/me', response_model=AuthUser)
async def auth_me(current_user: AuthUser = Depends(get_current_user)):
    return current_user

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.get('/admin/dashboard', response_model=BackendDashboard)
async def get_backend_dashboard(current_user: AuthUser = Depends(get_current_user)):
    status_check_count = 0

    try:
        status_check_count = await db.status_checks.count_documents({})
    except Exception:
        logging.getLogger(__name__).warning(
            'MongoDB unavailable while loading backend dashboard; returning count=0'
        )

    return BackendDashboard(
        user=current_user,
        generated_at=datetime.now(timezone.utc),
        status_check_count=status_check_count
    )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
