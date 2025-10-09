// server/server.js — Express + Google Auth + Postgres (Cloud Run + Neon)
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
let listEndpoints = null;
try { listEndpoints = require('express-list-endpoints'); } catch {}

const app = express();

/* ----------------- Config ----------------- */
const PORT = Number(process.env.PORT || 8080); // <- padrão Cloud Run
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';         // ANDROID
const GOOGLE_WEB_CLIENT_ID = process.env.GOOGLE_WEB_CLIENT_ID || ''; // WEB
const GOOGLE_AUDIENCES = [GOOGLE_CLIENT_ID, GOOGLE_WEB_CLIENT_ID].filter(Boolean);

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// APK/app nativo costuma vir sem Origin → permitir se ALLOW_NO_ORIGIN=true
const ALLOW_NO_ORIGIN = (process.env.ALLOW_NO_ORIGIN || 'true') === 'true';

// Cloud Run/proxies
app.set('trust proxy', true);

// Google OAuth client
const googleClient = new OAuth2Client();

/* -------------- Conexão Neon (pg + TLS) ------------- */
/**
 * Importante:
 * - DATABASE_URL deve usar host COM '-pooler' e query 'sslmode=require', por ex.:
 *   postgres://user:pass@ep-xxxx-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
 */
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
});
pool.on('error', (err) => console.error('PG pool error:', err?.message || err));

/* --------------- Middlewares -------------- */
app.use(express.json({ limit: '100kb' }));

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return ALLOW_NO_ORIGIN ? cb(null, true) : cb(new Error('No Origin'), false);
      if (!ALLOWED_ORIGINS.length) return cb(null, true);
      return ALLOWED_ORIGINS.includes(origin)
        ? cb(null, true)
        : cb(new Error('Origin not allowed: ' + origin), false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    credentials: false,
  })
);
app.options('*', cors());

app.use(helmet({ crossOriginResourcePolicy: false }));

try {
  const morgan = require('morgan');
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
} catch {}

/* ---------- Rate limit ----------- */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(
  [
    '/login','/register','/auth/login','/auth/register','/auth/google',
    '/api/login','/api/register','/api/auth/login','/api/auth/register','/api/auth/google'
  ],
  authLimiter
);

/* ------- Boot DB -------- */
(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Conectado ao Postgres (Neon).');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password_hash TEXT,
        google_id TEXT UNIQUE,
        name TEXT,
        picture TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log('✅ Tabela users ok.');
  } catch (e) {
    console.error('❌ Erro ao iniciar DB:', e?.message || e);
  }
})();

/* -------------- Helpers --------------- */
function signJwt(userId) {
  return jwt.sign({ sub: String(userId), uid: String(userId) }, JWT_SECRET, { expiresIn: '7d' });
}

async function verifyGoogleIdToken(idToken) {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: GOOGLE_AUDIENCES.length ? GOOGLE_AUDIENCES : undefined, // aceita Android e Web
  });
  return ticket.getPayload();
}

function authMiddleware(req, res, next) {
  try {
    const hdr = req.headers.authorization || '';
    const m = hdr.match(/^Bearer (.+)$/i);
    if (!m) return res.status(401).json({ message: 'Token ausente.' });
    const payload = jwt.verify(m[1], JWT_SECRET);
    req.userId = Number(payload.uid || payload.sub);
    if (!req.userId) throw new Error('sem uid');
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido.' });
  }
}

/* ----------------- Rotas base ------------------ */
app.get('/', (_req, res) => res.json({ service: 'pkish-api', status: 'ok' }));

