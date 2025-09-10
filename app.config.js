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

    // Ícones e splash (troque pelos seus arquivos)
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#001F3F'
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.seuorg.roteirovisivelapp', // troque pelo seu reverso de domínio
      infoPlist: {
        // Só adicione chaves de privacidade se realmente usar os recursos:
        // NSMicrophoneUsageDescription: 'Usamos o microfone para gravar notas de voz no app.',
      }
    },
    android: {
      // TROQUE PELO SEU ID FINAL ANTES DE PUBLICAR NO GOOGLE PLAY
      package: 'com.seuorg.roteirovisivelapp',
      versionCode: 1,

      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#001F3F'
      },

      // Permissões mínimas (evite as que a Play reprova como SYSTEM_ALERT_WINDOW)
      permissions: [
        'INTERNET',
        'VIBRATE'
        // Adicione apenas se realmente gravar áudio:
        // 'RECORD_AUDIO'
      ],

      // O targetSdkVersion é gerenciado pelo Expo (não fixe manualmente)
      blockedPermissions: [
        // Garante que nada legado vaze pro Manifest:
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.SYSTEM_ALERT_WINDOW'
      ],

      // Se usar deep links, você pode definir intentFilters aqui depois.
      // intentFilters: [...]
    },

    // Web (opcional)
    web: {
      bundler: 'metro',
      favicon: './assets/favicon.png'
    },

    // Plugins que você realmente usa (evite plugin sobrando)
    plugins: [
      'expo-file-system',
      'expo-audio',
      'expo-video'
      // Adicione aqui outros plugins que você efetivamente usa:
      // 'expo-secure-store',
      // 'expo-splash-screen',
      // 'expo-linking',
    ],

    extra: {
      // Use EAS Secrets para valores sensíveis. Aqui, só chaves públicas.
      EXPO_PUBLIC_WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY
    }
  }
};
