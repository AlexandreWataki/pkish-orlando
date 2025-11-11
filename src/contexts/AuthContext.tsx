// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Platform, Alert } from "react-native";
import { env } from "@/config/env";
import { syncAnonymousUser } from "@/services/users";
import { jwtDecode } from "jwt-decode";
import { useGoogleIdTokenAuth } from "../auth/useGoogleIdToken";

WebBrowser.maybeCompleteAuthSession();

export type User = {
  id: string;
  name?: string;
  email?: string;
  picture?: string;
  idToken?: string;
  jwtToken?: string; // JWT do backend
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);
AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isStandalone = Constants.appOwnership === "standalone";
  const isAndroid = Platform.OS === "android";

  useEffect(() => {
    console.log("🔎 Auth DEBUG", {
      appOwnership: Constants.appOwnership,
      platform: Platform.OS,
      apiUrl: env.apiUrl,
    });
  }, []);

  useEffect(() => {
    WebBrowser.warmUpAsync().catch(() => {});
    return () => WebBrowser.coolDownAsync().catch(() => {});
  }, []);

  // restaura sessão local
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("@user");
        if (raw) setUser(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /** ✅ Envia o idToken ao backend e salva JWT */
  const finishLogin = async (idToken: string) => {
    try {
      // Envia o token do Google para validação no backend
      const res = await fetch(`${env.apiUrl}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (!data.ok || !data.user) {
        console.error("❌ Falha no backend:", data.error);
        throw new Error("Falha na autenticação.");
      }

      console.log("✅ Login validado no backend:", data.user.email);

      const u: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        picture: data.user.picture,
        idToken,
        jwtToken: data.token, // salva o JWT do backend
      };

      setUser(u);
      await AsyncStorage.setItem("@user", JSON.stringify(u));
    } catch (e) {
      console.error("❌ Erro ao finalizar login:", e);
      throw e;
    }
  };

  /** 🔸 Login Anônimo (sem Google) */
  const loginAsGuest = async () => {
    try {
      const anon = await syncAnonymousUser("Pkish");
      const guestUser: User = {
        id: (anon as any)?.id || String(Date.now()),
        name: (anon as any)?.name || "Convidado",
        email: (anon as any)?.email || "",
        picture: (anon as any)?.picture || "",
      };
      await AsyncStorage.setItem("@user", JSON.stringify(guestUser));
      setUser(guestUser);
      console.log("✅ Entrou como visitante");
    } catch (err) {
      console.error("❌ Falha ao criar visitante, mas segue offline:", err);
      const fallback: User = { id: String(Date.now()), name: "Visitante" };
      await AsyncStorage.setItem("@user", JSON.stringify(fallback));
      setUser(fallback);
    }
  };

  // ✅ Hook do Google (pega id_token e chama finishLogin)
  const { promptAsync } = useGoogleIdTokenAuth(
    async (idToken) => {
      await finishLogin(idToken);
      console.log("✅ Login Google OK (APK)");
    },
    async (e) => {
      console.error("❌ Erro no login Google:", e);
      await loginAsGuest();
    }
  );

  /** 🔹 Login via Google (APK) usando o hook; fallback anônimo */
  const signInWithGoogle = async () => {
    if (!(isAndroid && isStandalone)) {
      console.log("⚠️ Login Google indisponível fora do APK");
      await loginAsGuest();
      return;
    }

    setLoading(true);
    try {
      await promptAsync();
    } finally {
      setLoading(false);
    }
  };

  /** 🔸 Logout simples */
  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove(["@user", "@gravou_usage_ok"]);
      setUser(null);
      Alert.alert("Sessão encerrada", "Você saiu da sua conta.");
    } catch (err) {
      console.error("Erro ao sair:", err);
      Alert.alert("Erro", "Não foi possível encerrar a sessão.");
    }
  };

  const value = useMemo(
    () => ({ user, loading, signInWithGoogle, signOut }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Hook de acesso rápido */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
