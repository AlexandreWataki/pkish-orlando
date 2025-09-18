import "dotenv/config";
import fs from "fs";

const has = (p) => fs.existsSync(p);

export default {
  expo: {
    name: "Disney",
    slug: "roteiro-visivel-app",
    scheme: "roteirovisivelapp",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",

    // ícones e splash (use ./assets na RAIZ do projeto)
    icon: has("./assets/icon.png") ? "./assets/icon.png" : undefined,
    splash: {
      image: has("./assets/splash.png") ? "./assets/splash.png" : undefined,
      resizeMode: "contain",
      backgroundColor: "#001F3F",
    },

    assetBundlePatterns: ["**/*"],

    // OTA compatível com a SDK
    runtimeVersion: { policy: "sdkVersion" },
    updates: { checkAutomatically: "ON_LOAD", fallbackToCacheTimeout: 0 },

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.seuorg.roteirovisivelapp",
    },

    android: {
      package: "com.seuorg.roteirovisivelapp",
      adaptiveIcon: {
        // foreground transparente é recomendado
        foregroundImage: has("./assets/adaptive-icon.png")
          ? "./assets/adaptive-icon.png"
          : has("./assets/icon.png")
          ? "./assets/icon.png"
          : undefined,
        backgroundColor: "#001F3F",
      },
      permissions: [],
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
            // ✅ compatível com a exigência do KSP no build do EAS
            kotlinVersion: "2.2.20",
            androidGradlePluginVersion: "8.6.1",

            // seu setup
            usesCleartextTraffic: true,
            minSdkVersion: 24,
            targetSdkVersion: 35,
            compileSdkVersion: 35,
          },
        },
      ],
    ],

    extra: {
      EXPO_PUBLIC_WEATHER_API_KEY:
        process.env.EXPO_PUBLIC_WEATHER_API_KEY ?? "",
      EXPO_PUBLIC_API_HOST: process.env.EXPO_PUBLIC_API_HOST ?? "",
      EXPO_PUBLIC_API_PORT: process.env.EXPO_PUBLIC_API_PORT ?? "",
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL ?? "",
      eas: { projectId: "30a8d6a9-aabf-45e9-bf3b-2045ec596ecd" }, // novo ID
    },
  },
};
