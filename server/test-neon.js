// test-neon.js
require('dotenv').config();
const { Client } = require('pg');

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    const ping = await client.query('SELECT 1 as ok');
    console.log('Ping DB ->', ping.rows[0]);

    const u = await client.query(
      'SELECT id, email, name FROM users ORDER BY created_at DESC LIMIT 10'
    );
    console.log('Últimos usuários:', u.rows);
  } catch (e) {
    console.error('ERRO Neon ->', e.message);
  } finally {
    await client.end().catch(() => {});
  }
})();
