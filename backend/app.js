const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const dns = require('dns').promises;
const { domainToASCII } = require('url');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const isVercelRuntime = process.env.VERCEL === '1' || Boolean(process.env.VERCEL_URL);

dotenv.config({ path: path.join(__dirname, '.env') });

const POSTGRES_CONNECTION_STRING = String(
  process.env.AUTH_DATABASE_URL
  || process.env.DATABASE_URL
  || process.env.POSTGRES_URL
  || ''
).trim();
const POSTGRES_POOL_MAX = Math.max(1, Number(process.env.POSTGRES_POOL_MAX || 4));
const POSTGRES_SSL_MODE = String(process.env.POSTGRES_SSL_MODE || '').trim().toLowerCase();
const POSTGRES_INIT_MAX_RETRIES = Math.max(1, Number(process.env.POSTGRES_INIT_MAX_RETRIES || 4));
const POSTGRES_INIT_RETRY_DELAY_MS = Math.max(250, Number(process.env.POSTGRES_INIT_RETRY_DELAY_MS || 800));

let PgPool = null;
if (POSTGRES_CONNECTION_STRING) {
  try {
    ({ Pool: PgPool } = require('pg'));
  } catch (error) {
    console.warn('[storage] pg module unavailable, cannot use Postgres storage');
  }
}

let sqlite3 = null;
if (!POSTGRES_CONNECTION_STRING && !isVercelRuntime) {
  try {
    sqlite3 = require('sqlite3').verbose();
  } catch (error) {
    console.warn('[storage] sqlite3 module unavailable, using in-memory storage');
  }
} else if (!POSTGRES_CONNECTION_STRING && isVercelRuntime) {
  console.warn('[storage] Vercel runtime detected, using in-memory storage');
}

if (POSTGRES_CONNECTION_STRING && !PgPool) {
  console.warn('[storage] Postgres URL configured but pg module is unavailable; using in-memory storage');
}

const app = express();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'change-this-secret-in-production';
const ACCESS_TOKEN_EXPIRE_MINUTES = Number(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || 180);
const AUTH_RESET_TOKEN_EXPIRE_MINUTES = Number(process.env.AUTH_RESET_TOKEN_EXPIRE_MINUTES || 30);
const AUTH_EXPOSE_RESET_TOKEN = process.env.AUTH_EXPOSE_RESET_TOKEN === '1';
const AUTH_FRONTEND_URL = String(process.env.AUTH_FRONTEND_URL || process.env.FRONTEND_URL || '')
  .trim()
  .replace(/\/+$/, '');
const AUTH_ENABLE_RATE_LIMIT = process.env.AUTH_ENABLE_RATE_LIMIT !== '0';
const AUTH_RATE_LIMIT_WINDOW_MINUTES = Number(process.env.AUTH_RATE_LIMIT_WINDOW_MINUTES || 15);
const AUTH_RATE_LIMIT_WINDOW_MS = Math.max(1, AUTH_RATE_LIMIT_WINDOW_MINUTES) * 60 * 1000;
const AUTH_LOCKOUT_MINUTES = Number(process.env.AUTH_LOCKOUT_MINUTES || 15);
const AUTH_LOCKOUT_MS = Math.max(1, AUTH_LOCKOUT_MINUTES) * 60 * 1000;
const AUTH_LOGIN_MAX_ATTEMPTS = Number(process.env.AUTH_LOGIN_MAX_ATTEMPTS || 6);
const AUTH_SIGNUP_MAX_ATTEMPTS = Number(process.env.AUTH_SIGNUP_MAX_ATTEMPTS || 8);
const AUTH_FORGOT_MAX_ATTEMPTS = Number(process.env.AUTH_FORGOT_MAX_ATTEMPTS || 6);
const AUTH_RESET_MAX_ATTEMPTS = Number(process.env.AUTH_RESET_MAX_ATTEMPTS || 8);
const AUTH_EMAIL_EXISTENCE_CHECK = process.env.AUTH_EMAIL_EXISTENCE_CHECK !== '0';
const AUTH_EMAIL_EXISTENCE_TIMEOUT_MS = Math.max(
  600,
  Number(process.env.AUTH_EMAIL_EXISTENCE_TIMEOUT_MS || 3500)
);
const AUTH_EMAIL_EXISTENCE_CACHE_SECONDS = Math.max(
  0,
  Number(process.env.AUTH_EMAIL_EXISTENCE_CACHE_SECONDS || 900)
);
const AUTH_EMAIL_EXISTENCE_CACHE_MS = AUTH_EMAIL_EXISTENCE_CACHE_SECONDS * 1000;
const AUTH_EMAIL_EXISTENCE_CACHE_MAX = Math.max(
  128,
  Number(process.env.AUTH_EMAIL_EXISTENCE_CACHE_MAX || 4096)
);

const RESEND_API_KEY = String(process.env.RESEND_API_KEY || '').trim();
const AUTH_EMAIL_FROM = String(process.env.AUTH_EMAIL_FROM || '').trim();
const AUTH_EMAIL_REPLY_TO = String(process.env.AUTH_EMAIL_REPLY_TO || '').trim();
const ADMIN_USERNAME = String(process.env.AUTH_ADMIN_USERNAME || '').trim();
const ADMIN_PASSWORD = String(process.env.AUTH_ADMIN_PASSWORD || '');
const ADMIN_PASSWORD_HASH = (process.env.AUTH_ADMIN_PASSWORD_HASH || '').trim();
const SYSTEM_ADMIN_ENABLED = Boolean(
  ADMIN_USERNAME && (ADMIN_PASSWORD_HASH || ADMIN_PASSWORD)
);
const FOUNDER_DEFAULT_USERNAME = String(process.env.FOUNDER_USERNAME || 'SUBHAM DAS').trim();
const FOUNDER_DEFAULT_EMAIL = String(process.env.FOUNDER_EMAIL || 'subhamdasholycross2023@gmail.com').trim();
const FOUNDER_DEFAULT_PASSWORD = String(process.env.FOUNDER_PASSWORD || 'Sd1234www@1');
const FOUNDER_DEFAULT_PASSWORD_HASH = String(process.env.FOUNDER_PASSWORD_HASH || '').trim();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[a-z0-9][a-z0-9._-]{2,31}$/;
const ACCOUNT_TYPE_OPTIONS = [
  'FOUNDER',
  'Management',
  'Investor',
  'Scrap Supplier',
  'Chemical Supplier',
];
const DEFAULT_ACCOUNT_TYPE = ACCOUNT_TYPE_OPTIONS.find((item) => item !== 'FOUNDER') || ACCOUNT_TYPE_OPTIONS[0];
const ACCOUNT_TYPE_LOOKUP = new Map(
  ACCOUNT_TYPE_OPTIONS.map((item) => [item.toLowerCase(), item])
);

if (!SYSTEM_ADMIN_ENABLED) {
  console.warn('[auth] System admin login is disabled (AUTH_ADMIN_* not configured).');
}

const configuredDbPath = process.env.SQLITE_DB_PATH || (isVercelRuntime ? '/tmp/urban_gold.db' : './data/urban_gold.db');
const dbPath = path.isAbsolute(configuredDbPath)
  ? configuredDbPath
  : path.join(__dirname, configuredDbPath);
let db = null;
let pgPool = null;
let useMemoryStore = false;
let storageFailureReason = '';
const memoryStatusChecks = [];
const memoryUsers = [];
const memoryPasswordResetTokens = [];
const authRateLimitStore = new Map();
const emailDomainExistenceCache = new Map();

function hasPersistentStore() {
  return Boolean(pgPool || db);
}

function getStorageMode() {
  if (useMemoryStore || !hasPersistentStore()) return 'memory';
  if (pgPool) return 'postgres';
  return 'sqlite';
}

function enableMemoryStore(reason) {
  if (useMemoryStore) return;
  useMemoryStore = true;
  if (reason && !storageFailureReason) {
    storageFailureReason = String(reason);
  }
  console.warn(`[storage] Switching to in-memory mode: ${reason}`);
}

