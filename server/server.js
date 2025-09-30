// server/server.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const app = express();

/* ----------------- Config ----------------- */
const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

// Aceita os 2 Client IDs (Android + Web)
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';        // ANDROID
const GOOGLE_WEB_CLIENT_ID = process.env.GOOGLE_WEB_CLIENT_ID || ''; // WEB
const GOOGLE_AUDIENCES = [GOOGLE_CLIENT_ID, GOOGLE_WEB_CLIENT_ID].filter(Boolean);

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// Cliente Google
const googleClient = new OAuth2Client();

// MySQL Pool
const db = mysql
  .createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'roteiro_disney_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true, // evita timezone confusa em DATETIME
  })
  .promise();

/* --------------- Middlewares -------------- */
app.use(express.json({ limit: '100kb' }));

// CORS: em dev pode deixar *, em prod use ALLOWED_ORIGINS
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // apps nativos não mandam Origin
      if (!ALLOWED_ORIGINS.length) return cb(null, true); // dev: qualquer
      return ALLOWED_ORIGINS.includes(origin)
        ? cb(null, true)
        : cb(new Error('Origin not allowed: ' + origin), false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  })
);

// Helmet básico (só API JSON)
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Morgan (opcional)
try {
  const morgan = require('morgan');
  app.use(morgan('dev'));
} catch {}

/* ---------- Rate limit p/ rotas sensíveis ----------- */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(['/login', '/register', '/auth/login', '/auth/register', '/auth/google'], authLimiter);

/* ------- Boot: testa conexão e cria tabela se faltar -------- */
(async () => {
  try {
    await db.query('SELECT 1');
    console.log('✅ Conectado ao MySQL.');

    // cria tabela se não existir
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE,
        email VARCHAR(255) UNIQUE,
        password_hash VARCHAR(255),
        google_id VARCHAR(50) UNIQUE,
        name VARCHAR(255),
        picture VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  } catch (err) {
    console.error('❌ Erro ao inicializar MySQL:', err);
  }
})();

/* --------------- Helpers JWT ------------- */
function signJwt(userId) {
  return jwt.sign({ sub: String(userId), uid: userId }, JWT_SECRET, { expiresIn: '30d' });
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m) return res.status(401).json({ message: 'Sem token.' });
  try {
    const payload = jwt.verify(m[1], JWT_SECRET);
    req.userId = Number(payload.uid || payload.sub);
    if (!req.userId) throw new Error('sem uid');
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido.' });
  }
}

/* ----------------- Rotas ------------------ */

// health com ping no DB
app.get('/health', async (_req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok', db: 'up' });
  } catch {
    res.status(500).json({ status: 'fail', db: 'down' });
  }
});

/** 🔐 Login com Google
 * Body: { idToken: string }
 * Res:  { ok: true, token, user: { id, email, name?, picture? } }
 */
app.post('/auth/google', async (req, res) => {
  try {
    const { idToken } = req.body || {};
    if (!idToken) {
      return res.status(400).json({ message: 'idToken ausente' });
    }
    if (!GOOGLE_AUDIENCES.length) {
      return res
        .status(500)
        .json({ message: 'Configure GOOGLE_CLIENT_ID e/ou GOOGLE_WEB_CLIENT_ID.' });
    }

    // 1) valida idToken no Google aceitando Android e Web
    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: GOOGLE_AUDIENCES,
      });
      payload = ticket.getPayload();
    } catch (e) {
      console.error('verifyIdToken:', e?.message || e);
      return res.status(401).json({ message: 'Token Google inválido.' });
    }

    const googleId = payload?.sub;
    const email = (payload?.email || '').toLowerCase() || null;
    const name = payload?.name || null;
    const picture = payload?.picture || null;

    if (!googleId) {
      return res.status(400).json({ message: 'sub (googleId) ausente no token.' });
    }

    // 2) upsert no MySQL (por google_id ou email)
    const [foundRows] = await db.query(
      'SELECT id, email, username, name, picture FROM users WHERE google_id = ? OR email = ? LIMIT 1',
      [googleId, email]
    );
    let userId;

    if (Array.isArray(foundRows) && foundRows.length) {
      const u = foundRows[0];
      userId = u.id;
      await db.query(
        'UPDATE users SET google_id = ?, name = COALESCE(?, name), picture = COALESCE(?, picture), email = COALESCE(?, email) WHERE id = ?',
        [googleId, name, picture, email, userId]
      );
    } else {
      const placeholderHash = await bcrypt.hash(`${googleId}.${Date.now()}`, 10);
      const username = email || `g_${String(googleId).slice(0, 12)}`;
      const [ins] = await db.query(
        'INSERT INTO users (username, email, password_hash, google_id, name, picture) VALUES (?, ?, ?, ?, ?, ?)',
        [username, email, placeholderHash, googleId, name, picture]
      );
      userId = ins.insertId;
    }

    // 3) JWT + payload p/ app
    const token = signJwt(userId);
    return res.json({ ok: true, token, user: { id: userId, email, name, picture } });
  } catch (error) {
    console.error('❌ /auth/google:', error);
    return res.status(500).json({ message: 'Erro no servidor. Tente novamente.' });
  }
});

