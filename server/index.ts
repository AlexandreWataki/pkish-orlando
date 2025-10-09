// server/index.ts
import cors from 'cors';
import express from 'express';

const app = express();
app.set('trust proxy', true); // Cloud Run

const allowNoOrigin = process.env.ALLOW_NO_ORIGIN === 'true';
const whitelist = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    if (!origin && allowNoOrigin) return cb(null, true);    // ✅ APK nativo
    if (origin && whitelist.includes(origin)) return cb(null, true);
    return cb(new Error('CORS blocked'));
  },
  credentials: true,
}));
