// src/config/env.ts
import Constants from "expo-constants";

// garante leitura segura do objeto extra (tanto no app.config.js quanto no build EAS)
const extra =
  (Constants.expoConfig?.extra as any) ||
  (Constants.manifest2?.extra as any) ||
  {};

export const env = {
  // === API (Cloud Run) ===
  apiUrl:
    extra.EXPO_PUBLIC_API_URL ||
    process.env.EXPO_PUBLIC_API_URL ||
    "https://pkish-api-417776644821.us-east4.run.app",

  // === Google OAuth (Android + Web) ===
  googleAndroidClientId:
    extra.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ||
    process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ||
    "417776644821-1e6uf2sp43bdl8jibi6fhata30q06is2.apps.googleusercontent.com",

  googleWebClientId:
    extra.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ||
    process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ||
    "417776644821-79b4qvfutmo5v2f95q0sje5736aiblc7.apps.googleusercontent.com",

  // === Deep Link / App Scheme ===
  appScheme: extra.EXPO_PUBLIC_APP_SCHEME || "pkish",
};