function disablePersistentStore(reason, error = null) {
  if (db && typeof db.close === 'function') {
    try {
      db.close();
    } catch (error) {
      console.warn('[storage] Failed closing sqlite connection:', error);
    }
  }
  db = null;

  if (pgPool) {
    const pool = pgPool;
    pgPool = null;
    pool.end().catch((error) => {
      console.warn('[storage] Failed closing postgres pool:', error);
    });
  }

  const normalizedReason = String(reason || '').trim();
  if (normalizedReason && !storageFailureReason) {
    const errorMessage = String(error?.message || '').trim();
    storageFailureReason = errorMessage ? `${normalizedReason}: ${errorMessage}` : normalizedReason;
  }

  enableMemoryStore(reason);
}

function shouldUsePostgresSsl(connectionString) {
  if (POSTGRES_SSL_MODE === 'disable' || POSTGRES_SSL_MODE === 'false' || POSTGRES_SSL_MODE === '0') {
    return false;
  }
  if (POSTGRES_SSL_MODE === 'require' || POSTGRES_SSL_MODE === 'true' || POSTGRES_SSL_MODE === '1') {
    return true;
  }

  try {
    const parsed = new URL(connectionString);
    const host = String(parsed.hostname || '').toLowerCase();
    return !(host === 'localhost' || host === '127.0.0.1');
  } catch (error) {
    return true;
  }
}

if (POSTGRES_CONNECTION_STRING && PgPool) {
  try {
    const sslEnabled = shouldUsePostgresSsl(POSTGRES_CONNECTION_STRING);
    pgPool = new PgPool({
      connectionString: POSTGRES_CONNECTION_STRING,
      max: POSTGRES_POOL_MAX,
      connectionTimeoutMillis: 15000,
      idleTimeoutMillis: 30000,
      ssl: sslEnabled ? { rejectUnauthorized: false } : false,
    });
    console.log('[storage] Postgres storage configured');
  } catch (error) {
    console.error('[storage] Failed to initialize Postgres pool:', error);
    disablePersistentStore('postgres setup failed', error);
  }
}

if (!pgPool && sqlite3) {
  try {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    db = new sqlite3.Database(dbPath, (error) => {
      if (error) {
        console.error('[storage] Failed to open sqlite database:', error);
        disablePersistentStore('sqlite open failed', error);
      }
    });
  } catch (error) {
    console.error('[storage] Failed to prepare sqlite path:', error);
    disablePersistentStore('sqlite path setup failed', error);
  }
}

if (!pgPool && !db) {
  enableMemoryStore(POSTGRES_CONNECTION_STRING ? 'persistent database unavailable' : 'sqlite3 unavailable');
}

const corsOrigins = (process.env.CORS_ORIGINS || '*')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

app.use(express.json({ limit: '1mb' }));
app.use(cors({
  origin: corsOrigins.includes('*') ? true : corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

function toPostgresSql(sql) {
  let index = 0;
  return String(sql).replace(/\?/g, () => {
    index += 1;
    return `$${index}`;
  });
}

async function runPostgresQuery(sql, params = []) {
  if (!pgPool) {
    throw new Error('postgres pool unavailable');
  }
  const text = toPostgresSql(sql);
  return pgPool.query(text, params);
}

function runSql(sql, params = []) {
  if (pgPool) {
    return runPostgresQuery(sql, params);
  }

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('persistent database unavailable'));
      return;
    }

    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
    });
  });
}

function getSql(sql, params = []) {
  if (pgPool) {
    return runPostgresQuery(sql, params).then((result) => result.rows[0]);
  }

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('persistent database unavailable'));
      return;
    }

    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

function allSql(sql, params = []) {
  if (pgPool) {
    return runPostgresQuery(sql, params).then((result) => result.rows);
  }

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('persistent database unavailable'));
      return;
    }

    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.max(0, Number(ms) || 0));
  });
}

