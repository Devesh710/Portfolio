import cors from 'cors';
import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'db.json');

const PORT = Number(process.env.PORT || 5000);
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const TOKEN_TTL_MS = 1000 * 60 * 60 * 6;

const tokenStore = new Map();
const app = express();

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

async function readDb() {
  const raw = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeDb(db) {
  await fs.writeFile(DB_PATH, `${JSON.stringify(db, null, 2)}\n`, 'utf8');
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function isTokenValid(token) {
  const expiresAt = tokenStore.get(token);
  if (!expiresAt) return false;
  if (Date.now() > expiresAt) {
    tokenStore.delete(token);
    return false;
  }
  return true;
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!isTokenValid(token)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return next();
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken();
  tokenStore.set(token, Date.now() + TOKEN_TTL_MS);

  return res.json({ token });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  const token = req.headers.authorization.slice(7);
  tokenStore.delete(token);
  res.json({ ok: true });
});

app.get('/api/auth/verify', requireAuth, (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/public/skills', async (_req, res) => {
  const db = await readDb();
  res.json(db.skills || []);
});

app.get('/api/public/projects', async (_req, res) => {
  const db = await readDb();
  res.json(db.projects || []);
});

app.put('/api/admin/skills', requireAuth, async (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: 'Skills payload must be an array' });
  }

  const db = await readDb();
  db.skills = req.body;
  await writeDb(db);
  return res.json(db.skills);
});

app.put('/api/admin/projects', requireAuth, async (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: 'Projects payload must be an array' });
  }

  const db = await readDb();
  db.projects = req.body;
  await writeDb(db);
  return res.json(db.projects);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
