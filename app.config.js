/** @type {import('@expo/config').ExpoConfig} */
export default {
  expo: {
    name: 'Pkish',
    slug: 'pkish',
    owner: 'matheuswataki',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    scheme: 'pkish',

    runtimeVersion: { policy: 'sdkVersion' },
    assetBundlePatterns: ['**/*'],
    updates: { checkAutomatically: 'ON_LOAD', fallbackToCacheTimeout: 0 },

    androidNavigationBar: {
      visible: 'immersive',
      backgroundColor: '#001F3F',
      barStyle: 'light-content',
    },
    androidStatusBar: {
      backgroundColor: '#001F3F',
      barStyle: 'light-content',
      hidden: false,
    },

    android: {
      package: 'com.matheuswataki.pkish',
      permissions: ['INTERNET', 'VIBRATE'],
      blockedPermissions: [
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.SYSTEM_ALERT_WINDOW',
      ],
    },

    extra: {
      // 🌍 Google OAuth
      googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? '',
      googleAndroidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? '',
      googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? '',

      // 🔑 API + Weather
      weatherApiKey: process.env.EXPO_PUBLIC_WEATHER_API_KEY ?? '',
      apiUrl: process.env.EXPO_PUBLIC_API_URL ?? '',
      apiHost: process.env.EXPO_PUBLIC_API_HOST ?? '',
      apiPort: process.env.EXPO_PUBLIC_API_PORT ?? '',
      allowHttpInNative: process.env.EXPO_PUBLIC_ALLOW_HTTP_NATIVE === 'true',
      forceHttpsInNative: process.env.EXPO_PUBLIC_FORCE_HTTPS_NATIVE === 'true',

      // 📦 EAS
      eas: { projectId: '4d5a9e0c-eda5-4fa7-88c5-84ba39fbc8e0' },
    },
  },
};
