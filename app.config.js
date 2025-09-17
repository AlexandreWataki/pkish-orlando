// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'Disney',
    slug: 'roteiro-visivel-app',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'light',

    // Mantém o app compatível com cache por versão do SDK
    sdkVersion: '54.0.0',
    runtimeVersion: { policy: 'sdkVersion' },

    // Atualizações OTA (ajuste conforme sua estratégia)
    updates: {
      url: undefined,              // não usar EAS Update ainda
      fallbackToCacheTimeout: 0    // usa bundle embarcado no primeiro start
    },

    assetBundlePatterns: ['**/*'],

    // Ícones e splash
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#001F3F'
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.seuorg.roteirovisivelapp',
      infoPlist: {
        // Exemplo de chave opcional de privacidade:
        // NSMicrophoneUsageDescription: 'Usamos o microfone para gravar notas de voz no app.',
      }
    },

    android: {
      package: 'com.seuorg.roteirovisivelapp',
      versionCode: 1,

      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#001F3F'
      },

      permissions: [
        'INTERNET',
        'VIBRATE'
        // 'RECORD_AUDIO' se realmente usar
      ],

      blockedPermissions: [
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.SYSTEM_ALERT_WINDOW'
      ],
    },

    web: {
      bundler: 'metro',
      favicon: './assets/favicon.png'
    },

    plugins: [
      'expo-file-system',
      'expo-audio',
      'expo-video'
      // outros plugins usados de fato
    ],

    extra: {
      EXPO_PUBLIC_WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
      EXPO_PUBLIC_API_HOST: process.env.EXPO_PUBLIC_API_HOST,
      EXPO_PUBLIC_API_PORT: process.env.EXPO_PUBLIC_API_PORT,
    }
  }
};
