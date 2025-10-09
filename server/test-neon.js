// test-neon.js
const { Client } = require('pg');

const DATABASE_URL = "postgresql://neondb_owner:npg_dMGvsaQ25qpu@ep-morning-flower-adkbmeh8-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

(async () => {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });
  try {
    await client.connect();
    const ping = await client.query('SELECT 1 as ok');
    console.log('Ping DB ->', ping.rows[0]);

    // opcional: ver últimas contas
    const u = await client.query('SELECT id, email, name FROM users ORDER BY id DESC LIMIT 10');
    console.log('Users (até 10):', u.rows);
  } catch (e) {
    console.error('ERRO Neon ->', e.message);
  } finally {
    await client.end().catch(()=>{});
  }
})();