async function initializePersistentSchema() {
  await runSql(`
    CREATE TABLE IF NOT EXISTS status_checks (
      id TEXT PRIMARY KEY,
      client_name TEXT NOT NULL,
      timestamp TEXT NOT NULL
    )
  `);

  await runSql(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT,
      provider TEXT NOT NULL DEFAULT 'local',
      account_type TEXT NOT NULL DEFAULT '${DEFAULT_ACCOUNT_TYPE}',
      role TEXT NOT NULL DEFAULT 'user',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      last_login_at TEXT
    )
  `);

  await runSql('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
  await runSql('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)');
  try {
    await runSql(`ALTER TABLE users ADD COLUMN account_type TEXT NOT NULL DEFAULT '${DEFAULT_ACCOUNT_TYPE}'`);
  } catch (error) {
    if (!isDuplicateColumnError(error)) {
      throw error;
    }
  }
  await runSql(
    `
    UPDATE users
    SET account_type = ?
    WHERE account_type IS NULL
      OR TRIM(account_type) = ''
      OR LOWER(TRIM(account_type)) NOT IN (${ACCOUNT_TYPE_OPTIONS.map(() => '?').join(', ')})
    `,
    [DEFAULT_ACCOUNT_TYPE, ...ACCOUNT_TYPE_OPTIONS.map((item) => item.toLowerCase())]
  );

  await runSql(`
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      created_at TEXT NOT NULL
    )
  `);

  await runSql('CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_hash ON password_reset_tokens(token_hash)');
  await runSql('CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id)');
  try {
    await ensureFounderUser();
  } catch (error) {
    console.error('[auth] Founder seed initialization failed:', error);
  }
}

async function initializeDatabase() {
  if (useMemoryStore || !hasPersistentStore()) {
    try {
      await ensureFounderUser();
    } catch (error) {
      console.error('[auth] Founder seed initialization failed:', error);
    }
    return;
  }

  const maxAttempts = pgPool ? POSTGRES_INIT_MAX_RETRIES : 1;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await initializePersistentSchema();
      return;
    } catch (error) {
      const hasMoreAttempts = attempt < maxAttempts;
      if (hasMoreAttempts) {
        const delayMs = POSTGRES_INIT_RETRY_DELAY_MS * attempt;
        console.warn(
          `[storage] Database initialization attempt ${attempt}/${maxAttempts} failed: ${error?.message || error}. Retrying in ${delayMs}ms.`
        );
        await sleep(delayMs);
        continue;
      }

      console.error('[storage] Database initialization failed:', error);
      disablePersistentStore('database initialization failed', error);
    }
  }
}

async function insertStatusCheck(statusCheck) {
  if (useMemoryStore || !hasPersistentStore()) {
    memoryStatusChecks.unshift(statusCheck);
    if (memoryStatusChecks.length > 1000) {
      memoryStatusChecks.length = 1000;
    }
    return;
  }

  try {
    await runSql(
      'INSERT INTO status_checks (id, client_name, timestamp) VALUES (?, ?, ?)',
      [statusCheck.id, statusCheck.client_name, statusCheck.timestamp]
    );
  } catch (error) {
    console.error('[storage] Failed to insert into sqlite, using in-memory:', error);
    disablePersistentStore('database write failed');
    memoryStatusChecks.unshift(statusCheck);
    if (memoryStatusChecks.length > 1000) {
      memoryStatusChecks.length = 1000;
    }
  }
}

async function fetchStatusChecks() {
  if (useMemoryStore || !hasPersistentStore()) {
    return [...memoryStatusChecks];
  }

  try {
    return await allSql(
      'SELECT id, client_name, timestamp FROM status_checks ORDER BY timestamp DESC LIMIT 1000'
    );
  } catch (error) {
    console.error('[storage] Failed to read sqlite rows, using in-memory:', error);
    disablePersistentStore('database read failed');
    return [...memoryStatusChecks];
  }
}

async function countStatusChecks() {
  if (useMemoryStore || !hasPersistentStore()) {
    return memoryStatusChecks.length;
  }

  try {
    const row = await getSql('SELECT COUNT(*) as count FROM status_checks');
    return Number(row?.count || 0);
  } catch (error) {
    console.error('[storage] Failed to count sqlite rows, using in-memory:', error);
    disablePersistentStore('database count failed');
    return memoryStatusChecks.length;
  }
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeUsername(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '')
    .replace(/^[._-]+|[._-]+$/g, '')
    .slice(0, 32);
}

function normalizeAccountType(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (!normalized) return '';
  return ACCOUNT_TYPE_LOOKUP.get(normalized) || '';
}

function normalizeEmailDomain(value) {
  const rawDomain = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\.+$/g, '');
  if (!rawDomain) return '';
  return domainToASCII(rawDomain);
}

function parseEmailParts(value) {
  const normalizedEmail = normalizeEmail(value);
  const atIndex = normalizedEmail.lastIndexOf('@');
  if (atIndex <= 0 || atIndex >= normalizedEmail.length - 1) return null;
  const localPart = normalizedEmail.slice(0, atIndex);
  const domain = normalizeEmailDomain(normalizedEmail.slice(atIndex + 1));
  if (!localPart || !domain) return null;
  return {
    email: `${localPart}@${domain}`,
    localPart,
    domain,
  };
}

function isValidEmailDomain(domain) {
  const normalized = String(domain || '').trim().toLowerCase();
  if (!normalized || normalized.length > 253) return false;
  if (!/^[a-z0-9.-]+$/.test(normalized)) return false;
  if (normalized.startsWith('.') || normalized.endsWith('.') || normalized.includes('..')) return false;
  const labels = normalized.split('.');
  if (labels.length < 2) return false;
  return labels.every((label) => {
    if (!label || label.length > 63) return false;
    if (label.startsWith('-') || label.endsWith('-')) return false;
    return /^[a-z0-9-]+$/.test(label);
  });
}

function withTimeout(promise, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timeoutHandle = setTimeout(() => {
      const timeoutError = new Error('DNS lookup timed out');
      timeoutError.code = 'ETIMEOUT';
      reject(timeoutError);
    }, timeoutMs);

    promise.then(
      (value) => {
        clearTimeout(timeoutHandle);
        resolve(value);
      },
      (error) => {
        clearTimeout(timeoutHandle);
        reject(error);
      }
    );
  });
}

function classifyDnsError(error) {
  const code = String(error?.code || '').trim().toUpperCase();
  if (code === 'ENOTFOUND' || code === 'ENODATA' || code === 'ENONAME' || code === 'NXDOMAIN') {
    return 'missing';
  }
  if (
    code === 'ETIMEOUT'
    || code === 'EAI_AGAIN'
    || code === 'ESERVFAIL'
    || code === 'SERVFAIL'
    || code === 'ECONNREFUSED'
    || code === 'EREFUSED'
  ) {
    return 'transient';
  }
  return 'unknown';
}

function readEmailDomainCache(domain, nowMs = Date.now()) {
  if (!AUTH_EMAIL_EXISTENCE_CACHE_MS) return null;
  const entry = emailDomainExistenceCache.get(domain);
  if (!entry) return null;
  if (entry.expiresAtMs <= nowMs) {
    emailDomainExistenceCache.delete(domain);
    return null;
  }
  return entry;
}

function writeEmailDomainCache(domain, exists, nowMs = Date.now()) {
  if (!AUTH_EMAIL_EXISTENCE_CACHE_MS) return;
  const expiresAtMs = nowMs + AUTH_EMAIL_EXISTENCE_CACHE_MS;
  emailDomainExistenceCache.set(domain, { exists, expiresAtMs });

  if (emailDomainExistenceCache.size <= AUTH_EMAIL_EXISTENCE_CACHE_MAX) return;

  for (const [key, entry] of emailDomainExistenceCache.entries()) {
    if (!entry || entry.expiresAtMs <= nowMs) {
      emailDomainExistenceCache.delete(key);
    }
  }

  while (emailDomainExistenceCache.size > AUTH_EMAIL_EXISTENCE_CACHE_MAX) {
    const oldestKey = emailDomainExistenceCache.keys().next().value;
    if (!oldestKey) break;
    emailDomainExistenceCache.delete(oldestKey);
  }
}

async function resolveEmailDomainExists(domain) {
  let transientFailure = false;

  try {
    const mxRecords = await withTimeout(dns.resolveMx(domain), AUTH_EMAIL_EXISTENCE_TIMEOUT_MS);
    if (Array.isArray(mxRecords) && mxRecords.some((record) => String(record?.exchange || '').trim())) {
      return { exists: true, retryable: false };
    }
  } catch (error) {
    const classification = classifyDnsError(error);
    if (classification === 'transient' || classification === 'unknown') {
      transientFailure = true;
    }
  }

  const addressChecks = await Promise.allSettled([
    withTimeout(dns.resolve4(domain), AUTH_EMAIL_EXISTENCE_TIMEOUT_MS),
    withTimeout(dns.resolve6(domain), AUTH_EMAIL_EXISTENCE_TIMEOUT_MS),
  ]);

  for (const check of addressChecks) {
    if (check.status === 'fulfilled' && Array.isArray(check.value) && check.value.length > 0) {
      return { exists: true, retryable: false };
    }
    if (check.status === 'rejected') {
      const classification = classifyDnsError(check.reason);
      if (classification === 'transient' || classification === 'unknown') {
        transientFailure = true;
      }
    }
  }

  if (transientFailure) {
    return { exists: false, retryable: true };
  }

  return { exists: false, retryable: false };
}

async function validateExistingEmailAccount(value) {
  if (!AUTH_EMAIL_EXISTENCE_CHECK) {
    return { ok: true, email: normalizeEmail(value), skipped: true };
  }

  const parsed = parseEmailParts(value);
  if (!parsed || parsed.localPart.length > 64 || !isValidEmailDomain(parsed.domain)) {
    return {
      ok: false,
      retryable: false,
      detail: 'Provide a valid email address.',
    };
  }

  const cached = readEmailDomainCache(parsed.domain);
  if (cached) {
    if (cached.exists) {
      return { ok: true, email: parsed.email, cached: true };
    }
    return {
      ok: false,
      retryable: false,
      detail: 'Email account domain does not exist or cannot receive emails.',
    };
  }

  const lookup = await resolveEmailDomainExists(parsed.domain);
  if (lookup.exists) {
    writeEmailDomainCache(parsed.domain, true);
    return { ok: true, email: parsed.email };
  }

  if (lookup.retryable) {
    return {
      ok: false,
      retryable: true,
      detail: 'Email verification is temporarily unavailable. Please try again.',
    };
  }

  writeEmailDomainCache(parsed.domain, false);
  return {
    ok: false,
    retryable: false,
    detail: 'Email account domain does not exist or cannot receive emails.',
  };
}

function cloneRecord(record) {
  return record ? { ...record } : null;
}

function formatUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    email: user.email || null,
    role: user.role || 'user',
    provider: user.provider || 'local',
    account_type: normalizeAccountType(user.account_type) || DEFAULT_ACCOUNT_TYPE,
  };
}

function getSystemAdminUser() {
  return {
    id: 'system-admin',
    username: ADMIN_USERNAME,
    email: null,
    role: 'admin',
    provider: 'system',
    account_type: 'Management',
  };
}

const USER_SELECT_COLUMNS = [
  'id',
  'email',
  'username',
  'password_hash',
  'provider',
  'account_type',
  'role',
  'created_at',
  'updated_at',
  'last_login_at',
].join(', ');

function isStorageConstraintError(error) {
  const message = String(error?.message || '');
  const code = String(error?.code || '');
  return /SQLITE_CONSTRAINT/i.test(message) || /^23\d{3}$/.test(code);
}

function isDuplicateColumnError(error) {
  const message = String(error?.message || '');
  const code = String(error?.code || '');
  return /duplicate column name/i.test(message) || /already exists/i.test(message) || code === '42701';
}

function findMemoryUser(predicate) {
  const user = memoryUsers.find(predicate);
  return cloneRecord(user);
}

async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;

  if (useMemoryStore || !hasPersistentStore()) {
    return findMemoryUser((item) => item.email === normalizedEmail);
  }

  try {
    return await getSql(`SELECT ${USER_SELECT_COLUMNS} FROM users WHERE email = ? LIMIT 1`, [normalizedEmail]);
  } catch (error) {
    console.error('[auth] Failed reading user by email, using in-memory:', error);
    disablePersistentStore('auth email lookup failed');
    return findMemoryUser((item) => item.email === normalizedEmail);
  }
}

async function findUserByUsername(username) {
  const normalized = normalizeUsername(username);
  if (!normalized) return null;

  if (useMemoryStore || !hasPersistentStore()) {
    return findMemoryUser((item) => item.username === normalized);
  }

  try {
    return await getSql(`SELECT ${USER_SELECT_COLUMNS} FROM users WHERE username = ? LIMIT 1`, [normalized]);
  } catch (error) {
    console.error('[auth] Failed reading user by username, using in-memory:', error);
    disablePersistentStore('auth username lookup failed');
    return findMemoryUser((item) => item.username === normalized);
  }
}

async function findUserById(userId) {
  const normalized = String(userId || '').trim();
  if (!normalized) return null;

  if (useMemoryStore || !hasPersistentStore()) {
    return findMemoryUser((item) => item.id === normalized);
  }

  try {
    return await getSql(`SELECT ${USER_SELECT_COLUMNS} FROM users WHERE id = ? LIMIT 1`, [normalized]);
  } catch (error) {
    console.error('[auth] Failed reading user by id, using in-memory:', error);
    disablePersistentStore('auth id lookup failed');
    return findMemoryUser((item) => item.id === normalized);
  }
}

async function findUserByIdentifier(identifier) {
  const input = String(identifier || '').trim();
  if (!input) return null;

  if (input.includes('@')) {
    return findUserByEmail(input);
  }

  return findUserByUsername(input);
}

async function usernameExists(username) {
  const normalized = normalizeUsername(username);
  if (!normalized) return true;
  if (SYSTEM_ADMIN_ENABLED && normalized === normalizeUsername(ADMIN_USERNAME)) return true;
  const user = await findUserByUsername(normalized);
  return Boolean(user);
}

async function resolveUniqueUsername(seed) {
  const normalizedSeed = normalizeUsername(seed) || 'user';
  let candidate = normalizedSeed;
  let counter = 0;

  while (counter < 3000) {
    const exists = await usernameExists(candidate);
    if (!exists) return candidate;
    counter += 1;
    candidate = `${normalizedSeed}${counter}`;
  }

  return `user${Date.now()}`;
}

async function createUser({
  email,
  username,
  passwordHash = null,
  provider = 'local',
  accountType = DEFAULT_ACCOUNT_TYPE,
  role = 'user',
}) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedUsername = normalizeUsername(username);
  const normalizedAccountType = normalizeAccountType(accountType) || DEFAULT_ACCOUNT_TYPE;
  if (!normalizedEmail || !normalizedUsername) {
    throw new Error('email and username are required');
  }

  const nowIso = new Date().toISOString();
  const record = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    username: normalizedUsername,
    password_hash: passwordHash || null,
    provider,
    account_type: normalizedAccountType,
    role,
    created_at: nowIso,
    updated_at: nowIso,
    last_login_at: null,
  };

  if (useMemoryStore || !hasPersistentStore()) {
    const duplicateEmail = memoryUsers.some((item) => item.email === record.email);
    const duplicateUsername = memoryUsers.some((item) => item.username === record.username);

    if (duplicateEmail || duplicateUsername) {
      const duplicateError = new Error('duplicate user');
      duplicateError.code = 'DUPLICATE_USER';
      throw duplicateError;
    }

    memoryUsers.push(record);
    return cloneRecord(record);
  }

  try {
    await runSql(
      `
      INSERT INTO users (
        id, email, username, password_hash, provider, account_type, role, created_at, updated_at, last_login_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        record.id,
        record.email,
        record.username,
        record.password_hash,
        record.provider,
        record.account_type,
        record.role,
        record.created_at,
        record.updated_at,
        record.last_login_at,
      ]
    );
    return await findUserById(record.id);
  } catch (error) {
    if (isStorageConstraintError(error)) {
      throw error;
    }

    console.error('[auth] Failed creating user in sqlite, using in-memory:', error);
    disablePersistentStore('auth create user failed');
    memoryUsers.push(record);
    return cloneRecord(record);
  }
}

