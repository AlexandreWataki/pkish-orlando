// src/services/api.ts
// Detecta base URL dinamicamente e tenta múltiplas opções antes de desistir.
import { Platform, NativeModules } from 'react-native';

const TIMEOUT_MS = 15000; // timeout 15s
const DEFAULT_PORT = 3000;

// Tenta extrair o host do bundle (útil no Expo Go / Metro)
function getDevHostFromScriptURL(): string | null {
  try {
    const scriptURL: string | undefined =
      (NativeModules as any)?.SourceCode?.scriptURL ||
      (NativeModules as any)?.SourceCode?.scriptURL?.toString?.();
    if (!scriptURL) return null;
    const m = scriptURL.match(/^(https?:)\/\/([^/:]+)(:\d+)?\//);
    if (m && m[2]) return m[2];
  } catch {}
  return null;
}

// Se você souber seu IP, pode fixar aqui (fallback manual)
const MANUAL_LAN_IP = '192.168.0.181';

function candidateBaseURLs(): string[] {
  const host = getDevHostFromScriptURL();
  const list: string[] = [];

  if (host) list.push(`http://${host}:${DEFAULT_PORT}`);

  if (Platform.OS === 'android') {
    list.push(`http://10.0.2.2:${DEFAULT_PORT}`);
    list.push(`http://10.0.3.2:${DEFAULT_PORT}`);
  } else if (Platform.OS === 'ios') {
    list.push(`http://localhost:${DEFAULT_PORT}`);
  }

  list.push(`http://${MANUAL_LAN_IP}:${DEFAULT_PORT}`);
  list.push(`http://localhost:${DEFAULT_PORT}`);

  return Array.from(new Set(list));
}

// fetch com timeout
async function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit, timeout = TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(input, { ...(init || {}), signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

let RESOLVED_BASE: string | null = null;

async function resolveBaseURLOnce(): Promise<string> {
  if (RESOLVED_BASE) return RESOLVED_BASE;
  const candidates = candidateBaseURLs();
  for (const base of candidates) {
    try {
      const res = await fetchWithTimeout(`${base}/health`, { method: 'GET' }, 5000);
      if (res.ok) {
        RESOLVED_BASE = base;
        return base;
      }
    } catch {}
  }
  RESOLVED_BASE = candidates[0];
  return RESOLVED_BASE!;
}

async function request<T = any>(path: string, init?: RequestInit): Promise<T> {
  const base = await resolveBaseURLOnce();
  const url = `${base}${path}`;
  try {
    const res = await fetchWithTimeout(
      url,
      {
        headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
        ...init,
      },
      TIMEOUT_MS
    );

    const isJSON = (res.headers.get('content-type') || '').includes('application/json');
    const data = isJSON ? await res.json().catch(() => ({} as any)) : ({} as any);

    if (!res.ok) {
      const msg = data?.message || data?.error || `Erro HTTP ${res.status}`;
      throw new Error(msg);
    }
    return data as T;
  } catch (e: any) {
    if (e?.name === 'AbortError') {
      throw new Error('Tempo esgotado. Verifique sua rede/servidor.');
    }
    const msg = String(e?.message || '');
    if (msg.includes('Network request failed')) {
      throw new Error('Falha de rede: não foi possível conectar ao servidor.');
    }
    throw new Error(msg || 'Falha de rede');
  }
}

export const api = {
  health: () => request('/health'),
  register: (email: string, senha: string) =>
    request('/register', { method: 'POST', body: JSON.stringify({ username: email, password: senha }) }),
  login: (email: string, senha: string) =>
    request('/login', { method: 'POST', body: JSON.stringify({ username: email, password: senha }) }),
};
