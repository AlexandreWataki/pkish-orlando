/** @type {import('@expo/config').ExpoConfig} */
const androidId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID
  ? process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID.replace('.apps.googleusercontent.com', '')
  : '';

export default {
  name: "Pkish",
  slug: "pkish",
  owner: "matheuswataki",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "light",

  scheme: "pkish",

  updates: {
    url: "https://u.expo.dev/4d5a9e0c-eda5-4fa7-88c5-84ba39fbc8e0",
    checkAutomatically: "ON_LOAD",
    fallbackToCacheTimeout: 0,
  },

  runtimeVersion: "1.0.0",
  assetBundlePatterns: ["**/*"],

  androidNavigationBar: {
    visible: "visible",
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  },
  androidStatusBar: {
    backgroundColor: "#001F3F",
    barStyle: "light-content",
    hidden: false,
  },

  android: {
    package: "com.matheuswataki.pkish",
    permissions: ["INTERNET", "VIBRATE"],
    blockedPermissions: [
      "android.permission.WRITE_EXTERNAL_STORAGE",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.SYSTEM_ALERT_WINDOW",
    ],
    intentFilters: [
      // Só o do scheme do app é necessário pro OAuth/redirect
      {
        action: "VIEW",
        data: [{ scheme: "pkish" }],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },

  plugins: ["expo-updates"],

  extra: {
    googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? "",
    googleAndroidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? "",
    googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? "",
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "",
    allowHttpInNative: process.env.EXPO_PUBLIC_ALLOW_HTTP_NATIVE === "true",
    forceHttpsInNative: process.env.EXPO_PUBLIC_FORCE_HTTPS_NATIVE === "true",
    eas: { projectId: "4d5a9e0c-eda5-4fa7-88c5-84ba39fbc8e0" },
  },
};
