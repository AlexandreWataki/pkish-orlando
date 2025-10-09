// src/screens/login/InicioScreen.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,
  StatusBar, Platform, Alert, Image
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import Constants from 'expo-constants';
import { useAuth } from '@/contexts/AuthContext';

import logoImg from '../../assets/imagens/logo4.png';
import fraseImg from '../../assets/imagens/frase.png';

WebBrowser.maybeCompleteAuthSession();

// 🔵 Padrões visuais
const PADRAO_LARGURA_BOTAO = 240;
const PADRAO_PADDING_VERTICAL = 12;
const PADRAO_FONT_SIZE = 14;

type Extra = {
  googleWebClientId?: string;
  googleAndroidClientId?: string;
  googleIosClientId?: string;
};

const EXTRA = (Constants.expoConfig?.extra ?? {}) as Extra;
const WEB_CLIENT_ID = EXTRA.googleWebClientId ?? '';
const ANDROID_CLIENT_ID = EXTRA.googleAndroidClientId ?? '';
const IOS_CLIENT_ID = EXTRA.googleIosClientId ?? '';

export default function InicioScreen() {
  const navigation = useNavigation<any>();
  const { user, loading, signInWithGoogle } = useAuth();
  const [busy, setBusy] = useState(false);
  const navigatingRef = useRef(false);
  const signinGuardRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Helper central para resetar a pilha e ir pro Menu
  const irParaMenu = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'MenuPrincipal' }] })
    );
  }, [navigation]);

  // Se já tem sessão, pula a tela
  useEffect(() => {
    if (!loading && user) {
      console.log('[inicio] sessão detectada → MenuPrincipal');
      irParaMenu();
    }
  }, [loading, user, irParaMenu]);

  // ======== Config proxy + redirectUri ========
  const isWeb = Platform.OS === 'web';
  const appOwnership = (Constants as any)?.appOwnership as 'expo' | 'standalone' | null; // web => null
  const isExpoGo = appOwnership === 'expo';
  const isStandalone = appOwnership === 'standalone';

  // Expo Go usa proxy; Web e APK (standalone) sem proxy
  const useProxy = isExpoGo;

  // Redirect único baseado no scheme do app (Manifest tem apenas pkish://)
  const redirectUri = makeRedirectUri({
    scheme: 'pkish',
    useProxy,
  });

  // ---- Client IDs por ambiente (seguro incluir webClientId sempre)
  const clientIds: any = {};
  if (WEB_CLIENT_ID) {
    clientIds.webClientId = WEB_CLIENT_ID;
    clientIds.expoClientId = WEB_CLIENT_ID;
  }
  if (ANDROID_CLIENT_ID) clientIds.androidClientId = ANDROID_CLIENT_ID;
  if (IOS_CLIENT_ID) clientIds.iosClientId = IOS_CLIENT_ID;

  console.log('[inicio] appOwnership =', appOwnership);
  console.log('[inicio] useProxy =', useProxy);
  console.log('[inicio] redirectUri =>', redirectUri);

  // Autenticação Google via ID Token
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    { ...clientIds, selectAccount: true },
    { useProxy, redirectUri }
  );

  // Guarda: alerta imediato se build nativa sem ANDROID_CLIENT_ID
  useEffect(() => {
    if (isStandalone && !ANDROID_CLIENT_ID) {
      Alert.alert(
        'Config do Google',
        'ANDROID_CLIENT_ID ausente. Defina EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID no perfil do EAS e gere o APK novamente.'
      );
    }
  }, [isStandalone]);

  // Trata retorno do Google
  useEffect(() => {
    if (!response) return;
    console.log('[inicio][google][response.type]', response.type);

    if (response.type === 'success') {
      const idToken =
        (response as any)?.authentication?.idToken ||
        (response.params as any)?.id_token ||
        null;

      console.log('[inicio][google] idToken?', !!idToken);

      if (!idToken) {
        Alert.alert(
          'Google Sign-In',
          'id_token não retornou. Em APK/produção, geralmente é SHA-1 do keystore OU Client IDs no Google Cloud.'
        );
        navigatingRef.current = false;
        setBusy(false);
        return;
      }

      // 🔁 Tenta navegar imediatamente e com fallbacks
      irParaMenu();
      setTimeout(irParaMenu, 600);
      setTimeout(irParaMenu, 1500);

      (async () => {
        try {
          setBusy(true);

          // Guard: se signInWithGoogle travar > 8s, liberamos a UI e seguimos no menu
          signinGuardRef.current = setTimeout(() => {
            console.warn('[inicio] signInWithGoogle levou > 8s — navegando mesmo assim');
            setBusy(false);
            navigatingRef.current = false;
            irParaMenu();
          }, 8000);

          console.log('[inicio] chamando signInWithGoogle');
          await signInWithGoogle(idToken); // → POST /auth/google (deve setar user no contexto)

          // Sucesso: limpa guard e garante navegação de novo
          if (signinGuardRef.current) {
            clearTimeout(signinGuardRef.current);
            signinGuardRef.current = null;
          }
          irParaMenu();
        } catch (e: any) {
          if (signinGuardRef.current) {
            clearTimeout(signinGuardRef.current);
            signinGuardRef.current = null;
          }
          const msg = String(e?.message || '');
          console.error('[inicio][google][signInWithGoogle] erro:', msg);
          if (/audience|client|invalid|id_token|redirect|origin/i.test(msg)) {
            Alert.alert(
              'Config do Google',
              'Revise os Client IDs (Android/Web/iOS), Test Users no OAuth e os redirects no Google Cloud.'
            );
          } else if (/network|fetch|timeout|Failed to fetch|CORS/i.test(msg)) {
            Alert.alert(
              'Falha de rede',
              'Não foi possível falar com o servidor. Verifique EXPO_PUBLIC_API_URL e CORS.'
            );
          } else {
            Alert.alert('Erro', msg || 'Não foi possível entrar com Google.');
          }
        } finally {
          setBusy(false);
          navigatingRef.current = false;
        }
      })();
    } else if (response.type === 'error') {
      console.error('[inicio][google][error]', (response as any).error);
      Alert.alert('Erro', (response as any).error?.message ?? 'Falha na autenticação.');
      navigatingRef.current = false;
      setBusy(false);
    } else if (response.type === 'dismiss') {
      console.log('[inicio][google] usuário cancelou');
      navigatingRef.current = false;
      setBusy(false);
    }
  }, [response, signInWithGoogle, irParaMenu]);

  const iniciar = () => {
    if (!request || busy || navigatingRef.current) return;
    if (isStandalone && !ANDROID_CLIENT_ID) {
      Alert.alert(
        'Config do Google',
        'ANDROID_CLIENT_ID não configurado. Ajuste as variáveis no EAS e gere o APK novamente.'
      );
      return;
    }

    navigatingRef.current = true;
    setBusy(true);
    console.log('[inicio] abrindo prompt Google…');

    // Expo Go: sessão efêmera + proxy; Standalone: sem proxy
    const opts = isExpoGo ? { useProxy: true, preferEphemeralSession: true } : { useProxy: false };

    promptAsync(opts as any).catch((err) => {
      console.error('[inicio] promptAsync falhou:', err);
      navigatingRef.current = false;
      setBusy(false);
    });
  };

  const webSemClient = isWeb && !WEB_CLIENT_ID;

  return (
    <LinearGradient
      colors={['#0077cc', '#00c5d4', '#f5deb3', '#ffffff', '#ffffff']}
      locations={[0, 0.3, 0.6, 0.85, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Topo: Logo + Frase */}
      <View style={styles.topArea}>
        {/* 🔵 Logo clicável para entrar no Menu */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={irParaMenu}
          onLongPress={irParaMenu}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image source={logoImg} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>

        <Image source={fraseImg} style={styles.frase} resizeMode="contain" />
      </View>

      {/* Botão "Começar" */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botao, (busy || !request) && { opacity: 0.7 }]}
          onPress={iniciar}
          activeOpacity={0.9}
          disabled={busy || !request || webSemClient}
        >
          {busy ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto} allowFontScaling={false}>
              {webSemClient ? 'Configurar Google Web Client ID' : 'Começar'}
            </Text>
          )}
        </TouchableOpacity>

        {webSemClient && (
          <Text style={styles.dica}>
            Defina EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID no .env e cadastre http://localhost:8081 no Google Cloud.
          </Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 40 : 0 },
  topArea: {
    alignItems: 'center',
    marginTop: 64,
    paddingHorizontal: 20,
  },
  logo: { width: 220, height: 170, marginBottom: 8 },
  frase: { width: '100%', height: 250, marginBottom: 8 },
  botoesContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 110,
    alignItems: 'center',
    gap: 10,
  },
  botao: {
    backgroundColor: '#007acc',
    paddingVertical: PADRAO_PADDING_VERTICAL,
    borderRadius: 10,
    width: PADRAO_LARGURA_BOTAO,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: PADRAO_FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dica: {
    marginTop: 8,
    color: '#003',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
