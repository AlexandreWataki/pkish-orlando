// src/auth/useGoogleIdToken.ts
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { env } from '@/config/env';

WebBrowser.maybeCompleteAuthSession();

type SuccessCb = (idToken: string) => Promise<void> | void;
type ErrorCb = (error: unknown) => Promise<void> | void;

/**
 * Hook para obter um Google ID Token (OIDC) via AuthSession/PKCE.
 * - Emite o id_token com audience = WEB CLIENT ID (env.googleWebClientId).
 * - Mantém androidClientId para compatibilidade com o fluxo Google no Android.
 * - O back-end deve validar contra GOOGLE_CLIENT_ID = WEB CLIENT ID (ou aceitar múltiplas audiences).
 */
export function useGoogleIdTokenAuth(onSuccess: SuccessCb, onError: ErrorCb) {
  const redirectUri = AuthSession.makeRedirectUri({
    native: `${env.appScheme ?? 'pkish'}:/oauth2redirect/google`,
  });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // Importante: usamos o WEB CLIENT ID como clientId principal
    clientId: env.googleWebClientId,
    // Mantemos o androidClientId para compatibilidade de UX no Android
    androidClientId: env.googleAndroidClientId,
    redirectUri,
    scopes: ['openid', 'email', 'profile'],
    selectAccount: true,
  });

  useEffect(() => {
    if (!response) return;
    try {
      if (response.type === 'success') {
        const idToken =
          // Expo retorna id_token em params (AuthSession) OU em authentication.idToken
          (response.params as any)?.id_token ||
          (response as any)?.authentication?.idToken;

        if (idToken) {
          onSuccess(idToken);
        } else {
          onError(new Error('Sem id_token retornado.'));
        }
      } else if (response.type === 'error') {
        onError((response as any)?.error ?? new Error('Falha na autenticação do Google.'));
      } else if (response.type === 'dismiss' || response.type === 'cancel') {
        onError(new Error('Login cancelado pelo usuário.'));
      }
    } catch (err) {
      onError(err);
    }
  }, [response, onSuccess, onError]);

  return { promptAsync, ready: !!request };
}
