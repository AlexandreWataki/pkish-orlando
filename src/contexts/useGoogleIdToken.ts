// src/auth/useGoogleIdToken.ts
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

const extra = (Constants.expoConfig?.extra ?? {}) as {
  googleWebClientId?: string;
  googleAndroidClientId?: string;
  googleIosClientId?: string;
};

export function useGoogleIdTokenAuth(
  onSuccess: (idToken: string) => void,
  onError?: (e: any) => void
) {
  const isWeb = Platform.OS === 'web';
  const redirectUri = makeRedirectUri({ useProxy: !isWeb });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      // Em Expo Go, use o client do tipo "Web application"
      ...(extra.googleWebClientId ? { expoClientId: extra.googleWebClientId } : {}),
      ...(extra.googleWebClientId ? { webClientId: extra.googleWebClientId } : {}),

      // Só serão efetivamente usados quando você fizer build nativa
      ...(extra.googleAndroidClientId ? { androidClientId: extra.googleAndroidClientId } : {}),
      ...(extra.googleIosClientId ? { iosClientId: extra.googleIosClientId } : {}),

      selectAccount: true,
    },
    { useProxy: !isWeb, redirectUri }
  );

  useEffect(() => {
    if (!response) return;

    if (response.type === 'success') {
      const idToken =
        // iOS/Android frequentemente aqui:
        (response as any).authentication?.idToken ||
        // Web (ou alguns nativos):
        (response.params as any)?.id_token;

      if (!idToken) return onError?.(new Error('Sem id_token'));
      onSuccess(idToken);
    } else if (response.type === 'error') {
      onError?.((response as any).error ?? new Error('Falha na autenticação'));
    }
  }, [response]);

  return { request, promptAsync };
}
