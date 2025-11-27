/** @type {import('@expo/config').ExpoConfig} */
export default {
  name: "Pkish",
  slug: "pkish",
  owner: "matheuswataki",
  version: "1.0.0",
  userInterfaceStyle: "light",

  scheme: "pkish",

  updates: {
    url: "https://u.expo.dev/4d5a9e0c-eda5-4fa7-88c5-84ba39fbc8e0",
    checkAutomatically: "ON_LOAD",
    fallbackToCacheTimeout: 0,
  },

  runtimeVersion: "1.0.0",

  android: {
    package: "com.matheuswataki.pkish",
    permissions: ["INTERNET", "VIBRATE"],
    intentFilters: [
      {
        action: "VIEW",
        category: ["BROWSABLE", "DEFAULT"],
        data: [{ scheme: "pkish" }],
      },
    ],
  },

  ios: {
    bundleIdentifier: "com.matheuswataki.pkish",
    infoPlist: {
      LSApplicationQueriesSchemes: ["youtube", "vnd.youtube"],
      ...(process.env.EXPO_PUBLIC_ALLOW_HTTP_NATIVE === "true"
        ? { NSAppTransportSecurity: { NSAllowsArbitraryLoads: true } }
        : {}),
    },
  },

  plugins: ["expo-updates"],

  extra: {
    /** === Google OAuth === */
    // 🔹 WEB Client ID (usado no backend)
    EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID:
      process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ??
      "417776644821-79b4qvfutmo5v2f95q0sje5736aiblc7.apps.googleusercontent.com",

    // 🔹 ANDROID Client ID (corrigido com letras certas)
    EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID:
      process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ??
      "417776644821-1e6uf2sp43bdlj8ib6fhata30q06i2s.apps.googleusercontent.com",

    // 🔹 iOS Client ID (faltava este)
    EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID:
      process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ??
      "417776644821-1ksfbonjbdc85b4sbvcga15ieq0jdhm.apps.googleusercontent.com",

    /** === API (Cloud Run) === */
    EXPO_PUBLIC_API_URL:
      process.env.EXPO_PUBLIC_API_URL ??
      "https://pkish-api-417776644821.us-east4.run.app",

    /** === Rede === */
    EXPO_PUBLIC_ALLOW_HTTP_NATIVE:
      process.env.EXPO_PUBLIC_ALLOW_HTTP_NATIVE ?? "false",
    EXPO_PUBLIC_FORCE_HTTPS_NATIVE:
      process.env.EXPO_PUBLIC_FORCE_HTTPS_NATIVE ?? "true",

    /** === Clima === */
    EXPO_PUBLIC_WEATHER_API_KEY:
      process.env.EXPO_PUBLIC_WEATHER_API_KEY ?? "",

    /** === Deep Link / Scheme === */
    EXPO_PUBLIC_APP_SCHEME:
      process.env.EXPO_PUBLIC_APP_SCHEME ?? "pkish",

    /** === Ambiente === */
    EXPO_PUBLIC_ENVIRONMENT:
      process.env.EXPO_PUBLIC_ENVIRONMENT ?? "production",

    /** === EAS === */
    eas: { projectId: "4d5a9e0c-eda5-4fa7-88c5-84ba39fbc8e0" },
  },
};