async function ensureFounderUser() {
  const founderEmail = normalizeEmail(FOUNDER_DEFAULT_EMAIL);
  const usernameSeed = FOUNDER_DEFAULT_USERNAME || founderEmail.split('@')[0] || 'founder';
  const founderUsername = normalizeUsername(usernameSeed) || 'founder';
  const passwordPolicyError = FOUNDER_DEFAULT_PASSWORD_HASH
    ? null
    : validatePasswordPolicy(FOUNDER_DEFAULT_PASSWORD);

  if (!founderEmail || !EMAIL_PATTERN.test(founderEmail)) {
    console.warn('[auth] Founder seed skipped: invalid FOUNDER_EMAIL');
    return;
  }

  if (passwordPolicyError) {
    console.warn(`[auth] Founder seed skipped: ${passwordPolicyError}`);
    return;
  }

  const founderPasswordHash = FOUNDER_DEFAULT_PASSWORD_HASH || hashPassword(FOUNDER_DEFAULT_PASSWORD);
  const existingByEmail = await findUserByEmail(founderEmail);
  const existingByUsername = await findUserByUsername(founderUsername);

  if (existingByEmail && existingByUsername && existingByEmail.id !== existingByUsername.id) {
    console.warn('[auth] Founder seed skipped: email and username belong to different users.');
    return;
  }

  const existingUser = existingByEmail || existingByUsername;
  if (!existingUser) {
    await createUser({
      email: founderEmail,
      username: founderUsername,
      passwordHash: founderPasswordHash,
      provider: 'local',
      accountType: 'FOUNDER',
      role: 'user',
    });
    return;
  }

  const nowIso = new Date().toISOString();
  if (useMemoryStore || !hasPersistentStore()) {
    const memoryIndex = memoryUsers.findIndex((item) => item.id === existingUser.id);
    if (memoryIndex >= 0) {
      memoryUsers[memoryIndex] = {
        ...memoryUsers[memoryIndex],
        email: founderEmail,
        username: founderUsername,
        password_hash: founderPasswordHash,
        provider: 'local',
        account_type: 'FOUNDER',
        updated_at: nowIso,
      };
    }
    return;
  }

  await runSql(
    `
    UPDATE users
    SET email = ?, username = ?, password_hash = ?, provider = ?, account_type = ?, updated_at = ?
    WHERE id = ?
    `,
    [founderEmail, founderUsername, founderPasswordHash, 'local', 'FOUNDER', nowIso, existingUser.id]
  );
}

async function updateUserLastLogin(userId) {
  const normalized = String(userId || '').trim();
  if (!normalized) return;
  const nowIso = new Date().toISOString();

  if (useMemoryStore || !hasPersistentStore()) {
    const idx = memoryUsers.findIndex((item) => item.id === normalized);
    if (idx >= 0) {
      memoryUsers[idx].last_login_at = nowIso;
      memoryUsers[idx].updated_at = nowIso;
    }
    return;
  }

  try {
    await runSql('UPDATE users SET last_login_at = ?, updated_at = ? WHERE id = ?', [nowIso, nowIso, normalized]);
  } catch (error) {
    console.error('[auth] Failed updating last login, using in-memory:', error);
    disablePersistentStore('auth update last login failed');
    const idx = memoryUsers.findIndex((item) => item.id === normalized);
    if (idx >= 0) {
      memoryUsers[idx].last_login_at = nowIso;
      memoryUsers[idx].updated_at = nowIso;
    }
  }
}

