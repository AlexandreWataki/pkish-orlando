// src/auth/useGoogleIdToken.ts
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { Platform } from "react-native";
import { env } from "@/config/env";

WebBrowser.maybeCompleteAuthSession();

type SuccessCb = (idToken: string) => Promise<void> | void;
type ErrorCb = (error: unknown) => Promise<void> | void;

export function useGoogleIdTokenAuth(onSuccess: SuccessCb, onError: ErrorCb) {
  const isWeb = Platform.OS === "web";

  const redirectUri = isWeb
    ? `${globalThis?.location?.origin ?? ""}/`
    : AuthSession.makeRedirectUri({
        native: `${env.appScheme ?? "pkish"}:/oauth2redirect/google`,
      });

  console.log("[GoogleAuth] platform:", Platform.OS);
  console.log("[GoogleAuth] redirectUri:", redirectUri);
  console.log("[GoogleAuth] webClientId:", env.googleWebClientId);
  console.log("[GoogleAuth] androidClientId:", env.googleAndroidClientId);
  console.log("[GoogleAuth] iosClientId:", env.googleIosClientId);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: env.googleWebClientId, // web
    androidClientId: env.googleAndroidClientId,
    iosClientId: env.googleIosClientId,
    redirectUri,
    scopes: ["openid", "email", "profile"],
    selectAccount: true,
  });

  useEffect(() => {
    if (!response) return;

    console.log("[GoogleAuth] response:", response);

    try {
      if (response.type === "success") {
        const idToken =
          (response.params as any)?.id_token ||
          (response as any)?.authentication?.idToken;

        if (idToken) {
          onSuccess(idToken);
        } else {
          onError(new Error("Sem id_token retornado."));
        }
      } else if (response.type === "error") {
        onError(
          (response as any)?.error ??
            new Error("Falha na autenticação do Google.")
        );
      } else if (response.type === "dismiss" || response.type === "cancel") {
        onError(new Error("Login cancelado pelo usuário."));
      }
    } catch (err) {
      onError(err);
    }
  }, [response, onSuccess, onError]);

  return { promptAsync, ready: !!request };
}
