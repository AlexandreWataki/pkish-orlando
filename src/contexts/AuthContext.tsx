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
import { Alert } from "react-native";
import { useGoogleIdTokenAuth } from "@/auth/useGoogleIdToken";
import { loginWithGoogle } from "@/services/users";

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

  // aquece WebBrowser
  useEffect(() => {
    WebBrowser.warmUpAsync().catch(() => {});
    return () => WebBrowser.coolDownAsync().catch(() => {});
  }, []);

  // restaura sessão a partir do storage
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("@user");
        if (raw) {
          try {
            const u = JSON.parse(raw) as User;
            if (u?.id) setUser(u);
          } catch {
            await AsyncStorage.removeItem("@user");
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const finishLogin = async (idToken: string) => {
    const data = await loginWithGoogle(idToken); // pode lançar erro

    const { token, user } = data;

    const u: User = {
      id: user!.id,
      name: user!.name,
      email: user!.email,
      picture: user!.picture,
      idToken,
    };

    await AsyncStorage.multiSet([
      ["@user", JSON.stringify(u)],
      ["@jwt", token!],
    ]);

    setUser(u);

    console.log("✅ Login Google OK:", u.email || u.name);
  };

  // hook Google OAuth
  const { promptAsync, ready } = useGoogleIdTokenAuth(
    async (idToken) => {
      try {
        await finishLogin(idToken);
      } catch (e: any) {
        console.error("⚠️ Erro backend ao registrar Google:", e);

        const backendMessage =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          "Não foi possível concluir o login com o Google.";

        Alert.alert("Erro no servidor", backendMessage);
      }
    },
    async (err) => {
      console.warn("⚠️ Erro login Google (callback):", err);

      const msg =
        err instanceof Error
          ? err.message
          : "Falha na autenticação do Google.";

      Alert.alert("Erro", msg);
    }
  );

  const signInWithGoogle = async () => {
    // ainda não montou a request
    if (!ready) {
      console.log("[Auth] Google request ainda não pronta (ready = false)");
      Alert.alert(
        "Config Google",
        "Login com Google ainda não está pronto. Aguarde alguns segundos e tente novamente."
      );
      return;
    }

    setLoading(true);
    try {
      await promptAsync();
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove(["@user", "@jwt", "@gravou_usage_ok"]);
      setUser(null);
      Alert.alert("Sessão encerrada", "Você saiu da sua conta.");
    } catch (e) {
      console.error("⚠️ Erro ao sair:", e);
      Alert.alert("Erro", "Não foi possível encerrar a sessão.");
    }
  };

  const value = useMemo(
    () => ({ user, loading, signInWithGoogle, signOut }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