async function updateUserPassword(userId, passwordHash) {
  const normalized = String(userId || '').trim();
  if (!normalized || !passwordHash) return;
  const nowIso = new Date().toISOString();

  if (useMemoryStore || !hasPersistentStore()) {
    const idx = memoryUsers.findIndex((item) => item.id === normalized);
    if (idx >= 0) {
      memoryUsers[idx].password_hash = passwordHash;
      memoryUsers[idx].provider = 'local';
      memoryUsers[idx].updated_at = nowIso;
    }
    return;
  }

  try {
    await runSql(
      'UPDATE users SET password_hash = ?, provider = ?, updated_at = ? WHERE id = ?',
      [passwordHash, 'local', nowIso, normalized]
    );
  } catch (error) {
    console.error('[auth] Failed updating password, using in-memory:', error);
    disablePersistentStore('auth update password failed');
    const idx = memoryUsers.findIndex((item) => item.id === normalized);
    if (idx >= 0) {
      memoryUsers[idx].password_hash = passwordHash;
      memoryUsers[idx].provider = 'local';
      memoryUsers[idx].updated_at = nowIso;
    }
  }
}

function hashResetToken(token) {
  return crypto.createHash('sha256').update(String(token || ''), 'utf8').digest('hex');
}

async function prunePasswordResetTokens() {
  const nowIso = new Date().toISOString();
  const usedCutoffIso = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  if (useMemoryStore || !hasPersistentStore()) {
    for (let idx = memoryPasswordResetTokens.length - 1; idx >= 0; idx -= 1) {
      const token = memoryPasswordResetTokens[idx];
      if (token.expires_at < nowIso || (token.used_at && token.used_at < usedCutoffIso)) {
        memoryPasswordResetTokens.splice(idx, 1);
      }
    }
    return;
  }

  try {
    await runSql(
      `
      DELETE FROM password_reset_tokens
      WHERE expires_at < ? OR (used_at IS NOT NULL AND used_at < ?)
      `,
      [nowIso, usedCutoffIso]
    );
  } catch (error) {
    console.error('[auth] Failed pruning reset tokens:', error);
    disablePersistentStore('auth prune reset tokens failed');
  }
}

async function createPasswordResetToken(userId) {
  const normalizedUserId = String(userId || '').trim();
  if (!normalizedUserId) return null;

  await prunePasswordResetTokens();

  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashResetToken(rawToken);
  const expiresAtIso = new Date(Date.now() + AUTH_RESET_TOKEN_EXPIRE_MINUTES * 60 * 1000).toISOString();
  const createdAtIso = new Date().toISOString();

  const record = {
    id: crypto.randomUUID(),
    user_id: normalizedUserId,
    token_hash: tokenHash,
    expires_at: expiresAtIso,
    used_at: null,
    created_at: createdAtIso,
  };

  if (useMemoryStore || !hasPersistentStore()) {
    memoryPasswordResetTokens.push(record);
    return { token: rawToken, expiresAt: expiresAtIso };
  }

  try {
    await runSql(
      `
      INSERT INTO password_reset_tokens (id, user_id, token_hash, expires_at, used_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [record.id, record.user_id, record.token_hash, record.expires_at, record.used_at, record.created_at]
    );
    return { token: rawToken, expiresAt: expiresAtIso };
  } catch (error) {
    console.error('[auth] Failed creating reset token, using in-memory:', error);
    disablePersistentStore('auth create reset token failed');
    memoryPasswordResetTokens.push(record);
    return { token: rawToken, expiresAt: expiresAtIso };
  }
}

async function findPasswordResetTokenRecord(rawToken) {
  const tokenHash = hashResetToken(rawToken);
  const nowIso = new Date().toISOString();

  if (useMemoryStore || !hasPersistentStore()) {
    const record = memoryPasswordResetTokens.find(
      (item) => item.token_hash === tokenHash && !item.used_at && item.expires_at > nowIso
    );
    return cloneRecord(record);
  }

  try {
    return await getSql(
      `
      SELECT id, user_id, token_hash, expires_at, used_at, created_at
      FROM password_reset_tokens
      WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?
      LIMIT 1
      `,
      [tokenHash, nowIso]
    );
  } catch (error) {
    console.error('[auth] Failed reading reset token, using in-memory:', error);
    disablePersistentStore('auth read reset token failed');
    const record = memoryPasswordResetTokens.find(
      (item) => item.token_hash === tokenHash && !item.used_at && item.expires_at > nowIso
    );
    return cloneRecord(record);
  }
}

async function markPasswordResetTokenUsed(tokenId) {
  const normalizedTokenId = String(tokenId || '').trim();
  if (!normalizedTokenId) return;
  const usedAtIso = new Date().toISOString();

  if (useMemoryStore || !hasPersistentStore()) {
    const idx = memoryPasswordResetTokens.findIndex((item) => item.id === normalizedTokenId);
    if (idx >= 0) {
      memoryPasswordResetTokens[idx].used_at = usedAtIso;
    }
    return;
  }

  try {
    await runSql('UPDATE password_reset_tokens SET used_at = ? WHERE id = ?', [usedAtIso, normalizedTokenId]);
  } catch (error) {
    console.error('[auth] Failed marking reset token used, using in-memory:', error);
    disablePersistentStore('auth update reset token failed');
    const idx = memoryPasswordResetTokens.findIndex((item) => item.id === normalizedTokenId);
    if (idx >= 0) {
      memoryPasswordResetTokens[idx].used_at = usedAtIso;
    }
  }
}

const dbReady = initializeDatabase();

function sendBadRequest(res, detail) {
  return res.status(400).json({ detail });
}

function sendUnauthorized(res, detail) {
  return res.status(401).json({ detail });
}

function sendConflict(res, detail) {
  return res.status(409).json({ detail });
}

function sendTooManyRequests(res, retryAfterSeconds) {
  const safeRetryAfter = Math.max(1, Number(retryAfterSeconds) || 1);
  return res.status(429).json({
    detail: 'Too many authentication attempts. Please try again shortly.',
    retry_seconds: safeRetryAfter,
  });
}

function getAuthStorageInfo() {
  const mode = getStorageMode();
  const persistent = mode !== 'memory';
  const warning = mode === 'memory' && isVercelRuntime
    ? 'Temporary auth storage active on serverless runtime; users from previous deployments are unavailable.'
    : '';

  return {
    mode,
    persistent,
    warning,
    failure_reason: mode === 'memory' ? storageFailureReason : '',
  };
}

function getClientIp(req) {
  const forwardedFor = String(req.headers['x-forwarded-for'] || '')
    .split(',')[0]
    .trim();
  if (forwardedFor) return forwardedFor;
  return String(req.ip || req.socket?.remoteAddress || 'unknown');
}

function buildRateLimitKey(action, req, identifier = '') {
  const ip = getClientIp(req).toLowerCase();
  const normalizedIdentifier = String(identifier || '').trim().toLowerCase().slice(0, 96);
  return `${action}:${ip}:${normalizedIdentifier}`;
}

function pruneRateLimitStore(nowMs = Date.now()) {
  if (authRateLimitStore.size < 2000) return;

  for (const [key, entry] of authRateLimitStore.entries()) {
    const isWindowExpired = nowMs - entry.windowStartMs > AUTH_RATE_LIMIT_WINDOW_MS * 2;
    const isLockExpired = !entry.lockedUntilMs || entry.lockedUntilMs < nowMs;
    if (isWindowExpired && isLockExpired) {
      authRateLimitStore.delete(key);
    }
  }
}

function getActionMaxAttempts(action) {
  if (action === 'login') return Math.max(1, AUTH_LOGIN_MAX_ATTEMPTS);
  if (action === 'signup') return Math.max(1, AUTH_SIGNUP_MAX_ATTEMPTS);
  if (action === 'forgot') return Math.max(1, AUTH_FORGOT_MAX_ATTEMPTS);
  if (action === 'reset') return Math.max(1, AUTH_RESET_MAX_ATTEMPTS);
  return 5;
}

function getRateLimitState(action, rateKey) {
  if (!AUTH_ENABLE_RATE_LIMIT) {
    return {
      allowed: true,
      retryAfterSeconds: 0,
    };
  }

  pruneRateLimitStore();
  const nowMs = Date.now();
  const maxAttempts = getActionMaxAttempts(action);
  const entry = authRateLimitStore.get(rateKey);
  if (!entry) {
    return {
      allowed: true,
      retryAfterSeconds: 0,
      maxAttempts,
    };
  }

  if (entry.lockedUntilMs && entry.lockedUntilMs > nowMs) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.lockedUntilMs - nowMs) / 1000),
      maxAttempts,
    };
  }

  if (nowMs - entry.windowStartMs > AUTH_RATE_LIMIT_WINDOW_MS) {
    authRateLimitStore.delete(rateKey);
  }

  return {
    allowed: true,
    retryAfterSeconds: 0,
    maxAttempts,
  };
}

function recordRateLimitFailure(action, rateKey) {
  if (!AUTH_ENABLE_RATE_LIMIT) return 0;

  const nowMs = Date.now();
  const maxAttempts = getActionMaxAttempts(action);
  const existing = authRateLimitStore.get(rateKey);
  const entry = existing ? { ...existing } : {
    failures: 0,
    windowStartMs: nowMs,
    lockedUntilMs: 0,
  };

  if (nowMs - entry.windowStartMs > AUTH_RATE_LIMIT_WINDOW_MS) {
    entry.failures = 0;
    entry.windowStartMs = nowMs;
    entry.lockedUntilMs = 0;
  }

  entry.failures += 1;

  if (entry.failures >= maxAttempts) {
    entry.lockedUntilMs = nowMs + AUTH_LOCKOUT_MS;
  }

  authRateLimitStore.set(rateKey, entry);

  if (entry.lockedUntilMs > nowMs) {
    return Math.ceil((entry.lockedUntilMs - nowMs) / 1000);
  }

  return 0;
}

function clearRateLimitState(rateKey) {
  if (!AUTH_ENABLE_RATE_LIMIT) return;
  authRateLimitStore.delete(rateKey);
}

function timingSafeStringCompare(a, b) {
  const aBuf = Buffer.from(String(a), 'utf8');
  const bBuf = Buffer.from(String(b), 'utf8');
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const digest = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt.toString('hex')}$${digest.toString('hex')}`;
}

function verifyScryptHash(password, hashValue) {
  const [scheme, saltHex, digestHex] = String(hashValue || '').split('$');
  if (scheme !== 'scrypt' || !saltHex || !digestHex) return false;

  try {
    const salt = Buffer.from(saltHex, 'hex');
    const expectedDigest = Buffer.from(digestHex, 'hex');
    const derivedDigest = crypto.scryptSync(password, salt, expectedDigest.length);
    return crypto.timingSafeEqual(derivedDigest, expectedDigest);
  } catch (error) {
    return false;
  }
}

function verifyPasswordHash(password, hashValue) {
  const normalizedHash = String(hashValue || '').trim();
  if (!normalizedHash) return false;

  if (normalizedHash.startsWith('scrypt$')) {
    return verifyScryptHash(password || '', normalizedHash);
  }

  return timingSafeStringCompare(password || '', normalizedHash);
}

function verifyAdminCredentials(identifier, password) {
  if (!SYSTEM_ADMIN_ENABLED) return false;
  if (normalizeUsername(identifier) !== normalizeUsername(ADMIN_USERNAME)) return false;

  if (!ADMIN_PASSWORD_HASH) {
    return timingSafeStringCompare(password || '', ADMIN_PASSWORD);
  }

  return verifyPasswordHash(password || '', ADMIN_PASSWORD_HASH);
}

function validatePasswordPolicy(password) {
  const value = String(password || '');
  if (value.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  if (value.length > 128) {
    return 'Password must be 128 characters or fewer.';
  }
  if (!/[a-z]/.test(value)) {
    return 'Password must include at least one lowercase letter.';
  }
  if (!/[A-Z]/.test(value)) {
    return 'Password must include at least one uppercase letter.';
  }
  if (!/[0-9]/.test(value)) {
    return 'Password must include at least one number.';
  }
  return null;
}

function createAccessToken(user) {
  const expiresAtDate = new Date(Date.now() + ACCESS_TOKEN_EXPIRE_MINUTES * 60 * 1000);
  const payload = {
    sub: user.username,
    role: user.role || 'user',
    user_id: user.id || null,
    account_type: normalizeAccountType(user.account_type) || DEFAULT_ACCOUNT_TYPE,
    is_system_admin: user.provider === 'system',
  };
  if (user.email) {
    payload.email = user.email;
  }

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: `${ACCESS_TOKEN_EXPIRE_MINUTES}m`,
  });

  return {
    accessToken: token,
    expiresAt: expiresAtDate.toISOString(),
  };
}

function buildAuthResponse(user) {
  const token = createAccessToken(user);
  return {
    access_token: token.accessToken,
    token_type: 'bearer',
    expires_at: token.expiresAt,
    user: formatUser(user),
  };
}

function getBearerToken(req) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.toLowerCase().startsWith('bearer ')) return null;
  return authHeader.slice(7).trim();
}

