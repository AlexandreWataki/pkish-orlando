// neonClient.js
const fetch = require("node-fetch");

const NEON_API = process.env.NEON_API; // ex: https://xxxxx.db.neon.tech
const NEON_KEY = process.env.NEON_KEY; // você gera um API key no painel Neon

async function query(sql, params = []) {
  const res = await fetch(`${NEON_API}/sql`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${NEON_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: sql,
      params
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Neon API error: ${err}`);
  }

  const data = await res.json();
  return data;
}

module.exports = { query };
