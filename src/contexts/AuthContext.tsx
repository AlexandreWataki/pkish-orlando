// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/services/api';
// Se você exportou utilidades no api.ts, pode (opcional):
// import { resolveBaseURLOnce, resetBaseURL, setBaseURLOverride } from '@/services/api';

type User = {
  id: number;
  email: string;
  name?: string | null;
  picture?: string | null;
};

type GoogleAuthResponse = {
  ok?: boolean;
  token: string;
  user: User;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isSignedIn: boolean;
  signInWithGoogle: (idToken: string) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  getToken: () => Promise<string | null>;
  getAuthHeader: () => Promise<Record<string, string>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Se mudar a estrutura no futuro, incremente a versão:
const SESSION_KEY = '@session';
const SESSION_VERSION = 1;

type SessionShapeV1 = {
  v: number;
  token: string;
  user: User;
  savedAt: number;
};

function isSessionV1(x: any): x is SessionShapeV1 {
  return !!x && typeof x === 'object' && typeof x.token === 'string' && x.user && typeof x.v === 'number';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const tokenCacheRef = useRef<string | null>(null);

  // ------- Helpers de sessão -------

  async function readSession(): Promise<SessionShapeV1 | null> {
    const raw = await AsyncStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (isSessionV1(parsed)) return parsed;
      // Migração simples (caso legado { token, user })
      if (parsed?.token && parsed?.user) {
        const migrated: SessionShapeV1 = {
          v: SESSION_VERSION,
          token: String(parsed.token),
          user: parsed.user as User,
          savedAt: Date.now(),
        };
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(migrated));
        return migrated;
      }
      return null;
    } catch {
      return null;
    }
  }

  async function writeSession(token: string, u: User) {
    const s: SessionShapeV1 = { v: SESSION_VERSION, token, user: u, savedAt: Date.now() };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(s));
    tokenCacheRef.current = token;
  }

  async function clearSession() {
    await AsyncStorage.removeItem(SESSION_KEY);
    tokenCacheRef.current = null;
  }

  // ------- API de contexto -------

  async function getToken() {
    if (tokenCacheRef.current) return tokenCacheRef.current;
    const s = await readSession();
    const t = s?.token ?? null;
    tokenCacheRef.current = t;
    return t;
  }

  async function getAuthHeader() {
    const token = await getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  const refresh = async () => {
    const s = await readSession();
    setUser(s?.user ?? null);
  };

  const signOut = async () => {
    await clearSession();
    setUser(null);
  };

  // Retry leve para rede instável (ex.: 1 re-tentativa com backoff curto)
  async function withRetry<T>(fn: () => Promise<T>, retries = 1, backoffMs = 600): Promise<T> {
    try {
      return await fn();
    } catch (e) {
      if (retries <= 0) throw e;
      await new Promise(r => setTimeout(r, backoffMs));
      return withRetry(fn, retries - 1, backoffMs * 1.5);
    }
  }

  const signInWithGoogle = async (idToken: string) => {
    try {
      // Opcional: se você exporta resolveBaseURLOnce do api.ts, pode garantir a base resolvida antes:
      // await resolveBaseURLOnce();

      // Esperado: { ok: true, token: string, user: User }
      const data = await withRetry<GoogleAuthResponse>(() => api.googleAuth(idToken), 1);

      if (!data?.token || !data?.user) {
        throw new Error('Resposta inválida do servidor.');
      }

      await writeSession(data.token, data.user);
      setUser(data.user);
    } catch (err: any) {
      const raw = String(err?.message || err || '');

      // Normaliza mensagens comuns para UX melhor
      if (/audience|client|invalid|id_token/i.test(raw)) {
        throw new Error('Falha na validação do Google (audience/Client ID).');
      }
      if (/timeout|network|fetch|Failed to fetch|Network request failed/i.test(raw)) {
        throw new Error('Falha de rede ao contactar o servidor.');
      }
      if (/401|unauthorized/i.test(raw)) {
        throw new Error('Não autorizado. Verifique as credenciais/Client ID.');
      }
      throw new Error(raw || 'Não foi possível entrar com Google.');
    }
  };

  // ------- Bootstrapping (carrega sessão salva e libera app) -------

  useEffect(() => {
    (async () => {
      try {
        const s = await readSession();
        setUser(s?.user ?? null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      isSignedIn: !!user,
      signInWithGoogle,
      signOut,
      refresh,
      getToken,
      getAuthHeader,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
};
