// src/services/api.ts
// API robusta com: baseURL dinâmica, timeout, tratamento de erros,
// autodetecção de ROTAS (/login, /register, etc) e de PAYLOADS (EN/PT),
// suporte a JSON e x-www-form-urlencoded, e export { api }.

import axios, { AxiosError, AxiosInstance } from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

type ApiErrorCode =
  | 'TIMEOUT'
  | 'NETWORK'
  | 'CANCELED'
  | `HTTP_${number}`
  | 'UNKNOWN';

export type ApiError = {
  code: ApiErrorCode;
  message: string;
  status?: number;
  details?: any;
};

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

// ======= Porta do backend =======
const DEFAULT_PORT = 3000;
// ================================

// DICAS: pelo seu log, /login e /register existem (400/409).
// Priorizar esses paths evita 404 desnecessário.
const LOGIN_PATHS = ['/login', '/auth/login', '/api/auth/login', '/users/login'];
const REGISTER_PATHS = ['/register', '/auth/register', '/api/auth/register', '/users/register', '/users', '/signup'];
const HEALTH_PATHS = ['/health', '/api/health'];

// Opcional: ligar para ver mensagens do servidor em 400 (útil p/ descobrir campos exatos)
const SHOW_SERVER_HINTS = true;

function resolveFromEnv(): string | undefined {
  const fromExpoExtra =
    (Constants.expoConfig as any)?.extra?.API_BASE_URL ||
    (Constants.manifest as any)?.extra?.API_BASE_URL;
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  return (fromEnv || fromExpoExtra) as string | undefined;
}

function resolveFromHostUri(): string | undefined {
  const hostUri: string | undefined =
    (Constants.expoConfig as any)?.hostUri ||
    (Constants.manifest as any)?.hostUri;
  if (!hostUri) return undefined;
  const host = hostUri.split(':')[0];
  if (!host) return undefined;
  return `http://${host}:${DEFAULT_PORT}`;
}

function platformFallback(): string {
  if (Platform.OS === 'android') return `http://10.0.2.2:${DEFAULT_PORT}`;
  return `http://localhost:${DEFAULT_PORT}`;
}

export function getBaseURL(): string {
  return resolveFromEnv() || resolveFromHostUri() || platformFallback();
}

const http: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000, // 10s
  headers: {
    Accept: 'application/json',
  },
});

// Token em memória
let bearerToken: string | null = null;

export function setAuthToken(token: string | null) {
  bearerToken = token;
  if (token) {
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common.Authorization;
  }
}

