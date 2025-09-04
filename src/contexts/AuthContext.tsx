// src/contexts/AuthProvider.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@auth_user';

export type AuthShape = { username: string; token?: string };
export type AuthUser = AuthShape | null;

export type AuthContextType = {
  user: AuthUser;
  loading: boolean;
  signIn: (u: { username: string; token?: string }) => Promise<void>;
  signUp: (u: { username: string; token?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  /** Recarrega o usuário do AsyncStorage (útil em migrações/testes) */
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

/** Normaliza diferentes formatos que possam estar guardados no AsyncStorage */
function normalizeStored(raw: unknown): AuthShape | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;

  // formato atual
  if (typeof obj.username === 'string' && obj.username.trim()) {
    return { username: obj.username.trim().toLowerCase(), token: (obj.token as string) ?? '' };
  }
  // formatos antigos comuns no projeto
  if (typeof obj.email === 'string' && obj.email.trim()) {
    return { username: obj.email.trim().toLowerCase(), token: (obj.token as string) ?? '' };
  }
  if (typeof obj.nome === 'string' && obj.nome.trim()) {
    return { username: String(obj.nome).trim().toLowerCase(), token: (obj.token as string) ?? '' };
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!mounted) return;

        if (!raw) {
          setUser(null);
        } else {
          let parsedStored: unknown = null;
          try {
            parsedStored = JSON.parse(raw);
          } catch {
            // dado inválido → limpar
            await AsyncStorage.removeItem(STORAGE_KEY);
            setUser(null);
            return;
          }
          const normalized = normalizeStored(parsedStored);
          if (normalized) {
            setUser(normalized);
            // garante que salva no formato novo
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
          } else {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setUser(null);
          }
        }
      } catch {
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const persist = async (payload: AuthShape | null) => {
    if (payload) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } else {
      await AsyncStorage.removeItem(STORAGE_KEY);
    }
  };

  const signIn: AuthContextType['signIn'] = async ({ username, token }) => {
    const payload: AuthShape = { username: username.trim().toLowerCase(), token: token ?? '' };
    setUser(payload);
    await persist(payload);
  };

  const signUp: AuthContextType['signUp'] = async ({ username, token }) => {
    const payload: AuthShape = { username: username.trim().toLowerCase(), token: token ?? '' };
    setUser(payload);
    await persist(payload);
  };

  const signOut: AuthContextType['signOut'] = async () => {
    setUser(null);
    await persist(null);
  };

  const refresh: AuthContextType['refresh'] = async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setUser(null);
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      const normalized = normalizeStored(parsed);
      setUser(normalized);
      if (normalized) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      setUser(null);
      await AsyncStorage.removeItem(STORAGE_KEY);
    }
  };

  // muda apenas quando user/loading mudam
  const value = useMemo<AuthContextType>(
    () => ({ user, loading, signIn, signOut, signUp, refresh }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
