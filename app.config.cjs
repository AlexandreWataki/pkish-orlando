// app.config.cjs — Non-CNG (sem blocos android/ios; tudo isso você controla no nativo)
try { require("dotenv").config(); } catch {}

module.exports = {
  expo: {
    name: "Pkish Orlando",
    slug: "pkish-orlando",
    owner: "matheuswataki",
    scheme: "pkishorlando",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",

    assetBundlePatterns: ["**/*"],
    runtimeVersion: { policy: "sdkVersion" },
    updates: { checkAutomatically: "ON_LOAD", fallbackToCacheTimeout: 0 },

    web: { bundler: "metro" },

    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            // mantém o alvo moderno, compatível com RN 0.81 / SDK 54
            minSdkVersion: 24,
            targetSdkVersion: 35,
            compileSdkVersion: 35
          }
        }
      ]
    ],

    extra: {
      EXPO_PUBLIC_WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY ?? "",
      EXPO_PUBLIC_API_HOST: process.env.EXPO_PUBLIC_API_HOST ?? "",
      EXPO_PUBLIC_API_PORT: process.env.EXPO_PUBLIC_API_PORT ?? "",
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL ?? ""
    },

    // vínculo do projeto no EAS
    eas: { projectId: "3a5c40cf-8775-40ff-b026-117509c9ceee" }
  }
};