http.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    if (!config.headers['Accept']) {
      config.headers['Accept'] = 'application/json';
    }
    if (bearerToken && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${bearerToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

function mapAxiosError(err: unknown): ApiError {
  const axErr = err as AxiosError<any>;
  const status = axErr.response?.status;

  if (axios.isCancel(err)) return { code: 'CANCELED', message: 'Requisição cancelada.' };

  if ((axErr as any)?.code === 'ECONNABORTED') {
    return { code: 'TIMEOUT', message: 'Tempo de requisição excedido. Tente novamente.' };
  }

  if (axErr.message?.toLowerCase().includes('network')) {
    return {
      code: 'NETWORK',
      message: 'Falha de rede. Verifique a conexão ou o servidor.',
    };
  }

  if (typeof status === 'number') {
    if (SHOW_SERVER_HINTS && (status === 400 || status === 409)) {
      // Mostra sugestão do servidor (às vezes diz quais campos espera)
      // eslint-disable-next-line no-console
      console.warn('API HINT', axErr.response?.data);
    }
    return {
      code: `HTTP_${status}` as ApiErrorCode,
      status,
      message:
        axErr.response?.data?.message ||
        axErr.response?.data?.error ||
        `Erro HTTP ${status}`,
      details: axErr.response?.data,
    };
  }

  return {
    code: 'UNKNOWN',
    message: (axErr.message || 'Erro desconhecido.').toString(),
    details: (axErr as any)?.toJSON?.() ?? axErr,
  };
}

// ---------- Tipos ----------
export type UserDTO = {
  id: number | string;
  username?: string;
  name?: string;
  email: string;
  created_at?: string;
  updated_at?: string;
};

export type LoginResponse = { token: string; user: UserDTO };
export type RegisterResponse = { user: UserDTO; token?: string };
// ---------------------------

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const toFormUrlEncoded = (obj: Record<string, any>) =>
  Object.entries(obj)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v ?? '')}`)
    .join('&');

// Tenta POST com múltiplos bodies no MESMO path.
// - 400 -> tenta próximo body
// - 404 -> aborta este path (deixa o chamador tentar outro path)
// - 401/500 -> propaga erro
async function postWithEncodings<T>(path: string, bodies: Array<Record<string, any>>): Promise<T> {
  let last400: any = null;

  // 1) JSON
  for (const body of bodies) {
    try {
      const { data } = await http.post<T>(path, body, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      return data;
    } catch (err: any) {
      const s = err?.response?.status;
      if (s === 400) { last400 = err; continue; }
      if (s === 404) throw err; // path inválido
      throw err;
    }
  }

  // 2) x-www-form-urlencoded
  for (const body of bodies) {
    try {
      const { data } = await http.post<T>(path, toFormUrlEncoded(body), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      });
      return data;
    } catch (err: any) {
      const s = err?.response?.status;
      if (s === 400) { last400 = err; continue; }
      if (s === 404) throw err;
      throw err;
    }
  }

  throw last400 ?? new Error('Formato de payload não aceito.');
}

// GET pulando 404
async function getFirst<T>(paths: string[]): Promise<T> {
  let last: any = null;
  for (const p of paths) {
    try {
      const { data } = await http.get<T>(p);
      return data;
    } catch (err: any) {
      const s = err?.response?.status;
      if (s === 404) { last = err; continue; }
      throw err;
    }
  }
  throw last ?? new Error('Nenhum endpoint correspondente encontrado (404).');
}

// ---------- ENDPOINTS ----------

// Ass: login(usernameOuEmail, senha)
export async function login(usernameOuEmail: string, senha: string): Promise<ApiResponse<LoginResponse>> {
  try {
    const input = usernameOuEmail.trim();
    const emailLower = isEmail(input) ? input.toLowerCase() : undefined;

    // ⚠️ PRIORIDADE: muitos backends esperam sempre 'username'
    const payloads = [
      { username: input, password: senha }, // 1) SEMPRE username
      // Se o usuário digitou e-mail, tente também username=email
      ...(emailLower ? [{ username: emailLower, password: senha }] : []),
      // Só depois tente as variações com 'email'
      ...(emailLower ? [{ email: emailLower, password: senha }] : []),
      { usernameOrEmail: input, password: senha },
      { emailOrUsername: input, password: senha },
      { login: input, password: senha },
      { usuario: input, senha }, // PT-BR
      { username: input, senha }, // mistura comum
      // aninhado
      { user: { username: input, password: senha } },
      ...(emailLower ? [{ user: { username: emailLower, password: senha } }] : []),
      ...(emailLower ? [{ user: { email: emailLower, password: senha } }] : []),
      { user: { login: input, password: senha } },
      { user: { usuario: input, senha } },
    ];

    let last404: any = null;
    for (const path of LOGIN_PATHS) {
      try {
        const data = await postWithEncodings<LoginResponse>(path, payloads);
        if (data?.token) setAuthToken(data.token);
        return { ok: true, data };
      } catch (err: any) {
        if (err?.response?.status === 404) { last404 = err; continue; }
        return { ok: false, error: mapAxiosError(err) };
      }
    }
    return { ok: false, error: mapAxiosError(last404) };
  } catch (err) {
    return { ok: false, error: mapAxiosError(err) };
  }
}

// Ass: register(email, senha, nome?)
export async function register(email: string, senha: string, nome?: string): Promise<ApiResponse<RegisterResponse>> {
  try {
    const emailLower = email.trim().toLowerCase();

    // ⚠️ PRIORIDADE: muitos backends querem username + email
    const payloads = [
      { username: emailLower, email: emailLower, password: senha, name: nome }, // 1) username + email
      { username: emailLower, password: senha, name: nome },
      { email: emailLower, password: senha, name: nome },
      { email: emailLower, senha, name: nome }, // PT-BR
      { usuario: emailLower, senha, nome }, // PT-BR
      // aninhados
      { user: { username: emailLower, email: emailLower, password: senha, name: nome } },
      { user: { username: emailLower, password: senha, name: nome } },
      { user: { email: emailLower, password: senha, name: nome } },
      { user: { usuario: emailLower, senha, nome } },
    ];

    let last404: any = null;
    for (const path of REGISTER_PATHS) {
      try {
        const data = await postWithEncodings<RegisterResponse>(path, payloads);
        if (data?.token) setAuthToken(data.token);
        return { ok: true, data };
      } catch (err: any) {
        if (err?.response?.status === 404) { last404 = err; continue; }
        return { ok: false, error: mapAxiosError(err) };
      }
    }
    return { ok: false, error: mapAxiosError(last404) };
  } catch (err) {
    return { ok: false, error: mapAxiosError(err) };
  }
}

// Health opcional (para debug rápido)
export async function health(): Promise<ApiResponse<any>> {
  try {
    const data = await getFirst<any>(HEALTH_PATHS);
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: mapAxiosError(err) };
  }
}

// Helpers genéricos
export async function get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
  try {
    const { data } = await http.get<T>(url, { params });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: mapAxiosError(err) };
  }
}

export async function post<T, B = any>(url: string, body?: B): Promise<ApiResponse<T>> {
  try {
    const { data } = await http.post<T>(url, body ?? {});
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: mapAxiosError(err) };
  }
}

export async function put<T, B = any>(url: string, body?: B): Promise<ApiResponse<T>> {
  try {
    const { data } = await http.put<T>(url, body ?? {});
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: mapAxiosError(err) };
  }
}

export async function del<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const { data } = await http.delete<T>(url);
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: mapAxiosError(err) };
  }
}

export { http };

// Exporta objeto 'api' para compatibilidade com import { api } ...
export const api = {
  login,
  register,
  health,
  get,
  post,
  put,
  del,
  setAuthToken,
  getBaseURL,
  http,
};
