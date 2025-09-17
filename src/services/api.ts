// src/services/api.ts
// Auto-descoberta da baseURL (Web, iOS sim, Android emu, Expo Go).
import { Platform, NativeModules } from 'react-native';
import Constants from 'expo-constants';

const TIMEOUT_MS = 15000;
const HEALTH_TIMEOUT_MS = 5000;

// 1) Produção: se tiver URL pública, usa sempre ela
const PUBLIC_API_URL: string | undefined =
  (Constants as any)?.expoConfig?.extra?.EXPO_PUBLIC_API_URL ||
  (Constants as any)?.manifest?.extra?.EXPO_PUBLIC_API_URL;

// 2) Dev: host/porta opcionais via extra (para forçar quando quiser)
const DEV_HOST: string | undefined =
  (Constants as any)?.expoConfig?.extra?.EXPO_PUBLIC_API_HOST ||
  (Constants as any)?.manifest?.extra?.EXPO_PUBLIC_API_HOST;

const DEV_PORT: string =
  (Constants as any)?.expoConfig?.extra?.EXPO_PUBLIC_API_PORT ||
  (Constants as any)?.manifest?.extra?.EXPO_PUBLIC_API_PORT ||
  '3000';

// Fallback manual se nada responder (pode trocar pelo seu IP LAN)
const MANUAL_LAN_IP = '192.168.0.181';
const DEFAULT_PORT = Number(DEV_PORT || '3000');

function hostFromScriptURL(): string | null {
  try {
    const u: string | undefined =
      (NativeModules as any)?.SourceCode?.scriptURL ||
      (NativeModules as any)?.SourceCode?.scriptURL?.toString?.();
    const m = u?.match?.(/^(https?:)\/\/([^/:]+)(:\d+)?\//);
    return m?.[2] ?? null;
  } catch {
    return null;
  }
}

function hostFromExpo(): string | null {
  const hostUri =
    (Constants as any)?.expoConfig?.hostUri ||
    (Constants as any)?.manifest2?.extra?.expoClient?.hostUri ||
    (Constants as any)?.manifest?.hostUri ||
    null;
  return hostUri ? String(hostUri).split(':')[0] : null;
}

function hostFromDebugger(): string | null {
  const dbg =
    (Constants as any)?.manifest?.debuggerHost ||
    (Constants as any)?.expoConfig?.debuggerHost ||
    null;
  return dbg ? String(dbg).split(':')[0] : null;
}

function webSameOriginHost(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.location.hostname || null;
  } catch {
    return null;
  }
}

function buildCandidates(): string[] {
  // Se URL pública existir, usa só ela (sem teste) – ideal p/ APK/produção
  if (PUBLIC_API_URL?.startsWith('http')) {
    return [PUBLIC_API_URL.replace(/\/+$/, '')];
  }

  const list: string[] = [];
  const add = (h?: string | null, p = DEFAULT_PORT, scheme: 'http' | 'https' = 'http') => {
    if (!h) return;
    list.push(`${scheme}://${h}:${p}`);
  };

  // Forçar via extra, se quiser
  if (DEV_HOST) {
    add(DEV_HOST, Number(DEV_PORT));
    add(DEV_HOST, Number(DEV_PORT), 'https'); // caso tenha cert local
  }

  // Web: mesmo host da página (útil com proxy)
  add(webSameOriginHost());

  // Expo/Metro (device real/LAN)
  [hostFromScriptURL(), hostFromExpo(), hostFromDebugger()].forEach((h) => add(h));

  // Emuladores
  if (Platform.OS === 'android') {
    add('10.0.2.2'); // Android Emulator (AVD)
    add('10.0.3.2'); // Genymotion
  } else if (Platform.OS === 'ios') {
    add('localhost'); // iOS Simulator
  }

  // Fallbacks
  add(MANUAL_LAN_IP);
  add('localhost');

  return Array.from(new Set(list));
}

async function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit, timeout = TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(input, { ...(init || {}), signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

let RESOLVED_BASE: string | null = null;

async function resolveBaseURLOnce(): Promise<string> {
  if (RESOLVED_BASE) return RESOLVED_BASE;
  const candidates = buildCandidates();

  // 1ª rodada: tenta /health
  for (const base of candidates) {
    try {
      const r = await fetchWithTimeout(`${base}/health`, { method: 'GET' }, HEALTH_TIMEOUT_MS);
      if (r.ok) {
        RESOLVED_BASE = base;
        return base;
      }
    } catch {}
  }

  // 2ª rodada: assume o primeiro candidato (para projetos sem /health)
  RESOLVED_BASE = candidates[0];
  return RESOLVED_BASE!;
}

async function request<T = any>(path: string, init?: RequestInit): Promise<T> {
  const base = await resolveBaseURLOnce();
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;

  const res = await fetchWithTimeout(
    url,
    {
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
      ...init,
    },
    TIMEOUT_MS
  );

  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('application/json') ? await res.json().catch(() => ({} as any)) : ({} as any);

  if (!res.ok) {
    throw new Error(data?.message || data?.error || `Erro HTTP ${res.status}`);
  }
  return data as T;
}

export const api = {
  health: () => request('/health'),
  register: (email: string, senha: string) =>
    request('/register', { method: 'POST', body: JSON.stringify({ username: email, password: senha }) }),
  login: (email: string, senha: string) =>
    request('/login', { method: 'POST', body: JSON.stringify({ username: email, password: senha }) }),
};