async function checkDbVerbose() {
  try {
    await pool.query('SELECT 1');
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}
app.get('/health', async (_req, res) => {
  const { ok, error } = await checkDbVerbose();
  if (ok) return res.json({ service: 'pkish-api', status: 'ok', db: 'up' });
  console.error('Health DB error:', error);
  return res.status(500).json({ status: 'fail', db: 'down', error });
});
app.head('/health', async (_req, res) => {
  const { ok } = await checkDbVerbose();
  return res.sendStatus(ok ? 200 : 500);
});
app.get('/healthz', (_req, res) => res.send('ok'));

/* -------- Google Auth -------- */
app.post('/auth/google', async (req, res) => {
  try {
    const { idToken } = req.body || {};
    if (!idToken) return res.status(400).json({ message: 'idToken ausente.' });

    const payload = await verifyGoogleIdToken(idToken);
    const googleId = String(payload.sub || '');
    const email = String(payload.email || '').toLowerCase();
    const name = payload.name || null;
    const picture = payload.picture || null;

    if (!googleId || !email) {
      return res.status(401).json({ message: 'Token do Google inválido.' });
    }

    const { rows: foundRows } = await pool.query(
      'SELECT id, email, username, name, picture FROM users WHERE google_id = $1 OR email = $2 LIMIT 1',
      [googleId, email]
    );

    let userId;
    if (foundRows.length) {
      userId = foundRows[0].id;
      await pool.query(
        `UPDATE users
           SET google_id = $1,
               name = COALESCE($2, name),
               picture = COALESCE($3, picture),
               email = COALESCE($4, email),
               updated_at = NOW()
         WHERE id = $5`,
        [googleId, name, picture, email, userId]
      );
    } else {
      const placeholderHash = await bcrypt.hash(`${googleId}.${Date.now()}`, 10);
      const username = email || `g_${String(googleId).slice(0, 12)}`;
      const { rows: ins } = await pool.query(
        `INSERT INTO users (username, email, password_hash, google_id, name, picture)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [username, email, placeholderHash, googleId, name, picture]
      );
      userId = ins[0].id;
    }

    const token = signJwt(userId);
    return res.json({
      message: 'Login via Google OK',
      token,
      user: { id: userId, email, name, picture },
    });
  } catch (error) {
    console.error('❌ /auth/google:', error?.message || error);
    return res.status(401).json({ message: 'Falha na validação do Google.' });
  }
});

/* -------- Registro -------- */
async function handleRegister(req, res) {
  try {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Preencha username, email e senha.' });
    }
    const exists = await pool.query(
      'SELECT 1 FROM users WHERE username = $1 OR email = $2 LIMIT 1', [username, email]
    );
    if (exists.rowCount) return res.status(409).json({ message: 'Usuário ou email já cadastrado.' });

    const password_hash = await bcrypt.hash(password, 10);
    const { rows: inserted } = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [username, email, password_hash]
    );

    const token = signJwt(inserted[0].id);
    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      token,
      user: { id: inserted[0].id, username },
    });
  } catch (error) {
    console.error('❌ /register:', error?.message || error);
    return res.status(500).json({ message: 'Erro no servidor. Tente novamente.' });
  }
}
app.post('/register', handleRegister);
app.post('/auth/register', handleRegister);

/* -------- Login -------- */
async function handleLogin(req, res) {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ message: 'Preencha usuário e senha.' });

    const { rows } = await pool.query(
      'SELECT id, username, password_hash FROM users WHERE username = $1 LIMIT 1',
      [username]
    );
    const user = rows[0];
    if (!user) return res.status(401).json({ message: 'Usuário ou senha incorretos.' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Usuário ou senha incorretos.' });

    const token = signJwt(user.id);
    return res.json({ message: 'Login OK', token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('❌ /login:', error?.message || error);
    return res.status(500).json({ message: 'Erro no servidor. Tente novamente.' });
  }
}
app.post('/login', handleLogin);
app.post('/auth/login', handleLogin);

/* -------- rota autenticada -------- */
app.get('/me', authMiddleware, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, username, email, name, picture, created_at FROM users WHERE id = $1 LIMIT 1',
      [req.userId]
    );
    const me = rows[0];
    if (!me) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json({ user: me });
  } catch {
    res.status(500).json({ message: 'Erro ao carregar perfil.' });
  }
});

/* ===== /api raiz ===== */
app.get('/api', (req, res) => {
  const info = { service: 'pkish-api', base: '/api' };
  if (listEndpoints) {
    const eps = listEndpoints(app).map(e => `${e.methods.join(',')} ${e.path}`);
    return res.json({ ...info, endpoints: eps });
  }
  return res.json(info);
});

/* ===== /api/health ===== */
app.get('/api/health', async (_req, res) => {
  const { ok, error } = await checkDbVerbose();
  if (ok) return res.json({ status: 'ok', db: 'up' });
  console.error('API Health DB error:', error);
  return res.status(500).json({ status: 'fail', db: 'down', error });
});

/* ===== Aliases ===== */
app.post('/api/auth/google', (req, res) => res.redirect(307, '/auth/google'));
app.post('/api/login', (req, res) => res.redirect(307, '/login'));
app.post('/api/auth/login', (req, res) => res.redirect(307, '/auth/login'));
app.post('/api/register', (req, res) => res.redirect(307, '/register'));
app.post('/api/auth/register', (req, res) => res.redirect(307, '/auth/register'));
app.get('/api/me', (req, res) => res.redirect(307, '/me'));

/* -------- 404 -------- */
app.use((req, res) =>
  res.status(404).json({ message: `Rota não encontrada: ${req.method} ${req.originalUrl}` })
);

/* -------- Handler global -------- */
app.use((err, _req, res, _next) => {
  const msg = err?.message || 'Erro interno';
  const code = /CORS|Origin/.test(msg) ? 403 : 500;
  if (process.env.NODE_ENV !== 'production') console.error('GlobalError:', err);
  res.status(code).json({ message: msg });
});

/* -------- Start / Shutdown -------- */
const server = app.listen(PORT, '0.0.0.0', () =>
  console.log(`🚀 API em http://0.0.0.0:${PORT}`),
);

function shutdown(signal) {
  console.log(`\nRecebido ${signal}. Encerrando...`);
  server.close(async () => {
    try { await pool.end(); } catch {}
    process.exit(0);
  });
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('unhandledRejection', (reason) => {
  console.error('UnhandledRejection:', reason);
});
