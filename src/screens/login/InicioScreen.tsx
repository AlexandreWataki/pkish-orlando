// src/screens/login/InicioScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,
  StatusBar, Platform, Alert, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

const EXTRA = (Constants.expoConfig?.extra ?? {}) as {
  googleWebClientId?: string;
  googleAndroidClientId?: string;
  googleIosClientId?: string;
};
const WEB_CLIENT_ID = EXTRA.googleWebClientId ?? '';
const ANDROID_CLIENT_ID = EXTRA.googleAndroidClientId ?? '';
const IOS_CLIENT_ID = EXTRA.googleIosClientId ?? '';

export default function InicioScreen() {
  const navigation = useNavigation<any>();
  const { user, loading, signInWithGoogle } = useAuth();
  const [busy, setBusy] = useState(false);
  const navigatingRef = useRef(false);

  // Se já tem sessão, pula a tela
  useEffect(() => {
    if (!loading && user) {
      console.log('[inicio] já autenticado → MenuPrincipal');
      navigation.reset({ index: 0, routes: [{ name: 'MenuPrincipal' }] });
    }
  }, [loading, user, navigation]);

  // ======== Config proxy + redirectUri ========
  const isWeb = Platform.OS === 'web';
  const isExpoGo = (Constants as any)?.appOwnership === 'expo';

  // Web → sem proxy
  // Expo Go (Android/iOS) → COM proxy da Expo
  // Build nativa (APK/IPA) → sem proxy + scheme do app
  const redirectUri = isWeb
    ? makeRedirectUri({ useProxy: false })
    : isExpoGo
    ? makeRedirectUri({ useProxy: true })
    : makeRedirectUri({ scheme: 'pkish', useProxy: false });

  const useProxy = isExpoGo;

  // 🔎 logs de diagnóstico (deixe por enquanto)
  console.log('[inicio] WEB_CLIENT_ID =', WEB_CLIENT_ID ? '(definido)' : '(vazio)');
  console.log('[inicio] useProxy =', useProxy);
  console.log('[inicio] redirectUri =', redirectUri);

  // Autenticação Google via ID Token
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      ...(WEB_CLIENT_ID ? { webClientId: WEB_CLIENT_ID, expoClientId: WEB_CLIENT_ID } : {}),
      ...(ANDROID_CLIENT_ID ? { androidClientId: ANDROID_CLIENT_ID } : {}),
      ...(IOS_CLIENT_ID ? { iosClientId: IOS_CLIENT_ID } : {}),
      selectAccount: true,
    },
    { useProxy, redirectUri }
  );

  // Trata retorno do Google
  useEffect(() => {
    if (!response) return;
    console.log('[inicio][google][response.type]', response.type);

    if (response.type === 'success') {
      const idToken =
        (response.params as any)?.id_token ||
        (response as any)?.authentication?.idToken ||
        null;

      console.log('[inicio][google] idToken?', !!idToken);

      if (!idToken) {
        Alert.alert(
          'Google Sign-In',
          'id_token não retornou. Em APK/produção, normalmente falta SHA-1/SHA-256 ou Client ID Android/iOS no Google Cloud.'
        );
        navigatingRef.current = false;
        setBusy(false);
        return;
      }

      (async () => {
        try {
          setBusy(true);
          console.log('[inicio] chamando signInWithGoogle');
          await signInWithGoogle(idToken); // → POST /auth/google
          navigation.reset({ index: 0, routes: [{ name: 'MenuPrincipal' }] });
        } catch (e: any) {
          const msg = String(e?.message || '');
          console.error('[inicio][google][signInWithGoogle] erro:', msg);
          if (/audience|client|invalid|id_token|redirect|origin/i.test(msg)) {
            Alert.alert(
              'Config do Google',
              'Revise os Client IDs (Android/Web/iOS), Test Users no OAuth e as URLs/redirects no Google Cloud.'
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
  }, [response, signInWithGoogle, navigation]);

  const iniciar = () => {
    if (!request || busy || navigatingRef.current) return;
    navigatingRef.current = true;
    setBusy(true);
    console.log('[inicio] abrindo prompt Google…');

    // ✅ Expo Go: sessão efêmera evita 400 por cookie antigo.
    // Web / APK: apenas respeita useProxy/redirect do hook.
    const opts = isExpoGo ? { useProxy: true, preferEphemeralSession: true } : undefined;

    promptAsync(opts as any).catch(() => {
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
        <Image source={logoImg} style={styles.logo} resizeMode="contain" />
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
