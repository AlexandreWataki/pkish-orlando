// src/services/api.ts
// Auto-descoberta da baseURL (Web e Android APK), com override e HTTPS seguro.
import { Platform, NativeModules } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMEOUT_MS = 15000;
const HEALTH_TIMEOUT_MS = 5000;

const STORAGE_OVERRIDE_KEY = '@cfg:apiUrlOverride';

/** Lê do process.env (apenas EXPO_PUBLIC_* é injetado no bundle) */
const env = (k: string): string | undefined =>
  (typeof process !== 'undefined' ? (process as any)?.env?.[k] : undefined);

/** Helpers pra ler extras tanto no dev quanto no build */
function getExtra<T = any>(key: string): T | undefined {
  const expoConfig = (Constants as any)?.expoConfig;
  const manifest = (Constants as any)?.manifest;
  const manifest2 = (Constants as any)?.manifest2;
  return (
    expoConfig?.extra?.[key] ??
    manifest?.extra?.[key] ??
    manifest2?.extra?.[key] ??
    undefined
  );
}

/**
 * Preferências:
 * 1) Override salvo no AsyncStorage (setado via tela/config) → PRIORITÁRIO
 * 2) EXPO_PUBLIC_API_URL ou extra.apiUrl
 * 3) Descoberta de host/porta (Metro/Emulador/LAN)
 */
const PUBLIC_API_URL: string | undefined =
  env('EXPO_PUBLIC_API_URL') || getExtra('apiUrl');

const DEV_HOST: string | undefined =
  env('EXPO_PUBLIC_API_HOST') || getExtra('apiHost');

const DEV_PORT: string =
  env('EXPO_PUBLIC_API_PORT') || getExtra('apiPort') || '3000';

/** Comportamentos extras */
const forceHttpsInNative: boolean =
  (getExtra('forceHttpsInNative') as any) === true ||
  env('EXPO_PUBLIC_FORCE_HTTPS_NATIVE') === 'true';

const allowHttpInNative: boolean =
  (getExtra('allowHttpInNative') as any) === true ||
  env('EXPO_PUBLIC_ALLOW_HTTP_NATIVE') === 'true';

/** Fallback manual se nada responder */
const MANUAL_LAN_IP = DEV_HOST || '192.168.0.23';
const DEFAULT_PORT = Number(DEV_PORT || '3000');

function isLocalhost(h?: string | null) {
  if (!h) return false;
  return (
    h === 'localhost' ||
    h === '127.0.0.1' ||
    h.endsWith('.localhost')
  );
}

function isIp(h?: string | null) {
  if (!h) return false;
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(h);
}

function toUrl(scheme: 'http' | 'https', host: string, port?: number | string) {
  const p = port ? `:${port}` : '';
  return `${scheme}://${host}${p}`;
}

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

/** override salvo em tempo de execução */
let RUNTIME_OVERRIDE: string | null = null;
export async function setBaseURLOverride(url: string | null) {
  RUNTIME_OVERRIDE = url && url.trim() ? url.trim().replace(/\/+$/, '') : null;
  if (RUNTIME_OVERRIDE) {
    await AsyncStorage.setItem(STORAGE_OVERRIDE_KEY, RUNTIME_OVERRIDE);
  } else {
    await AsyncStorage.removeItem(STORAGE_OVERRIDE_KEY);
  }
  RESOLVED_BASE = null; // força resolver de novo
}

async function getOverrideFromStorage(): Promise<string | null> {
  try {
    const v = await AsyncStorage.getItem(STORAGE_OVERRIDE_KEY);
    return v || null;
  } catch {
    return null;
  }
}

function normalizeUrlForNative(url: string): string {
  if (Platform.OS === 'web') return url;

  // Nativo: bloquear localhost e forçar https quando aplicável
  try {
    const u = new URL(url);
    const host = u.hostname;

    // Se exigir HTTPS em nativo e o host não é IP nem localhost → sobe pra https
    if (forceHttpsInNative && u.protocol === 'http:' && !isIp(host) && !isLocalhost(host)) {
      u.protocol = 'https:';
      return u.toString().replace(/\/+$/, '');
    }

    // Se não permitir http no nativo e não é https → tenta https
    if (!allowHttpInNative && u.protocol !== 'https:' && !isIp(host) && !isLocalhost(host)) {
      u.protocol = 'https:';
      return u.toString().replace(/\/+$/, '');
    }

    // Bloqueia localhost no nativo → tenta 10.0.2.2 (emulador) como fallback
    if (isLocalhost(host)) {
      u.hostname = '10.0.2.2';
      return u.toString().replace(/\/+$/, '');
    }

    return u.toString().replace(/\/+$/, '');
  } catch {
    return url.replace(/\/+$/, '');
  }
}

