// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/services/api';

type User = { id?: number; username: string; token?: string };
type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const STORAGE_KEY = '@auth_user';
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setUser(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = async (u: User | null) => {
    setUser(u);
    if (u) await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const signIn = async (username: string, password: string) => {
    const res = await api.login(username, password);
    // API retorna { message, user: { id, username } }
    await persist(res.user ?? { username });
  };

  const signUp = async (username: string, password: string) => {
    await api.register(username, password); // se quiser jÃ¡ logar apÃ³s cadastro:
    await signIn(username, password);
  };

  const signOut = async () => persist(null);

  const refresh = async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    setUser(raw ? JSON.parse(raw) : null);
  };

  const value = useMemo(() => ({ user, loading, signIn, signUp, signOut, refresh }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};
