// server/server.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs'); // ok manter bcryptjs
const cors = require('cors');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

/* ----------------- Config ----------------- */
const PORT = Number(process.env.PORT || 3000);

const db = mysql
  .createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'roteiro_disney_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

/* --------------- Middlewares -------------- */
app.use(
  cors({
    origin: '*', // ajuste para a(s) origem(ns) do seu app se quiser
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json({ limit: '100kb' })); // evita payloads gigantes
app.use(helmet()); // headers de segurança

// morgan opcional (não quebra em prod caso não esteja instalado)
try {
  const morgan = require('morgan');
  app.use(morgan('dev'));
} catch {}

/* ---------- Rate limit p/ auth ----------- */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // máx 100 req/ janela por IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(['/login', '/register'], authLimiter);

/* ------- Teste de conexão inicial -------- */
(async () => {
  try {
    await db.query('SELECT 1');
    console.log('✅ Conectado ao MySQL.');
  } catch (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err);
  }
})();

/* ----------------- Rotas ------------------ */
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Cadastro
app.post('/register', async (req, res) => {
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

    // Checagem de duplicidade ANTES do hash (economiza CPU)
    const [rows] = await db.query('SELECT id FROM users WHERE username = ? LIMIT 1', [username]);
    if (Array.isArray(rows) && rows.length > 0) {
      return res.status(409).json({ message: 'Nome de usuário já existe.' });
    }

    const hashed = await bcrypt.hash(password, 10);

    // IMPORTANTE: usar password_hash (alinha com o schema recomendado)
    const [result] = await db.query(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, hashed]
    );

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      user: { id: result.insertId, username },
    });
  } catch (error) {
    console.error('❌ /register:', error);
    // Se por corrida estourar UNIQUE, retorna 409
    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Nome de usuário já existe.' });
    }
    return res.status(500).json({ message: 'Erro no servidor. Tente novamente.' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ message: 'Preencha usuário e senha.' });
    }

    // Seleciona password_hash
    const [rows] = await db.query(
      'SELECT id, username, password_hash FROM users WHERE username = ? LIMIT 1',
      [username]
    );
    const user = Array.isArray(rows) ? rows[0] : null;
    if (!user) return res.status(401).json({ message: 'Usuário ou senha incorretos.' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Usuário ou senha incorretos.' });

    // Se quiser JWT futuramente, gere aqui e retorne { token, user }
    return res.status(200).json({
      message: 'Login bem-sucedido!',
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error('❌ /login:', error);
    return res.status(500).json({ message: 'Erro no servidor. Tente novamente.' });
  }
});

/* --------------- 404 genérico ------------- */
app.use((req, res) =>
  res.status(404).json({ message: `Rota não encontrada: ${req.method} ${req.originalUrl}` })
);

/* --------- Graceful shutdown/pool --------- */
const server = app.listen(PORT, '0.0.0.0', () =>
  console.log(`🚀 API em http://localhost:${PORT}`)
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