function buildCandidates(): string[] {
  // 0) RUNTIME_OVERRIDE (em memória) tem prioridade máxima
  if (RUNTIME_OVERRIDE) return [normalizeUrlForNative(RUNTIME_OVERRIDE)];

  const list: string[] = [];
  const add = (h?: string | null, p = DEFAULT_PORT, scheme: 'http' | 'https' = 'http') => {
    if (!h) return;
    const url = toUrl(scheme, h, p);
    list.push(normalizeUrlForNative(url));
  };

  // 1) PUBLIC_API_URL (env/extra)
  if (PUBLIC_API_URL?.startsWith('http')) {
    return [normalizeUrlForNative(PUBLIC_API_URL)];
  }

  // 2) Forçar via extra/env (host/porta)
  if (DEV_HOST) {
    add(DEV_HOST, Number(DEV_PORT));
    add(DEV_HOST, Number(DEV_PORT), 'https');
  }

  // 3) Web: mesmo host da página (proxy reverso)
  if (Platform.OS === 'web') {
    const wh = webSameOriginHost();
    if (wh) {
      add(wh, Number(DEV_PORT), 'http');
      add(wh, Number(DEV_PORT), 'https');
    }
  }

  // 4) Expo/Metro (device real/LAN)
  [hostFromScriptURL(), hostFromExpo(), hostFromDebugger()].forEach((h) => {
    if (!h) return;
    // Evita localhost no nativo
    if (Platform.OS !== 'web' && isLocalhost(h)) return;
    add(h, Number(DEV_PORT), 'http');
    add(h, Number(DEV_PORT), 'https');
  });

  // 5) Emuladores
  if (Platform.OS === 'android') {
    add('10.0.2.2'); // Android Emulator (AVD) → host machine
    add('10.0.3.2'); // Genymotion
  } else if (Platform.OS === 'ios') {
    add('localhost'); // iOS Simulator (ok no iOS)
  }

  // 6) Fallbacks finais
  add(MANUAL_LAN_IP);
  add('localhost');

  // Remove duplicados preservando ordem
  const unique = Array.from(new Set(list));
  // Blindagem extra: cortar localhost no nativo (APK/iOS)
  return Platform.OS === 'web'
    ? unique
    : unique.filter(u => !/\/\/(localhost|127\.0\.0\.1)(:|\/)/i.test(u));
}

async function fetchWithTimeout(input: any, init?: RequestInit, timeout = TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(input, { ...(init || {}), signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

let RESOLVED_BASE: string | null = null;

export function resetBaseURL() {
  RESOLVED_BASE = null;
}

export async function resolveBaseURLOnce(): Promise<string> {
  if (RESOLVED_BASE) return RESOLVED_BASE;

  // Carrega override salvo, se houver
  if (!RUNTIME_OVERRIDE) {
    const saved = await getOverrideFromStorage();
    if (saved) {
      RUNTIME_OVERRIDE = saved.replace(/\/+$/, '');
    }
  }

  const candidates = buildCandidates();

  if (__DEV__) {
    console.log('[api] candidatos de baseURL:', candidates);
  }

  // 1ª rodada: tenta /health com GET/HEAD e /healthz (mais resiliente)
  for (const base of candidates) {
    const tries = [
      ['GET',  `${base}/health`],
      ['HEAD', `${base}/health`],
      ['GET',  `${base}/healthz`],
    ] as const;

    for (const [method, url] of tries) {
      try {
        const r = await fetchWithTimeout(url, { method }, HEALTH_TIMEOUT_MS);
        if (r.ok) {
          RESOLVED_BASE = base;
          if (__DEV__) console.log('[api] baseURL resolvida =>', base);
          return base;
        }
      } catch {}
    }
  }

  // 2ª rodada: assume o primeiro candidato (para projetos sem /health)
  RESOLVED_BASE = candidates[0];
  if (__DEV__) console.log('[api] baseURL assumida (sem /health) =>', RESOLVED_BASE);
  return RESOLVED_BASE!;
}

async function request<T = any>(path: string, init?: RequestInit): Promise<T> {
  const base = await resolveBaseURLOnce();
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;

  // Só define Content-Type quando há corpo
  const headersBase: Record<string, string> = {};
  if (init?.body != null) headersBase['Content-Type'] = 'application/json';

  const res = await fetchWithTimeout(
    url,
    {
      ...init,
      headers: { ...headersBase, ...(init?.headers || {}) },
    },
    TIMEOUT_MS
  );

  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('application/json')
    ? await res.json().catch(() => ({} as any))
    : ({} as any);

  if (!res.ok) {
    const txt = !ct.includes('application/json') ? await res.text().catch(() => '') : '';
    const msg = data?.message || data?.error || txt || `Erro HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}

export const api = {
  // health-check
  health: () => request('/health'),

  // 🔐 Google login
  googleAuth: (idToken: string) =>
    request('/auth/google', { method: 'POST', body: JSON.stringify({ idToken }) }),

  // (Exemplos – se usar)
  // login: (usernameOuEmail: string, senha: string) =>
  //   request('/auth/login', { method: 'POST', body: JSON.stringify({ usernameOuEmail, senha }) }),
  // register: (email: string, senha: string, nome?: string) =>
  //   request('/auth/register', { method: 'POST', body: JSON.stringify({ email, senha, nome }) }),
};
