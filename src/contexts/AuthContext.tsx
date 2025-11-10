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
import { syncGoogleUser, syncAnonymousUser } from "@/services/users";
import { jwtDecode } from "jwt-decode";
import { useGoogleIdTokenAuth } from '../auth/useGoogleIdToken';

WebBrowser.maybeCompleteAuthSession();

export type User = {
  id: string;
  name?: string;
  email?: string;
  picture?: string;
  idToken?: string;
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
      androidClientId: env.googleAndroidClientId?.slice(0, 30) || "(vazio)",
      apiUrl: env.apiUrl,
      appScheme: env.appScheme,
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

  /** ✅ Monta perfil e salva local + Neon */
  const finishLogin = async (idToken: string) => {
    type GoogleJwt = {
      sub: string;
      name?: string;
      email?: string;
      picture?: string;
    };

    let payload: GoogleJwt | null = null;
    try {
      payload = jwtDecode<GoogleJwt>(idToken);
    } catch {
      throw new Error("Token inválido retornado pelo Google.");
    }
    if (!payload?.sub) throw new Error("Token inválido retornado pelo Google.");

    const profile = {
      sub: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };

    try {
      const saved = await syncGoogleUser(profile);
      console.log("✅ Usuário Google sincronizado com Neon:", saved?.email || saved?.name);
    } catch (e) {
      console.log("⚠️ Falha ao salvar no Neon, seguindo offline:", e);
    }

    const u: User = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      idToken,
    };

    setUser(u);
    await AsyncStorage.setItem("@user", JSON.stringify(u));
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
    if (!env.googleAndroidClientId) {
      Alert.alert("Config ausente", "ANDROID_CLIENT_ID não embedado no APK.\nConfira seu eas.json.");
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

  /** 🔸 Logout simples (limpa user + flag de gravação) */
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
