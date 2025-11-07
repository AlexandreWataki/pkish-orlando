// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Pool } = require('pg');
const { v4: uuid } = require('uuid');

const app = express();
app.set('trust proxy', true); // Cloud Run
app.disable('x-powered-by');

/* =============================
   ENV & Config
   ============================= */
const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL;
const ENSURE_DB = (process.env.ENSURE_DB || 'false').toLowerCase() === 'true';

if (!DATABASE_URL) {
  console.error('❌ Faltou DATABASE_URL. Defina no .env (local) ou no Cloud Run.');
  process.exit(1);
}

/* =============================
   Postgres (Neon)
   ============================= */
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Neon exige SSL
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Loga erros assíncronos do pool
pool.on('error', (err) => {
  console.error('💥 Erro inesperado no pool do Postgres:', err);
});

async function ensureDb() {
  const ddl = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      sub TEXT UNIQUE,                   -- id do Google (quando houver)
      name TEXT,
      email TEXT UNIQUE,
      picture TEXT,
      is_anonymous BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      last_login TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_users_google_id ON users (sub);
    CREATE INDEX IF NOT EXISTS idx_users_email     ON users (email);

    CREATE OR REPLACE FUNCTION set_users_updated_at()
    RETURNS TRIGGER AS $$ BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END; $$ LANGUAGE plpgsql;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'users_set_updated_at') THEN
        CREATE TRIGGER users_set_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW EXECUTE FUNCTION set_users_updated_at();
      END IF;
    END $$;
  `;
  await pool.query(ddl);
}

/* =============================
   Middlewares
   ============================= */
// Helmet “amigável” pra API JSON (evita CSP estrita atrapalhar CORS simples)
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(express.json({ limit: '1mb' }));

// Ignora /health nos logs pra não poluir
app.use(
  morgan('tiny', {
    skip: (req) => req.path === '/health' || req.path === '/healthz',
  })
);

// CORS por ENV (dev: *; prod: restrinja)
const allowed = (process.env.ALLOWED_ORIGINS || '*')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const allowNoOrigin = (process.env.ALLOW_NO_ORIGIN || 'false').toLowerCase() === 'true';

app.use(
  cors({
    origin(origin, cb) {
      // Sem origin (apps nativos / curl) e está permitido por env
      if (!origin && (allowNoOrigin || allowed.includes('*'))) return cb(null, true);

      // Libera dev/local e Expo Go
      if (
        origin?.startsWith('http://localhost') ||
        origin?.startsWith('http://127.0.0.1') ||
        origin?.includes('expo.dev') ||
        origin?.startsWith('exp://')
      )
        return cb(null, true);

      // Whitelist explícita ou wildcard
      if (allowed.includes('*') || (origin && allowed.includes(origin))) return cb(null, true);

      console.warn('🚫 CORS bloqueado para:', origin);
      return cb(new Error('Origin not allowed by CORS'), false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    credentials: false,
  })
);
app.options('*', cors());

/* =============================
   Utils
   ============================= */
const nowIso = () => new Date().toISOString();

/* =============================
   Health
   ============================= */
app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, db: 'up', at: nowIso() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, db: 'down' });
  }
});

app.get('/healthz', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch {
    res.status(500).json({ status: 'error' });
  }
});

/* =============================
   Rotas de usuários
   ============================= */
/**
 * POST /users/upsert
 * Body esperado (login Google já decodificado no app):
 *   { sub, name, email, picture }
 * Regras:
 * - Se houver "sub", upsert pelo UNIQUE(sub)
 * - Senão, upsert pelo UNIQUE(email)
 * - id é UUID gerado no primeiro insert
 */
app.post('/users/upsert', async (req, res) => {
  const { sub, name, email, picture } = req.body || {};
  if (!sub && !email) {
    return res.status(400).json({ ok: false, error: 'sub OU email são obrigatórios' });
  }

  try {
    if (ENSURE_DB) await ensureDb();

    const id = uuid();

    if (sub) {
      // Upsert com alvo em sub (Google)
      const sql = `
        INSERT INTO users (id, sub, name, email, picture, is_anonymous, last_login)
        VALUES ($1, $2, $3, $4, $5, FALSE, NOW())
        ON CONFLICT (sub) DO UPDATE
          SET name = EXCLUDED.name,
              email = EXCLUDED.email,
              picture = EXCLUDED.picture,
              is_anonymous = FALSE,
              last_login = NOW()
        RETURNING *;
      `;
      const { rows } = await pool.query(sql, [id, sub, name || null, email || null, picture || null]);
      return res.json({ ok: true, user: rows[0] });
    } else {
      // Fallback: upsert por email
      const sql = `
        INSERT INTO users (id, email, name, picture, is_anonymous, last_login)
        VALUES ($1, $2, $3, $4, FALSE, NOW())
        ON CONFLICT (email) DO UPDATE
          SET name = EXCLUDED.name,
              picture = EXCLUDED.picture,
              is_anonymous = FALSE,
              last_login = NOW()
        RETURNING *;
      `;
      const { rows } = await pool.query(sql, [id, email, name || null, picture || null]);
      return res.json({ ok: true, user: rows[0] });
    }
  } catch (e) {
    if (e?.code === '23505') {
      return res.status(409).json({ ok: false, error: 'Conflito de unique (sub/email).' });
    }
    console.error('upsert', e);
    return res.status(500).json({ ok: false, error: 'fail_upsert' });
  }
});

/**
 * POST /users/create-anon
 * Cria convidado sem Google
 * Body opcional: { hint }
 */
app.post('/users/create-anon', async (req, res) => {
  const { hint } = req.body || {};
  try {
    if (ENSURE_DB) await ensureDb();

    const id = uuid();
    const anonName = hint ? `Guest ${hint}` : 'Guest';
    const fakeEmail = `${id.slice(0, 8)}@guest.local`;

    const sql = `
      INSERT INTO users (id, is_anonymous, name, email, last_login)
      VALUES ($1, TRUE, $2, $3, NOW())
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `;
    const { rows } = await pool.query(sql, [id, anonName, fakeEmail]);
    // Se email fake colidiu (improvável), tenta outro
    if (!rows[0]) {
      const fallback = `${id.slice(0, 8)}-${Date.now()}@guest.local`;
      const { rows: rows2 } = await pool.query(
        `INSERT INTO users (id, is_anonymous, name, email, last_login)
         VALUES ($1, TRUE, $2, $3, NOW()) RETURNING *;`,
        [id, anonName, fallback]
      );
      return res.json({ ok: true, user: rows2[0] });
    }
    return res.json({ ok: true, user: rows[0] });
  } catch (e) {
    console.error('create-anon', e);
    return res.status(500).json({ ok: false, error: 'fail_create_anon' });
  }
});

/* =============================
   Root & Start
   ============================= */
app.get('/', (_req, res) => {
  res.json({
    name: 'Users API',
    routes: ['/health', '/healthz', '/users/upsert', '/users/create-anon'],
  });
});

const server = app.listen(PORT, async () => {
  try {
    if (ENSURE_DB) {
      await ensureDb();
      console.log('🔧 Schema verificado (ENSURE_DB=true).');
    } else {
      console.log('ℹ️ ENSURE_DB=false: pulando migração automática.');
    }
    console.log(`✅ Users API rodando na porta ${PORT}`);
  } catch (e) {
    console.error('Erro ao preparar DB:', e);
    process.exit(1);
  }
});

function shutdown(signal) {
  console.log(`\n${signal} recebido. Encerrando...`);
  server.close(async () => {
    try {
      await pool.end();
      console.log('🧹 Pool Postgres fechado.');
    } catch (e) {
      console.error('Erro ao fechar pool:', e);
    } finally {
      process.exit(0);
    }
  });
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
