ï»¿// src/services/api.ts
// Base URL com prioridade para EXPO_PUBLIC_API_URL e autodetecÃƒÂ§ÃƒÂ£o segura em dev.
import { Platform, NativeModules } from "react-native";
import Constants from "expo-constants";

const TIMEOUT_MS = 15_000;
const HEALTH_TIMEOUT_MS = 5_000;

// ========= Helpers de ENV/EXTRA =========
type ExtraType = {
  EXPO_PUBLIC_API_URL?: string;
  EXPO_PUBLIC_API_HOST?: string;
  EXPO_PUBLIC_API_PORT?: string | number;
};

function getExtra(): ExtraType {
  const c: any = Constants as any;
  return (
    c?.expoConfig?.extra ??
    c?.manifest2?.extra ??
    c?.manifest?.extra ??
    {}
  );
}

const EXTRA = getExtra();

// 1) ProduÃƒÂ§ÃƒÂ£o (ou forÃƒÂ§ado): usa sempre a URL pÃƒÂºblica se existir
const PUBLIC_API_URL: string | undefined = EXTRA.EXPO_PUBLIC_API_URL;

// 2) Dev opcional: host/porta via extra
const DEV_HOST: string | undefined =
  (EXTRA.EXPO_PUBLIC_API_HOST as string | undefined) || undefined;

const DEV_PORT: number = Number(EXTRA.EXPO_PUBLIC_API_PORT ?? 3000);

// Fallback manual (ajuste para sua LAN, se quiser)
const MANUAL_LAN_IP = "192.168.0.23"; // casa com teu eas.json (preview)
const DEFAULT_PORT = DEV_PORT || 3000;

// ========= Descoberta de host no ambiente Expo/Metro =========
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
  const c: any = Constants as any;
  const hostUri =
    c?.expoConfig?.hostUri ||
    c?.manifest2?.extra?.expoClient?.hostUri ||
    c?.manifest?.hostUri ||
    null;
  return hostUri ? String(hostUri).split(":")[0] : null;
}

function hostFromDebugger(): string | null {
  const c: any = Constants as any;
  const dbg = c?.manifest?.debuggerHost || c?.expoConfig?.debuggerHost || null;
  return dbg ? String(dbg).split(":")[0] : null;
}

function webSameOriginHost(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.location.hostname || null;
  } catch {
    return null;
  }
}

// ========= Montagem de candidatos =========
function buildCandidates(): string[] {
  // Se URL pÃƒÂºblica existir, usa sÃƒÂ³ ela (ideal para APK/produÃƒÂ§ÃƒÂ£o).
  if (PUBLIC_API_URL?.startsWith("http")) {
    return [PUBLIC_API_URL.replace(/\/+$/, "")];
  }

  const list: string[] = [];
  const add = (
    h?: string | null,
    p: number = DEFAULT_PORT,
    scheme: "http" | "https" = "http"
  ) => {
    if (!h) return;
    const host = h.trim();
    if (!host) return;
    list.push(`${scheme}://${host}:${p}`);
  };

  // ForÃƒÂ§ar via extra (ÃƒÂºtil em dev)
  if (DEV_HOST) {
    add(DEV_HOST, Number(DEV_PORT), "http");
    add(DEV_HOST, Number(DEV_PORT), "https"); // caso tenha cert local
  }

  // Web (mesmo host da pÃƒÂ¡gina)
  add(webSameOriginHost());

  // Expo/Metro (device real/LAN)
  [hostFromScriptURL(), hostFromExpo(), hostFromDebugger()].forEach((h) => {
    add(h);
  });

  // Emuladores
  if (Platform.OS === "android") {
    add("10.0.2.2"); // Android AVD
    add("10.0.3.2"); // Genymotion
  } else if (Platform.OS === "ios") {
    add("localhost");
  }

  // Fallbacks finais
  add(MANUAL_LAN_IP);
  add("localhost");

  // Sem duplicatas
  return Array.from(new Set(list));
}

// ========= Fetch com timeout =========
async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
  timeout = TIMEOUT_MS
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(input, { ...(init || {}), signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

// ========= Resolvedor de BASE =========
let RESOLVED_BASE: string | null = null;

async function resolveBaseURLOnce(): Promise<string> {
  if (RESOLVED_BASE) return RESOLVED_BASE;

  const candidates = buildCandidates();

  // 1Ã‚Âª rodada: testa /health
  for (const base of candidates) {
    try {
      const r = await fetchWithTimeout(
        `${base}/health`,
        { method: "GET" },
        HEALTH_TIMEOUT_MS
      );
      if (r.ok) {
        RESOLVED_BASE = base.replace(/\/+$/, "");
        if (__DEV__) console.log("[api] base resolvida via /health:", RESOLVED_BASE);
        return RESOLVED_BASE;
      }
    } catch {
      // ignora e tenta o prÃƒÂ³ximo
    }
  }

  // 2Ã‚Âª rodada: assume o primeiro candidato (para APIs sem /health)
  RESOLVED_BASE = (candidates[0] ?? "").replace(/\/+$/, "");
  if (!RESOLVED_BASE) {
    throw new Error("NÃƒÂ£o foi possÃƒÂ­vel determinar a baseURL da API.");
  }
  if (__DEV__) console.log("[api] base resolvida por fallback:", RESOLVED_BASE);
  return RESOLVED_BASE;
}

// ========= Request genÃƒÂ©rico =========
async function request<T = any>(path: string, init?: RequestInit): Promise<T> {
  const base = await resolveBaseURLOnce();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = {
    "Content-Type": "application/json",
    ...(init?.headers || {}),
  };

  const res = await fetchWithTimeout(
    url,
    {
      ...init,
      headers,
    },
    TIMEOUT_MS
  );

  // Tenta parsear JSON somente quando apropriado
  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");
  const data: any = isJson
    ? await res.json().catch(() => ({} as any))
    : ({} as any);

  if (!res.ok) {
    const msg = data?.message || data?.error || `Erro HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data as T;
}

// ========= API pÃƒÂºblica =========
export const api = {
  getBaseURL: () => RESOLVED_BASE,
  // Permite forÃƒÂ§ar a base em runtime (debug)
  __setBaseURL: (url: string) => {
    RESOLVED_BASE = url?.replace(/\/+$/, "") || null;
  },

  health: () => request("/health"),

  register: (email: string, senha: string) =>
    request("/register", {
      method: "POST",
      body: JSON.stringify({ username: email, password: senha }),
    }),

  login: (email: string, senha: string) =>
    request("/login", {
      method: "POST",
      body: JSON.stringify({ username: email, password: senha }),
    }),
};
