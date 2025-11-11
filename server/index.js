require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { Pool } = require("pg");
const { v4: uuid } = require("uuid");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const app = express();
app.set("trust proxy", true);
app.disable("x-powered-by");

/* === ENV === */
const PORT = Number(process.env.PORT) || 8080;
const DATABASE_URL = process.env.DATABASE_URL;
const ENSURE_DB = String(process.env.ENSURE_DB || "false").toLowerCase() === "true";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_AUDIENCES = (process.env.GOOGLE_AUDIENCES || GOOGLE_CLIENT_ID)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

if (!DATABASE_URL) console.error("❌ Faltou DATABASE_URL.");

/* === DB (Neon) === */
const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : null;

if (pool) pool.on("error", (err) => console.error("💥 Erro Postgres:", err));

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
    CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
  `;
  await pool.query(ddl);
}

/* === Middlewares === */
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(
  morgan("tiny", {
    skip: (req) => ["/health", "/favicon.ico"].includes(req.path),
  })
);

/* === CORS === */
const allowed = (process.env.ALLOWED_ORIGINS || "*")
  .split(",")
  .map((s) => s.trim());
const allowNoOrigin = String(process.env.ALLOW_NO_ORIGIN || "false").toLowerCase() === "true";
app.use(
  cors({
    origin(origin, cb) {
      if (!origin && allowNoOrigin) return cb(null, true);
      if (allowed.includes("*") || allowed.includes(origin)) return cb(null, true);
      console.warn("🚫 CORS bloqueado:", origin);
      cb(new Error("Origin not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* === JWT Helpers === */
function signJwt(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/* === Health Check === */
app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "up" });
  } catch {
    res.status(500).json({ ok: false, db: "down" });
  }
});

/* === USERS: criar anônimo + upsert Google === */
app.post("/users/create-anon", async (req, res) => {
  try {
    if (!pool) return res.status(500).json({ ok: false, error: "db_unavailable" });
    if (ENSURE_DB) await ensureDb();

    const id = uuid();
    const { hint } = req.body || {};
    const anonName = hint ? `Guest ${hint}` : "Guest";
    const fakeEmail = `${id.slice(0, 8)}@guest.local`;

    const sql = `
      INSERT INTO users (id, name, email, is_anonymous, last_login)
      VALUES ($1, $2, $3, TRUE, NOW())
      RETURNING *;
    `;
    const { rows } = await pool.query(sql, [id, anonName, fakeEmail]);
    res.json({ ok: true, user: rows[0] });
  } catch (e) {
    console.error("POST /users/create-anon", e);
    res.status(500).json({ ok: false, error: "fail_create_anon" });
  }
});

app.post("/users/upsert", async (req, res) => {
  try {
    if (!pool) return res.status(500).json({ ok: false, error: "db_unavailable" });
    if (ENSURE_DB) await ensureDb();

    const { sub, email, name, picture } = req.body || {};
    if (!sub && !email)
      return res.status(400).json({ ok: false, error: "missing_sub_or_email" });

    const id = uuid();
    const sql = sub
      ? `INSERT INTO users (id, sub, name, email, picture, is_anonymous, last_login)
         VALUES ($1,$2,$3,$4,$5,FALSE,NOW())
         ON CONFLICT (sub) DO UPDATE
           SET name=EXCLUDED.name,
               email=EXCLUDED.email,
               picture=EXCLUDED.picture,
               last_login=NOW()
         RETURNING *;`
      : `INSERT INTO users (id, email, name, picture, is_anonymous, last_login)
         VALUES ($1,$2,$3,$4,FALSE,NOW())
         ON CONFLICT (email) DO UPDATE
           SET name=EXCLUDED.name,
               picture=EXCLUDED.picture,
               last_login=NOW()
         RETURNING *;`;

    const params = sub
      ? [id, sub, name || null, email || null, picture || null]
      : [id, email, name || null, picture || null];

    const { rows } = await pool.query(sql, params);
    res.json({ ok: true, user: rows[0] });
  } catch (e) {
    console.error("POST /users/upsert", e);
    res.status(500).json({ ok: false, error: "fail_upsert" });
  }
});

/* === Google Auth === */
const googleClient = new OAuth2Client();

app.post("/auth/google", async (req, res) => {
  try {
    if (!pool) return res.status(500).json({ ok: false, error: "db_unavailable" });

    const { idToken } = req.body || {};
    if (!idToken) return res.status(400).json({ ok: false, error: "missing_idToken" });

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: GOOGLE_AUDIENCES,
    });
    const payload = ticket.getPayload() || {};
    const { sub, email, name, picture } = payload;

    if (!sub && !email)
      return res.status(400).json({ ok: false, error: "no_sub_or_email" });

    if (ENSURE_DB) await ensureDb();
    const id = uuid();

    const sql = sub
      ? `INSERT INTO users (id, sub, name, email, picture, is_anonymous, last_login)
         VALUES ($1,$2,$3,$4,$5,FALSE,NOW())
         ON CONFLICT (sub) DO UPDATE
           SET name=EXCLUDED.name,
               email=EXCLUDED.email,
               picture=EXCLUDED.picture,
               last_login=NOW()
         RETURNING *;`
      : `INSERT INTO users (id, email, name, picture, is_anonymous, last_login)
         VALUES ($1,$2,$3,$4,FALSE,NOW())
         ON CONFLICT (email) DO UPDATE
           SET name=EXCLUDED.name,
               picture=EXCLUDED.picture,
               last_login=NOW()
         RETURNING *;`;

    const params = sub
      ? [id, sub, name || null, email || null, picture || null]
      : [id, email, name || null, picture || null];

    const { rows } = await pool.query(sql, params);
    const user = rows[0];
    const token = signJwt(user);

    console.log("✅ Login Google:", email || "(sem email)", name || "", payload.aud);
    res.json({ ok: true, token, user });
  } catch (e) {
    console.error("POST /auth/google", e.message);
    if (/audience|recipient/i.test(e.message))
      return res.status(401).json({ ok: false, error: "invalid_google_audience" });
    res.status(500).json({ ok: false, error: "auth_google_failed" });
  }
});

/* === Rota Protegida de Teste === */
app.get("/me", (req, res) => {
  const auth = req.headers.authorization || "";
  const [, token] = auth.split(" ");
  if (!token) return res.status(401).json({ ok: false, error: "missing_token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ ok: true, user: decoded });
  } catch {
    res.status(401).json({ ok: false, error: "invalid_token" });
  }
});

/* === Root === */
app.get("/", (_req, res) =>
  res.json({
    name: "Users API",
    routes: ["/health", "/users/create-anon", "/users/upsert", "/auth/google", "/me"],
  })
);

/* === Start Server === */
const server = app.listen(PORT, "0.0.0.0", async () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
  try {
    const c = await pool.connect();
    c.release();
    console.log("🟢 Conectado ao Postgres.");
    if (ENSURE_DB) await ensureDb();
  } catch (e) {
    console.warn("🟠 DB indisponível no startup:", e.message);
  }
});

/* === Encerrar limpo === */
function shutdown(signal) {
  console.log(`\n${signal} recebido. Encerrando...`);
  server.close(async () => {
    try {
      if (pool) await pool.end();
      console.log("🧹 Pool fechado.");
    } finally {
      process.exit(0);
    }
  });
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
