const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
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
    origin: '*', // em dev deixa liberado; em prod defina domÃ­nio(s)
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json({ limit: '100kb' }));
app.use(helmet());

// morgan opcional
try {
  const morgan = require('morgan');
  app.use(morgan('dev'));
} catch {}

/* ---------- Rate limit p/ auth ----------- */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(['/login', '/register'], authLimiter);

/* ------- Teste de conexÃ£o inicial -------- */
(async () => {
  try {
    await db.query('SELECT 1');
    console.log('âœ… Conectado ao MySQL.');
  } catch (err) {
    console.error('âŒ Erro ao conectar ao MySQL:', err);
  }
})();

/* ----------------- Rotas ------------------ */
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Cadastro
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ message: 'Preencha usuÃ¡rio e senha.' });
    }
    if (String(username).length < 3) {
      return res.status(400).json({ message: 'UsuÃ¡rio deve ter ao menos 3 caracteres.' });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ message: 'Senha deve ter ao menos 6 caracteres.' });
    }

    // Checagem de duplicidade
    const [rows] = await db.query('SELECT id FROM users WHERE username = ? LIMIT 1', [username]);
    if (Array.isArray(rows) && rows.length > 0) {
      return res.status(409).json({ message: 'Nome de usuÃ¡rio jÃ¡ existe.' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, hashed]
    );

    return res.status(201).json({
      message: 'UsuÃ¡rio cadastrado com sucesso!',
      user: { id: result.insertId, username },
    });
  } catch (error) {
    console.error('âŒ /register:', error);
    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Nome de usuÃ¡rio jÃ¡ existe.' });
    }
    return res.status(500).json({ message: 'Erro no servidor. Tente novamente.' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ message: 'Preencha usuÃ¡rio e senha.' });
    }

    const [rows] = await db.query(
      'SELECT id, username, password_hash FROM users WHERE username = ? LIMIT 1',
      [username]
    );
    const user = Array.isArray(rows) ? rows[0] : null;
    if (!user) return res.status(401).json({ message: 'UsuÃ¡rio ou senha incorretos.' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'UsuÃ¡rio ou senha incorretos.' });

    return res.status(200).json({
      message: 'Login bem-sucedido!',
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error('âŒ /login:', error);
    return res.status(500).json({ message: 'Erro no servidor. Tente novamente.' });
  }
});

/* --------------- 404 genÃ©rico ------------- */
app.use((req, res) =>
  res.status(404).json({ message: `Rota nÃ£o encontrada: ${req.method} ${req.originalUrl}` })
);

/* --------- Start / Shutdown --------------- */
const server = app.listen(PORT, '0.0.0.0', () =>
  console.log(`ðŸš€ API em http://0.0.0.0:${PORT} (acesse via IP da sua mÃ¡quina)`),
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