async function requireAuth(req, res, next) {
  const token = getBearerToken(req);
  if (!token) {
    sendUnauthorized(res, 'Authentication required');
    return;
  }

  await dbReady.catch(() => {});

  let decoded = null;
  try {
    decoded = jwt.verify(token, JWT_SECRET_KEY, { algorithms: ['HS256'] });
  } catch (error) {
    sendUnauthorized(res, 'Invalid or expired token');
    return;
  }

  if (SYSTEM_ADMIN_ENABLED && (decoded?.is_system_admin || (decoded?.sub === ADMIN_USERNAME && !decoded?.user_id))) {
    req.user = getSystemAdminUser();
    next();
    return;
  }

  if (!decoded?.user_id) {
    sendUnauthorized(res, 'Invalid token payload');
    return;
  }

  const user = await findUserById(decoded.user_id);
  if (!user) {
    // In stateless/runtime-isolated environments, user storage may differ per request.
    // If the JWT is valid and carries core claims, continue with token claims.
    const fallbackUsername = normalizeUsername(decoded?.sub);
    if (!fallbackUsername) {
      sendUnauthorized(res, 'Invalid token subject');
      return;
    }

    req.user = formatUser({
      id: String(decoded.user_id),
      username: fallbackUsername,
      email: decoded?.email ? normalizeEmail(decoded.email) : null,
      role: String(decoded?.role || 'user'),
      provider: 'token',
      account_type: normalizeAccountType(decoded?.account_type) || DEFAULT_ACCOUNT_TYPE,
    });
    next();
    return;
  }

  req.user = formatUser(user);
  next();
}

function buildResetUrl(token) {
  if (!AUTH_FRONTEND_URL) return '';
  return `${AUTH_FRONTEND_URL}/login?mode=reset&token=${encodeURIComponent(token)}`;
}

async function sendTransactionalEmail({ to, subject, text, html }) {
  if (!RESEND_API_KEY || !AUTH_EMAIL_FROM) {
    return {
      sent: false,
      skipped: true,
      reason: 'email-provider-not-configured',
    };
  }

  if (typeof fetch !== 'function') {
    return {
      sent: false,
      skipped: true,
      reason: 'fetch-unavailable',
    };
  }

  const payload = {
    from: AUTH_EMAIL_FROM,
    to: [String(to || '').trim()],
    subject: String(subject || 'Urban Gold notification'),
    text: String(text || ''),
    html: String(html || ''),
  };

  if (AUTH_EMAIL_REPLY_TO) {
    payload.reply_to = AUTH_EMAIL_REPLY_TO;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let responseBody = '';
      try {
        responseBody = await response.text();
      } catch (error) {
        responseBody = '';
      }
      console.warn('[auth] Email provider rejected request:', response.status, responseBody);
      return {
        sent: false,
        skipped: false,
        reason: 'provider-rejected',
      };
    }

    return {
      sent: true,
      skipped: false,
      reason: '',
    };
  } catch (error) {
    console.warn('[auth] Failed to send transactional email:', error?.message || error);
    return {
      sent: false,
      skipped: false,
      reason: 'provider-network-error',
    };
  }
}

