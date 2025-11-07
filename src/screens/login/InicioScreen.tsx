import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Platform,
  Alert,
  Image,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/contexts/AuthContext";
import { env } from "@/config/env";
import { syncUser } from "@/services/users";

import logoImg from "../../assets/imagens/logo4.png";
import fraseImg from "../../assets/imagens/frase.png";

const PADRAO_LARGURA_BOTAO = 240;
const PADRAO_PADDING_VERTICAL = 12;
const PADRAO_FONT_SIZE = 14;

type AnyUser = {
  id: string;
  name?: string;
  email?: string;
  picture?: string;
  idToken?: string;
  isGuest?: boolean;
};

function genGuestId() {
  return `guest-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export default function InicioScreen() {
  const navigation = useNavigation<any>();
  const { user, loading, signInWithGoogle } = useAuth();

  const [busy, setBusy] = useState(false);
  const navigatingRef = useRef(false);
  const syncedOnceRef = useRef(false);
  const lastTapRef = useRef(0);

  // no APK, se faltar o clientId, não dá pra logar com Google
  const semIds = Platform.OS !== "web" && !env.googleAndroidClientId;

  const irParaMenu = useCallback(() => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "MenuPrincipal" }] })
    );
    setTimeout(() => {
      navigatingRef.current = false;
    }, 200);
  }, [navigation]);

  const waitForSession = useCallback(
    async (msTimeout = 8000): Promise<AnyUser | null> => {
      const started = Date.now();
      while (Date.now() - started < msTimeout) {
        const raw = await AsyncStorage.getItem("@user");
        if (raw) return JSON.parse(raw);
        await new Promise((r) => setTimeout(r, 250));
      }
      return null;
    },
    []
  );

  async function enterAsGuest(reason?: string) {
    try {
      const guest: AnyUser = {
        id: genGuestId(),
        name: "Convidado",
        email: "",
        picture: "",
        isGuest: true,
      };
      await AsyncStorage.setItem("@user", JSON.stringify(guest));
      // sync “best effort” (não bloqueia se falhar)
      syncUser(guest).catch(() => {});
      if (reason) console.log("Entrando como convidado:", reason);
    } catch (e) {
      console.log("Falha ao salvar convidado localmente, mas seguindo:", e);
    } finally {
      irParaMenu();
    }
  }

  // Se já tem sessão → sincroniza (uma vez) e entra
  useEffect(() => {
    if (!loading && user) {
      if (!syncedOnceRef.current) {
        syncedOnceRef.current = true;
        syncUser(user as AnyUser).catch((e) =>
          console.warn("Sync Neon falhou:", e?.message || e)
        );
      }
      irParaMenu();
    }
  }, [loading, user, irParaMenu]);

  // Logs úteis e alerta de config ausente no APK
  useEffect(() => {
    console.log("APK CHECK (Inicio):", {
      androidClientId: env.googleAndroidClientId?.slice(0, 18),
      webClientId: env.googleWebClientId?.slice(0, 18),
      apiUrl: env.apiUrl,
    });
    if (Platform.OS !== "web" && !env.googleAndroidClientId) {
      Alert.alert(
        "Config Google",
        "Android Client ID não encontrado no APK. Refaça o build com EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID no profile."
      );
    }
  }, []);

  // Clique em “Começar”
  const iniciar = async () => {
    const now = Date.now();
    if (now - lastTapRef.current < 700) return; // evita duplo clique
    lastTapRef.current = now;

    if (busy || loading || navigatingRef.current) return;

    setBusy(true);
    try {
      // Se faltar clientId no APK, pula direto como convidado
      if (semIds) {
        await enterAsGuest("ANDROID_CLIENT_ID ausente no APK.");
        return;
      }

      // Tenta Google
      await signInWithGoogle();

      // Espera a sessão aparecer (AuthContext salva @user ao logar)
      const u = await waitForSession(8000);
      if (u?.id) {
        // Sincroniza em background (não bloqueia)
        syncUser(u).catch(() => {});
        irParaMenu();
      } else {
        // Fallback total: entra sem login
        await enterAsGuest("Não confirmamos a sessão do Google a tempo.");
      }
    } catch (err: any) {
      console.warn("LOGIN_ERR:", err?.message || err);
      await enterAsGuest("Falha no login Google.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <LinearGradient
      colors={["#0077cc", "#00c5d4", "#f5deb3", "#ffffff", "#ffffff"]}
      locations={[0, 0.3, 0.6, 0.85, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View style={styles.topArea}>
        <Image source={logoImg} style={styles.logo} resizeMode="contain" />
        <Image source={fraseImg} style={styles.frase} resizeMode="contain" />
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botao, (busy || loading) && { opacity: 0.7 }]}
          onPress={iniciar}
          activeOpacity={0.9}
          disabled={busy || loading}
          testID="btn-comecar"
        >
          {busy || loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto} allowFontScaling={false}>
              Começar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === "android" ? 40 : 0 },
  topArea: { alignItems: "center", marginTop: 64, paddingHorizontal: 20 },
  logo: { width: 220, height: 170, marginBottom: 8 },
  frase: { width: "100%", height: 250, marginBottom: 8 },
  botoesContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 110,
    alignItems: "center",
    gap: 10,
  },
  botao: {
    backgroundColor: "#007acc",
    paddingVertical: PADRAO_PADDING_VERTICAL,
    borderRadius: 10,
    width: PADRAO_LARGURA_BOTAO,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: PADRAO_FONT_SIZE,
    fontWeight: "bold",
    textAlign: "center",
  },
});
