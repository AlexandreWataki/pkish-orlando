// app.config.cjs
const fs = require("fs");
try { require("dotenv").config(); } catch {}

const has = (p) => fs.existsSync(p);

module.exports = {
  expo: {
    // 🔤 Nome que aparece embaixo do ícone
    name: "Pkish Orlando",

    // (mantidos)
    slug: "Pkish Orlando",
    owner: "matheuswataki",
    scheme: "Pkish Orlando",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",

    // 🖼️ Ícone (fallbacks se não existir a pasta /icons)
    icon:
      has("./assets/icons/icon.png")
        ? "./assets/icons/icon.png"
        : has("./assets/icon.png")
        ? "./assets/icon.png"
        : undefined,

    // 🟦 Splash somente com degradê (imagem)
    splash: {
      image:
        has("./assets/splash/degrade.png")
          ? "./assets/splash/degrade.png"
          : has("./assets/splash.png")
          ? "./assets/splash.png"
          : undefined,
      resizeMode: "cover",
      backgroundColor: "#001F3F",
    },

    assetBundlePatterns: ["**/*"],
    runtimeVersion: { policy: "sdkVersion" },
    updates: { checkAutomatically: "ON_LOAD", fallbackToCacheTimeout: 0 },

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.seuorg.roteirovisivelapp",
    },

    android: {
      package: "com.seuorg.roteirovisivelapp",
      usesCleartextTraffic: true,

      // 🟦 Adaptive icon (Android 8+)
      adaptiveIcon: {
        foregroundImage:
          has("./assets/icons/icon-foreground.png")
            ? "./assets/icons/icon-foreground.png"
            : has("./assets/icons/icon.png")
            ? "./assets/icons/icon.png"
            : has("./assets/icon.png")
            ? "./assets/icon.png"
            : undefined,
        backgroundColor: "#001F3F",
      },

      // (sem permissões extras)
      permissions: [],

      // (opcional) reforça o mesmo splash no Android
      splash: {
        image: has("./assets/splash/degrade.png")
          ? "./assets/splash/degrade.png"
          : undefined,
        resizeMode: "cover",
        backgroundColor: "#001F3F",
      },
    },

    web: {
      bundler: "metro",
      favicon: has("./assets/favicon.png") ? "./assets/favicon.png" : undefined,
    },

    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            gradlePluginVersion: "8.6.0",
            kotlinVersion: "2.0.21",
            minSdkVersion: 24,
            targetSdkVersion: 35,
            compileSdkVersion: 35,
          },
        },
      ],
    ],

    extra: {
      EXPO_PUBLIC_WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY ?? "",
      EXPO_PUBLIC_API_HOST: process.env.EXPO_PUBLIC_API_HOST ?? "",
      EXPO_PUBLIC_API_PORT: process.env.EXPO_PUBLIC_API_PORT ?? "",
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL ?? "",
      eas: { projectId: "73d31851-0ae9-4a0d-abd5-b211c767cdb5" },
    },
  },
};