function buildPasswordResetEmail({ email, resetUrl, expiresAt }) {
  const safeResetUrl = String(resetUrl || '').trim();
  const expiryText = expiresAt ? new Date(expiresAt).toUTCString() : '';
  const subject = 'Urban Gold password reset';
  const text = [
    `Hi,`,
    '',
    `We received a request to reset the password for ${email}.`,
    safeResetUrl ? `Reset link: ${safeResetUrl}` : 'Reset link is unavailable.',
    expiryText ? `This link expires at: ${expiryText}` : '',
    '',
    `If you did not request this, you can ignore this email.`,
  ].filter(Boolean).join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
      <p>Hi,</p>
      <p>We received a request to reset the password for <strong>${email}</strong>.</p>
      ${safeResetUrl
        ? `<p><a href="${safeResetUrl}" style="display:inline-block;padding:10px 16px;border-radius:8px;background:#047857;color:#fff;text-decoration:none">Reset Password</a></p>`
        : '<p>Reset link is unavailable.</p>'}
      ${expiryText ? `<p>This link expires at: <strong>${expiryText}</strong></p>` : ''}
      <p>If you did not request this, you can ignore this email.</p>
    </div>
  `;

  return { subject, text, html };
}

app.get('/api/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.get('/api/auth/providers', async (req, res) => {
  await dbReady.catch(() => {});
  res.json({
    password_reset: {
      enabled: true,
      token_expires_minutes: AUTH_RESET_TOKEN_EXPIRE_MINUTES,
      email_delivery_enabled: Boolean(RESEND_API_KEY && AUTH_EMAIL_FROM),
    },
    security: {
      rate_limit_enabled: AUTH_ENABLE_RATE_LIMIT,
      lockout_minutes: AUTH_LOCKOUT_MINUTES,
    },
    storage: getAuthStorageInfo(),
  });
});

app.post('/api/auth/signup', async (req, res) => {
  await dbReady.catch(() => {});

  const { email, username, password } = req.body || {};
  const requestedAccountType = req.body?.account_type ?? req.body?.accountType ?? DEFAULT_ACCOUNT_TYPE;
  const signupRateKey = buildRateLimitKey('signup', req, `${email || ''}|${username || ''}`);
  const signupRateState = getRateLimitState('signup', signupRateKey);
  if (!signupRateState.allowed) {
    sendTooManyRequests(res, signupRateState.retryAfterSeconds);
    return;
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    recordRateLimitFailure('signup', signupRateKey);
    sendBadRequest(res, 'email and password are required');
    return;
  }

  const normalizedEmail = normalizeEmail(email);
  if (normalizedEmail.length > 254) {
    recordRateLimitFailure('signup', signupRateKey);
    sendBadRequest(res, 'Email length is too long.');
    return;
  }

  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    recordRateLimitFailure('signup', signupRateKey);
    sendBadRequest(res, 'Provide a valid email address.');
    return;
  }

  const signupEmailValidation = await validateExistingEmailAccount(normalizedEmail);
  if (!signupEmailValidation.ok) {
    recordRateLimitFailure('signup', signupRateKey);
    if (signupEmailValidation.retryable) {
      res.status(503).json({ detail: signupEmailValidation.detail });
      return;
    }
    sendBadRequest(res, signupEmailValidation.detail);
    return;
  }

  const passwordPolicyError = validatePasswordPolicy(password);
  if (passwordPolicyError) {
    recordRateLimitFailure('signup', signupRateKey);
    sendBadRequest(res, passwordPolicyError);
    return;
  }

  const normalizedAccountType = normalizeAccountType(requestedAccountType);
  if (!normalizedAccountType) {
    recordRateLimitFailure('signup', signupRateKey);
    sendBadRequest(res, `account_type must be one of: ${ACCOUNT_TYPE_OPTIONS.join(', ')}`);
    return;
  }

  const requestedUsername = typeof username === 'string' && username.trim()
    ? username
    : normalizedEmail.split('@')[0];

  let normalizedUsername = normalizeUsername(requestedUsername);
  if (!USERNAME_PATTERN.test(normalizedUsername)) {
    normalizedUsername = normalizeUsername(normalizedEmail.split('@')[0] || 'user');
  }
  normalizedUsername = await resolveUniqueUsername(normalizedUsername);

  const existingUserByEmail = await findUserByEmail(normalizedEmail);
  if (existingUserByEmail) {
    recordRateLimitFailure('signup', signupRateKey);
    sendConflict(res, 'An account with this email already exists.');
    return;
  }

  const passwordHash = hashPassword(password);
  try {
    const user = await createUser({
      email: normalizedEmail,
      username: normalizedUsername,
      passwordHash,
      provider: 'local',
      accountType: normalizedAccountType,
      role: 'user',
    });

    await updateUserLastLogin(user.id);
    const refreshedUser = (await findUserById(user.id)) || user;
    clearRateLimitState(signupRateKey);
    res.status(201).json(buildAuthResponse(refreshedUser));
  } catch (error) {
    recordRateLimitFailure('signup', signupRateKey);
    if (isStorageConstraintError(error) || error.code === 'DUPLICATE_USER') {
      sendConflict(res, 'Account already exists with the provided email or username.');
      return;
    }

    console.error('Signup failed:', error);
    res.status(500).json({ detail: 'Unable to create account right now.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  await dbReady.catch(() => {});

  const identifier = req.body?.identifier ?? req.body?.username ?? req.body?.email;
  const requestedAccountType = req.body?.account_type ?? req.body?.accountType;
  const { password } = req.body || {};
  const loginRateKey = buildRateLimitKey('login', req, identifier || '');
  const loginRateState = getRateLimitState('login', loginRateKey);
  if (!loginRateState.allowed) {
    sendTooManyRequests(res, loginRateState.retryAfterSeconds);
    return;
  }

  if (typeof identifier !== 'string' || typeof password !== 'string') {
    recordRateLimitFailure('login', loginRateKey);
    sendBadRequest(res, 'identifier and password are required');
    return;
  }

  const normalizedIdentifier = String(identifier).trim();
  if (!normalizedIdentifier) {
    recordRateLimitFailure('login', loginRateKey);
    sendBadRequest(res, 'identifier and password are required');
    return;
  }
  if (normalizedIdentifier.length > 254) {
    recordRateLimitFailure('login', loginRateKey);
    sendBadRequest(res, 'identifier is too long');
    return;
  }
  const normalizedAccountType = normalizeAccountType(requestedAccountType);
  if (!normalizedAccountType) {
    recordRateLimitFailure('login', loginRateKey);
    sendBadRequest(res, `account_type must be one of: ${ACCOUNT_TYPE_OPTIONS.join(', ')}`);
    return;
  }

  if (normalizedIdentifier.includes('@')) {
    const loginEmailValidation = await validateExistingEmailAccount(normalizedIdentifier);
    if (!loginEmailValidation.ok) {
      recordRateLimitFailure('login', loginRateKey);
      if (loginEmailValidation.retryable) {
        res.status(503).json({ detail: loginEmailValidation.detail });
        return;
      }
      sendBadRequest(res, loginEmailValidation.detail);
      return;
    }
  }

  if (verifyAdminCredentials(normalizedIdentifier, password)) {
    const adminUser = getSystemAdminUser();
    const adminAccountType = normalizeAccountType(adminUser.account_type) || DEFAULT_ACCOUNT_TYPE;
    if (normalizedAccountType !== adminAccountType) {
      const retryAfterSeconds = recordRateLimitFailure('login', loginRateKey);
      if (retryAfterSeconds > 0) {
        sendTooManyRequests(res, retryAfterSeconds);
        return;
      }
      sendUnauthorized(res, 'Selected account type does not match this account');
      return;
    }
    clearRateLimitState(loginRateKey);
    res.json(buildAuthResponse(adminUser));
    return;
  }

  const user = await findUserByIdentifier(normalizedIdentifier);
  if (!user || !user.password_hash || !verifyPasswordHash(password, user.password_hash)) {
    const retryAfterSeconds = recordRateLimitFailure('login', loginRateKey);
    if (retryAfterSeconds > 0) {
      sendTooManyRequests(res, retryAfterSeconds);
      return;
    }
    const storageInfo = getAuthStorageInfo();
    const storageHint = storageInfo.warning ? ` ${storageInfo.warning}` : '';
    sendUnauthorized(res, `Invalid email/username or password.${storageHint}`);
    return;
  }
  const userAccountType = normalizeAccountType(user.account_type) || DEFAULT_ACCOUNT_TYPE;
  if (userAccountType !== normalizedAccountType) {
    const retryAfterSeconds = recordRateLimitFailure('login', loginRateKey);
    if (retryAfterSeconds > 0) {
      sendTooManyRequests(res, retryAfterSeconds);
      return;
    }
    sendUnauthorized(res, 'Selected account type does not match this account');
    return;
  }

  await updateUserLastLogin(user.id);
  clearRateLimitState(loginRateKey);
  const refreshedUser = (await findUserById(user.id)) || user;
  res.json(buildAuthResponse(refreshedUser));
});

app.post('/api/auth/forgot-password', async (req, res) => {
  await dbReady.catch(() => {});

  const email = normalizeEmail(req.body?.email);
  const requestedAccountType = req.body?.account_type ?? req.body?.accountType ?? DEFAULT_ACCOUNT_TYPE;
  const forgotRateKey = buildRateLimitKey('forgot', req, email || '');
  const forgotRateState = getRateLimitState('forgot', forgotRateKey);
  if (!forgotRateState.allowed) {
    sendTooManyRequests(res, forgotRateState.retryAfterSeconds);
    return;
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    recordRateLimitFailure('forgot', forgotRateKey);
    sendBadRequest(res, 'Provide a valid email address.');
    return;
  }
  if (email.length > 254) {
    recordRateLimitFailure('forgot', forgotRateKey);
    sendBadRequest(res, 'Email length is too long.');
    return;
  }

  const forgotEmailValidation = await validateExistingEmailAccount(email);
  if (!forgotEmailValidation.ok) {
    recordRateLimitFailure('forgot', forgotRateKey);
    if (forgotEmailValidation.retryable) {
      res.status(503).json({ detail: forgotEmailValidation.detail });
      return;
    }
    sendBadRequest(res, forgotEmailValidation.detail);
    return;
  }

  const normalizedAccountType = normalizeAccountType(requestedAccountType);
  if (!normalizedAccountType) {
    recordRateLimitFailure('forgot', forgotRateKey);
    sendBadRequest(res, `account_type must be one of: ${ACCOUNT_TYPE_OPTIONS.join(', ')}`);
    return;
  }

  const successResponse = {
    message: 'Reset instructions have been sent to your email.',
  };
  const user = await findUserByEmail(email);
  if (!user) {
    const retryAfterSeconds = recordRateLimitFailure('forgot', forgotRateKey);
    if (retryAfterSeconds > 0) {
      sendTooManyRequests(res, retryAfterSeconds);
      return;
    }
    sendBadRequest(res, 'No email found for the selected account type.');
    return;
  }

  const userAccountType = normalizeAccountType(user.account_type) || DEFAULT_ACCOUNT_TYPE;
  if (userAccountType !== normalizedAccountType) {
    const retryAfterSeconds = recordRateLimitFailure('forgot', forgotRateKey);
    if (retryAfterSeconds > 0) {
      sendTooManyRequests(res, retryAfterSeconds);
      return;
    }
    sendBadRequest(res, 'No email found for the selected account type.');
    return;
  }

  const tokenPayload = await createPasswordResetToken(user.id);
  if (!tokenPayload) {
    recordRateLimitFailure('forgot', forgotRateKey);
    res.status(500).json({ detail: 'Unable to generate reset instructions right now.' });
    return;
  }

  const resetUrl = buildResetUrl(tokenPayload.token);
  if (resetUrl) {
    console.log(`[auth] Password reset URL for ${email}: ${resetUrl}`);
  }

  if (resetUrl) {
    const emailPayload = buildPasswordResetEmail({
      email,
      resetUrl,
      expiresAt: tokenPayload.expiresAt,
    });
    const deliveryResult = await sendTransactionalEmail({
      to: email,
      subject: emailPayload.subject,
      text: emailPayload.text,
      html: emailPayload.html,
    });

    if (!deliveryResult.sent && !deliveryResult.skipped) {
      console.warn('[auth] Password reset email failed delivery for:', email);
    }
  }

  if (AUTH_EXPOSE_RESET_TOKEN) {
    clearRateLimitState(forgotRateKey);
    res.json({
      ...successResponse,
      reset_token: tokenPayload.token,
      reset_url: resetUrl || null,
      expires_at: tokenPayload.expiresAt,
    });
    return;
  }

  clearRateLimitState(forgotRateKey);
  res.json(successResponse);
});

app.post('/api/auth/reset-password', async (req, res) => {
  await dbReady.catch(() => {});

  const token = String(req.body?.token || '').trim();
  const password = String(req.body?.password || '');
  const resetRateKey = buildRateLimitKey('reset', req, token.slice(0, 24));
  const resetRateState = getRateLimitState('reset', resetRateKey);
  if (!resetRateState.allowed) {
    sendTooManyRequests(res, resetRateState.retryAfterSeconds);
    return;
  }

  if (!token || !password) {
    recordRateLimitFailure('reset', resetRateKey);
    sendBadRequest(res, 'token and password are required');
    return;
  }

  const passwordPolicyError = validatePasswordPolicy(password);
  if (passwordPolicyError) {
    recordRateLimitFailure('reset', resetRateKey);
    sendBadRequest(res, passwordPolicyError);
    return;
  }

  const resetTokenRecord = await findPasswordResetTokenRecord(token);
  if (!resetTokenRecord) {
    const retryAfterSeconds = recordRateLimitFailure('reset', resetRateKey);
    if (retryAfterSeconds > 0) {
      sendTooManyRequests(res, retryAfterSeconds);
      return;
    }
    sendBadRequest(res, 'Reset token is invalid or expired.');
    return;
  }

  const user = await findUserById(resetTokenRecord.user_id);
  if (!user) {
    recordRateLimitFailure('reset', resetRateKey);
    sendBadRequest(res, 'Reset token is invalid or expired.');
    return;
  }

  const passwordHash = hashPassword(password);
  await updateUserPassword(user.id, passwordHash);
  await markPasswordResetTokenUsed(resetTokenRecord.id);
  clearRateLimitState(resetRateKey);

  res.json({
    message: 'Password has been reset successfully.',
  });
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
  await dbReady.catch(() => {});
  res.json(req.user);
});

app.post('/api/status', async (req, res) => {
  await dbReady.catch(() => {});

  const { client_name: clientName } = req.body || {};
  if (typeof clientName !== 'string' || !clientName.trim()) {
    sendBadRequest(res, 'client_name is required');
    return;
  }

  const statusCheck = {
    id: crypto.randomUUID(),
    client_name: clientName.trim(),
    timestamp: new Date().toISOString(),
  };

  try {
    await insertStatusCheck(statusCheck);
    res.status(201).json(statusCheck);
  } catch (error) {
    console.error('Failed to create status check:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

app.get('/api/status', async (req, res) => {
  await dbReady.catch(() => {});

  try {
    const rows = await fetchStatusChecks();
    res.json(rows);
  } catch (error) {
    console.error('Failed to fetch status checks:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

app.get('/api/admin/dashboard', requireAuth, async (req, res) => {
  await dbReady.catch(() => {});

  let statusCheckCount = 0;

  try {
    statusCheckCount = await countStatusChecks();
  } catch (error) {
    console.warn('Storage unavailable while loading backend dashboard; returning count=0');
  }

  res.json({
    user: req.user,
    generated_at: new Date().toISOString(),
    status_check_count: statusCheckCount,
  });
});

app.use((req, res) => {
  res.status(404).json({ detail: 'Not Found' });
});

module.exports = {
  app,
  db,
  dbPath,
  dbReady,
  getStorageMode,
  getAuthStorageInfo,
};
