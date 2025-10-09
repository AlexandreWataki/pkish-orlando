// server/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Neon
  ssl: { rejectUnauthorized: false },
});

// Migração mínima (tabela users) + teste de conexão
async function init() {
  await pool.query('SELECT 1');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password_hash TEXT,
      google_id TEXT UNIQUE,
      name TEXT,
      picture TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_users_google_id ON users (google_id);
    CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
  `);
  console.log('✅ Postgres pronto (tabela users ok).');
}

module.exports = {
  pool,
  init,
  query: (text, params) => pool.query(text, params),
};