// Cadastro (senha) — mantém e espelha em /auth/register
async function handleRegister(req, res) {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ message: 'Preencha usuário e senha.' });
    }
    if (String(username).length < 3) {
      return res.status(400).json({ message: 'Usuário deve ter ao menos 3 caracteres.' });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ message: 'Senha deve ter ao menos 6 caracteres.' });
    }

    const [rows] = await db.query('SELECT id FROM users WHERE username = ? LIMIT 1', [username]);
    if (Array.isArray(rows) && rows.length > 0) {
      return res.status(409).json({ message: 'Nome de usuário já existe.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, hashed]
    );

    const token = signJwt(result.insertId);
    return res
      .status(201)
      .json({ message: 'Usuário cadastrado com sucesso!', token, user: { id: result.insertId, username } });
  } catch (error) {
    console.error('❌ /register:', error);
    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Nome de usuário já existe.' });
    }
    return res.status(500).json({ message: 'Erro no servidor. Tente novamente.' });
  }
}
app.post('/register', handleRegister);
app.post('/auth/register', handleRegister);

// Login (senha) — mantém e espelha em /auth/login; agora devolve JWT
async function handleLogin(req, res) {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ message: 'Preencha usuário e senha.' });
    }

    const [rows] = await db.query(
      'SELECT id, username, password_hash FROM users WHERE username = ? LIMIT 1',
      [username]
    );
    const user = Array.isArray(rows) ? rows[0] : null;
    if (!user) return res.status(401).json({ message: 'Usuário ou senha incorretos.' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Usuário ou senha incorretos.' });

    const token = signJwt(user.id);
    return res.status(200).json({ message: 'Login bem-sucedido!', token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('❌ /login:', error);
    return res.status(500).json({ message: 'Erro no servidor. Tente novamente.' });
  }
}
app.post('/login', handleLogin);
app.post('/auth/login', handleLogin);

// Rota autenticada de exemplo
app.get('/me', requireAuth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, email, username, name, picture FROM users WHERE id = ? LIMIT 1',
      [req.userId]
    );
    const u = Array.isArray(rows) ? rows[0] : null;
    if (!u) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json({ user: u });
  } catch (e) {
    res.status(500).json({ message: 'Erro ao carregar perfil.' });
  }
});

/* --------------- 404 genérico ------------- */
app.use((req, res) =>
  res.status(404).json({ message: `Rota não encontrada: ${req.method} ${req.originalUrl}` })
);

/* --------- Start / Shutdown --------------- */
const server = app.listen(PORT, '0.0.0.0', () =>
  console.log(`🚀 API em http://0.0.0.0:${PORT} (acesse via IP da sua máquina)`),
);

function shutdown(signal) {
  console.log(`\nRecebido ${signal}. Encerrando...`);
  server.close(() => {
    db.end?.().catch(() => {});
    process.exit(0);
  });
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
