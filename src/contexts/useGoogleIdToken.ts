// src/auth/useGoogleIdToken.ts
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { useEffect } from 'react';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

type Extra = {
  googleWebClientId?: string;
  googleAndroidClientId?: string;
  googleIosClientId?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as Extra;

export function useGoogleIdTokenAuth(
  onSuccess: (idToken: string) => void,
  onError?: (e: any) => void
) {
  const appOwnership = (Constants as any)?.appOwnership as 'expo' | 'standalone' | 'guest' | null;
  const useProxy = appOwnership === 'expo';

  const redirectUri = makeRedirectUri({
    scheme: 'pkish',
    useProxy,
  });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      ...(extra.googleWebClientId
        ? { webClientId: extra.googleWebClientId, expoClientId: extra.googleWebClientId }
        : {}),
      ...(extra.googleAndroidClientId ? { androidClientId: extra.googleAndroidClientId } : {}),
      ...(extra.googleIosClientId ? { iosClientId: extra.googleIosClientId } : {}),
      selectAccount: true,
    },
    { useProxy, redirectUri }
  );

  useEffect(() => {
    if (!response) return;

    if (response.type === 'success') {
      const idToken =
        (response as any)?.authentication?.idToken ??
        (response.params as any)?.id_token;

      if (!idToken) return onError?.(new Error('Sem id_token retornado pelo Google.'));
      onSuccess(idToken);
    } else if (response.type === 'error') {
      onError?.((response as any).error ?? new Error('Falha na autenticação com o Google.'));
    }
  }, [response]);

  return { request, promptAsync, redirectUri };
}
