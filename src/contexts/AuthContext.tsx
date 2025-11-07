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
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Platform, Alert } from "react-native";
import { env } from "@/config/env";
import { syncGoogleUser, syncAnonymousUser } from "@/services/users";
import jwtDecode from "jwt-decode";

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

const discovery: AuthSession.DiscoveryDocument = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

// ✅ criação do contexto
const AuthContext = createContext<AuthContextType | null>(null);
AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isStandalone = Constants.appOwnership === "standalone";
  const isAndroid = Platform.OS === "android";

  const redirectUri = AuthSession.makeRedirectUri({
    native: `${env.appScheme ?? "pkish"}:/oauth2redirect/google`,
    useProxy: false,
  });

  // Logs úteis no APK
  useEffect(() => {
    console.log("🔎 Auth DEBUG", {
      appOwnership: Constants.appOwnership,
      platform: Platform.OS,
      androidId: env.googleAndroidClientId?.slice(0, 30) || "(vazio)",
      webId: env.googleWebClientId?.slice(0, 30) || "(vazio)",
      redirectUri,
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

  /** 🔹 Login via Google (APK) com fallback anônimo */
  const signInWithGoogle = async () => {
    if (!(isAndroid && isStandalone)) {
      console.log("⚠️ Login Google indisponível fora do APK");
      await loginAsGuest();
      return;
    }

    const clientId = env.googleAndroidClientId;
    if (!clientId) {
      Alert.alert(
        "Config ausente",
        "ANDROID_CLIENT_ID não embedado no APK.\nConfira seu eas.json."
      );
      await loginAsGuest();
      return;
    }

    setLoading(true);
    try {
      const authUrl =
        `${discovery.authorizationEndpoint}?` +
        new URLSearchParams({
          client_id: clientId,
          redirect_uri: redirectUri,
          response_type: "id_token",
          scope: "openid email profile",
          nonce: String(Date.now()),
          prompt: "select_account",
        }).toString();

      const result = await AuthSession.startAsync({ authUrl });

      if (result.type === "success") {
        const idToken =
          (result.params as any)?.id_token ||
          (result as any)?.authentication?.idToken;
        if (!idToken) throw new Error("Sem id_token retornado.");

        await finishLogin(idToken);
        console.log("✅ Login Google OK (APK)");
      } else if (result.type === "dismiss" || result.type === "cancel") {
        console.log("⚠️ Login cancelado — segue como anônimo");
        await loginAsGuest();
      } else {
        const err = (result as any)?.error ?? "Falha na autenticação.";
        throw new Error(String(err));
      }
    } catch (err: any) {
      console.error("❌ Erro no login Google:", err?.message || err);
      await loginAsGuest(); // fallback
    } finally {
      setLoading(false);
    }
  };

  /** 🔸 Login Anônimo (sem Google, sempre permite entrar) */
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
      const fallback: User = {
        id: String(Date.now()),
        name: "Visitante",
      };
      await AsyncStorage.setItem("@user", JSON.stringify(fallback));
      setUser(fallback);
    }
  };

  /** 🔸 Logout simples */
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("@user");
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

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

/** Hook de acesso rápido */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
