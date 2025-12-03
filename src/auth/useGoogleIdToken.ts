// src/auth/useGoogleIdToken.ts
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useRef, useCallback } from "react";
import { Platform } from "react-native";
import { env } from "@/config/env";

WebBrowser.maybeCompleteAuthSession();

type SuccessCb = (idToken: string) => Promise<void> | void;
type ErrorCb = (error: unknown) => Promise<void> | void;

export function useGoogleIdTokenAuth(onSuccess: SuccessCb, onError: ErrorCb) {
  const isWeb = Platform.OS === "web";

  // === redirectUri EXATO que o Google espera ===
  // WEB  -> http://localhost:8081/  (igual ao que você cadastrou)
  // NATIVO -> pkish:/oauth2redirect/google
  const redirectUri = isWeb
    ? "http://localhost:8081/"
    : AuthSession.makeRedirectUri({
        native: `${env.appScheme}:/oauth2redirect/google`,
      });

  console.log("[GoogleAuth] platform:", Platform.OS);
  console.log("[GoogleAuth] redirectUri:", redirectUri);

  const baseConfig: Google.GoogleIdTokenRequestConfig = {
    clientId: env.googleWebClientId,        // WEB CLIENT
    androidClientId: env.googleAndroidClientId,
    iosClientId: env.googleIosClientId,
    redirectUri,                            // 👈 sempre envia o mesmo redirectUri
    scopes: ["openid", "email", "profile"],
    selectAccount: true,
  };

  const [request, response, promptAsyncOriginal] =
    Google.useIdTokenAuthRequest(baseConfig);

  // evita tratar a mesma resposta 2x
  const responseHandled = useRef(false);

  const promptAsync = useCallback(
    async (...args: Parameters<typeof promptAsyncOriginal>) => {
      responseHandled.current = false;
      return promptAsyncOriginal(...args);
    },
    [promptAsyncOriginal]
  );

  useEffect(() => {
    if (!response) return;
    if (responseHandled.current) return;
    responseHandled.current = true;

    console.log("[GoogleAuth] response.type:", response.type);

    try {
      if (response.type === "success") {
        const idToken =
          (response.params as any)?.id_token ||
          (response as any)?.authentication?.idToken;

        if (idToken) {
          console.log("[GoogleAuth] idToken OK");
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
