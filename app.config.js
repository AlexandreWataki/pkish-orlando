/** @type {import('@expo/config').ExpoConfig} */
export default {
  name: "Pkish",
  slug: "pkish",
  owner: "matheuswataki",
  version: "1.0.0",
  userInterfaceStyle: "light",

  // Deep Link scheme
  scheme: "pkish",

  updates: {
    url: "https://u.expo.dev/4d5a9e0c-eda5-4fa7-88c5-84ba39fbc8e0",
    checkAutomatically: "ON_LOAD",
    fallbackToCacheTimeout: 0
  },

  runtimeVersion: "1.0.0",

  android: {
    package: "com.matheuswataki.pkish",
    permissions: ["INTERNET", "VIBRATE"],
    // aceita pkish:// qualquer caminho (inclui /oauth2redirect/google)
    intentFilters: [
      {
        action: "VIEW",
        category: ["BROWSABLE", "DEFAULT"],
        data: [{ scheme: "pkish" }]
      }
    ]
  },

  ios: {
    bundleIdentifier: "com.matheuswataki.pkish",
    infoPlist: {
      LSApplicationQueriesSchemes: ["youtube", "vnd.youtube"],
      ...(process.env.EXPO_PUBLIC_ALLOW_HTTP_NATIVE === "true"
        ? { NSAppTransportSecurity: { NSAllowsArbitraryLoads: true } }
        : {})
    }
  },

  plugins: ["expo-updates"],

  extra: {
    // === Google OAuth ===
    EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID:
      process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ??
      "417776644821-79b4qvfutmo5v2f95q0sje5736aiblc7.apps.googleusercontent.com",

    EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID:
      process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ??
      "417776644821-1e6uf2sp43bdl8jibi6fhata30q06is2.apps.googleusercontent.com",

    // === API (Cloud Run) ===
    EXPO_PUBLIC_API_URL:
      process.env.EXPO_PUBLIC_API_URL ??
      "https://pkish-api-417776644821.us-east4.run.app",

    // (opcional) chaves/flags que você já usa no projeto
    EXPO_PUBLIC_ALLOW_HTTP_NATIVE:
      process.env.EXPO_PUBLIC_ALLOW_HTTP_NATIVE ?? "false",
    EXPO_PUBLIC_FORCE_HTTPS_NATIVE:
      process.env.EXPO_PUBLIC_FORCE_HTTPS_NATIVE ?? "true",
    EXPO_PUBLIC_WEATHER_API_KEY:
      process.env.EXPO_PUBLIC_WEATHER_API_KEY ?? "",

    // ✅ alinhar com env.ts (ele lê EXPO_PUBLIC_APP_SCHEME)
    EXPO_PUBLIC_APP_SCHEME:
      process.env.EXPO_PUBLIC_APP_SCHEME ?? "pkish",

    eas: { projectId: "4d5a9e0c-eda5-4fa7-88c5-84ba39fbc8e0" }
  }
};
