// src/config/env.ts
import Constants from "expo-constants";

const extra = (Constants.expoConfig?.extra ?? {}) as any;

export const env = {
  /** === API (Cloud Run) === */
  apiUrl:
    extra.EXPO_PUBLIC_API_URL ??
    process.env.EXPO_PUBLIC_API_URL ??
    "https://pkish-api-417776644821.us-east4.run.app",

  /** === Google OAuth === */
  googleWebClientId:
    extra.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ??
    process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ??
    "417776644821-79b4qvfutmo5v2f95q0sje5736aiblc7.apps.googleusercontent.com",

  googleAndroidClientId:
    extra.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ??
    process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ??
    "417776644821-1e6uf2sp43bdlj8ib6fhata30q06i2s.apps.googleusercontent.com",

  googleIosClientId:
    extra.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ??
    process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ??
    "417776644821-1ksfbonjbdc85b4sbvcga15ieq0jdhm.apps.googleusercontent.com",

  /** === Deep Link / Scheme === */
  appScheme:
    extra.EXPO_PUBLIC_APP_SCHEME ??
    process.env.EXPO_PUBLIC_APP_SCHEME ??
    "pkish",

  /** === Ambiente === */
  envName:
    extra.EXPO_PUBLIC_ENVIRONMENT ??
    process.env.EXPO_PUBLIC_ENVIRONMENT ??
    "production",
};
