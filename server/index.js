// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Pool } = require('pg');
const { v4: uuid } = require('uuid');

const app = express();
app.set('trust proxy', true);
app.disable('x-powered-by');

/* ========== ENV ========== */
const PORT = Number(process.env.PORT) || 8080;
const DATABASE_URL = process.env.DATABASE_URL;
const ENSURE_DB = String(process.env.ENSURE_DB || 'false').toLowerCase() === 'true';

if (!DATABASE_URL) {
  console.error('❌ Faltou DATABASE_URL. Defina no Cloud Run (Variáveis & Segredos).');
  // Não derruba aqui para o Cloud Run subir e você ver logs/health; mas sem DB a API não funciona.
}

/* ========== Postgres (Neon) ========== */
const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Neon exige SSL
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    })
  : null;

if (pool) {
  pool.on('error', (err) => console.error('💥 Erro inesperado no pool do Postgres:', err));
}

async function ensureDb() {
  if (!pool) return;
  const ddl = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      sub TEXT UNIQUE,
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
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END; $$ LANGUAGE plpgsql;

    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'users_set_updated_at') THEN
        CREATE TRIGGER users_set_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW EXECUTE FUNCTION set_users_updated_at();
      END IF;
    END $$;

    CREATE TABLE IF NOT EXISTS app_usages (
      id BIGSERIAL PRIMARY KEY,
      device_id TEXT,
      app_version TEXT,
      payload JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await pool.query(ddl);
}

/* ========== Middlewares ========== */
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(
  morgan('tiny', {
    skip: (req) => ['/health', '/healthz', '/favicon.ico'].includes(req.path),
  })
);

// CORS flexível (para localhost, Expo e origens abertas)
const allowed = (process.env.ALLOWED_ORIGINS || '*')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const allowNoOrigin = String(process.env.ALLOW_NO_ORIGIN || 'false').toLowerCase() === 'true';

app.use(
  cors({
    origin(origin, cb) {
      if (!origin && (allowNoOrigin || allowed.includes('*'))) return cb(null, true);
      if (
        origin?.startsWith('http://localhost') ||
        origin?.startsWith('http://127.0.0.1') ||
        origin?.includes('expo.dev') ||
        origin?.startsWith('exp://')
      )
        return cb(null, true);
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

/* ========== Utils ========== */
const nowIso = () => new Date().toISOString();

/* ========== Health Check ========== */
app.get('/health', async (_req, res) => {
  if (!pool) return res.status(500).json({ ok: false, db: 'down', reason: 'no_pool' });
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, db: 'up', at: nowIso() });
  } catch (e) {
    console.error('Health DB fail:', e.message);
    res.status(500).json({ ok: false, db: 'down' });
  }
});
app.get('/healthz', async (_req, res) => res.json({ status: 'ok' }));
app.get('/favicon.ico', (_req, res) => res.status(204).end());

/* ========== Rotas de Usuários ========== */
app.post('/users/upsert', async (req, res) => {
  if (!pool) return res.status(500).json({ ok: false, error: 'db_unavailable' });

  const { sub, name, email, picture } = req.body || {};
  if (!sub && !email)
    return res.status(400).json({ ok: false, error: 'sub OU email são obrigatórios' });

  try {
    if (ENSURE_DB) await ensureDb();
    const id = uuid();

    const sql = sub
      ? `
        INSERT INTO users (id, sub, name, email, picture, is_anonymous, last_login)
        VALUES ($1,$2,$3,$4,$5,FALSE,NOW())
        ON CONFLICT (sub) DO UPDATE
          SET name=EXCLUDED.name,
              email=EXCLUDED.email,
              picture=EXCLUDED.picture,
              is_anonymous=FALSE,
              last_login=NOW()
        RETURNING *;
      `
      : `
        INSERT INTO users (id, email, name, picture, is_anonymous, last_login)
        VALUES ($1,$2,$3,$4,FALSE,NOW())
        ON CONFLICT (email) DO UPDATE
          SET name=EXCLUDED.name,
              picture=EXCLUDED.picture,
              is_anonymous=FALSE,
              last_login=NOW()
        RETURNING *;
      `;

    const params = sub
      ? [id, sub, name || null, email || null, picture || null]
      : [id, email, name || null, picture || null];

    const { rows } = await pool.query(sql, params);
    res.json({ ok: true, user: rows[0] });
  } catch (e) {
    console.error('upsert', e);
    res.status(500).json({ ok: false, error: 'fail_upsert' });
  }
});

app.post('/users/create-anon', async (req, res) => {
  if (!pool) return res.status(500).json({ ok: false, error: 'db_unavailable' });

  const { hint } = req.body || {};
  try {
    if (ENSURE_DB) await ensureDb();
    const id = uuid();
    const anonName = hint ? `Guest ${hint}` : 'Guest';
    const fakeEmail = `${id.slice(0, 8)}@guest.local`;

    const sql = `
      INSERT INTO users (id, is_anonymous, name, email, last_login)
      VALUES ($1,TRUE,$2,$3,NOW())
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `;
    const { rows } = await pool.query(sql, [id, anonName, fakeEmail]);

    if (!rows[0]) {
      const fallback = `${id.slice(0, 8)}-${Date.now()}@guest.local`;
      const { rows: r2 } = await pool.query(
        `INSERT INTO users (id,is_anonymous,name,email,last_login)
         VALUES ($1,TRUE,$2,$3,NOW()) RETURNING *;`,
        [id, anonName, fallback]
      );
      return res.json({ ok: true, user: r2[0] });
    }
    res.json({ ok: true, user: rows[0] });
  } catch (e) {
    console.error('create-anon', e);
    res.status(500).json({ ok: false, error: 'fail_create_anon' });
  }
});

/* ========== /usage (telemetria leve) ========== */
app.post('/usage', async (req, res) => {
  if (!pool) return res.status(500).json({ ok: false, error: 'db_unavailable' });

  const { deviceId, appVersion, data } = req.body || {};
  try {
    await pool.query(
      `INSERT INTO app_usages (device_id, app_version, payload)
       VALUES ($1,$2,$3);`,
      [deviceId || null, appVersion || null, data || {}]
    );
    res.json({ ok: true });
  } catch (e) {
    console.error('💥 /usage erro:', e);
    res.status(500).json({ ok: false });
  }
});

/* ========== Root ========== */
app.get('/', (_req, res) => {
  res.json({
    name: 'Users API',
    routes: ['/health', '/healthz', '/users/upsert', '/users/create-anon', '/usage'],
  });
});

/* ========== Start Server (não derruba se DB falhar) ========== */
const server = app.listen(PORT, () => {
  console.log(`🚀 Users API ouvindo na porta ${PORT}`);
  // ping DB em segundo plano, apenas loga
  (async () => {
    if (!pool) return;
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 8000); // timeout de 8s
    try {
      const c = await pool.connect();
      c.release();
      console.log('🟢 Conectado ao Postgres.');
      if (ENSURE_DB) {
        await ensureDb();
        console.log('🔧 Schema verificado (ENSURE_DB=true).');
      }
    } catch (e) {
      console.warn('🟠 DB indisponível no startup:', e.message);
    } finally {
      clearTimeout(t);
    }
  })();
});

/* ========== Encerramento Limpo ========== */
function shutdown(signal) {
  console.log(`\n${signal} recebido. Encerrando...`);
  server.close(async () => {
    try {
      if (pool) await pool.end();
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
