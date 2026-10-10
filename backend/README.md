# Urban Gold Backend (Node.js + Express + SQLite/Postgres)

This backend is now Node-based and does not require Python.

## 1) Install dependencies

```bash
npm install
```

## 2) Run backend

```bash
npm start
```

Default server URL:

`http://localhost:8001`

## System Admin Auth

No default admin credentials are enabled.

To enable system-admin login, configure these in `.env`:

- `AUTH_ADMIN_USERNAME`
- `AUTH_ADMIN_PASSWORD`
- `AUTH_ADMIN_PASSWORD_HASH` (optional scrypt hash)

Founder seed account (auto-created/updated on startup):

- `FOUNDER_USERNAME`
- `FOUNDER_EMAIL`
- `FOUNDER_PASSWORD`
- `FOUNDER_PASSWORD_HASH` (optional scrypt hash override)

Optional auth settings:

- `AUTH_RESET_TOKEN_EXPIRE_MINUTES` (default `30`)
- `AUTH_FRONTEND_URL` (used to generate reset URLs in logs)
- `AUTH_EXPOSE_RESET_TOKEN=1` (dev/testing only)
- `AUTH_ENABLE_RATE_LIMIT=1` (default enabled)
- `AUTH_RATE_LIMIT_WINDOW_MINUTES` (default `15`)
- `AUTH_LOCKOUT_MINUTES` (default `15`)
- `AUTH_LOGIN_MAX_ATTEMPTS` (default `6`)
- `AUTH_SIGNUP_MAX_ATTEMPTS` (default `8`)
- `AUTH_FORGOT_MAX_ATTEMPTS` (default `6`)
- `AUTH_RESET_MAX_ATTEMPTS` (default `8`)
- `AUTH_EMAIL_EXISTENCE_CHECK` (default `1`; set `0` to disable domain existence checks)
- `AUTH_EMAIL_EXISTENCE_TIMEOUT_MS` (default `3500`)
- `AUTH_EMAIL_EXISTENCE_CACHE_SECONDS` (default `900`)
- `AUTH_EMAIL_EXISTENCE_CACHE_MAX` (default `4096`)
- `RESEND_API_KEY` (optional, sends reset emails)
- `AUTH_EMAIL_FROM` (optional, e.g. `Urban Gold <noreply@yourdomain.com>`)
- `AUTH_EMAIL_REPLY_TO` (optional)

Persistent database settings (recommended for production):

- `DATABASE_URL` (or `AUTH_DATABASE_URL` / `POSTGRES_URL`) - Postgres connection string
- `POSTGRES_POOL_MAX` (optional, default `4`)
- `POSTGRES_SSL_MODE` (optional: `require`/`disable`; auto-detected by host if omitted)
- `POSTGRES_INIT_MAX_RETRIES` (optional, default `4`)
- `POSTGRES_INIT_RETRY_DELAY_MS` (optional, default `800`)

Storage mode can be checked at:

- `GET /api/auth/providers` -> `storage.mode` (`postgres`, `sqlite`, or `memory`)

## API routes

- `GET /api/`
- `GET /api/auth/providers`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/me` (Bearer token)
- `GET /api/admin/dashboard` (Bearer token)
- `POST /api/status`
- `GET /api/status`

## Deploying on Vercel (separate backend project)

This backend includes Vercel serverless handlers in:

- `api/index.js`
- `vercel.json` rewrite (`/api/:path* -> /api/index`)

Important:

- Keep auth/data routes behind the single `api/index.js` function entrypoint.
- Avoid adding separate `api/auth/*.js` route files when using in-memory or `/tmp` storage in serverless, because each function has isolated runtime state.

After backend deploy, copy your backend URL, for example:

`https://your-backend-project.vercel.app`

In backend Vercel project env vars, set at least:

- `DATABASE_URL=<your-managed-postgres-connection-string>`

Then in your frontend Vercel project settings, set:

- `REACT_APP_BACKEND_URL=https://your-backend-project.vercel.app`

Redeploy frontend after setting this env var.

### Notes for Vercel serverless storage

- Vercel functions have ephemeral filesystem behavior.
- If no Postgres connection string is configured, backend falls back to in-memory storage in Vercel runtime.
- For persistent auth data across redeploys/restarts, configure `DATABASE_URL` with an external managed Postgres database (Neon/Supabase/Postgres).
