// app.config.js
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const exists = (p) => fs.existsSync(path.resolve(process.cwd(), p));

// IDs configuráveis por .env (com defaults seguros)
const ANDROID_PACKAGE = process.env.ANDROID_PACKAGE || 'com.example.roteirovisivel';
const IOS_BUNDLE_ID = process.env.IOS_BUNDLE_ID || 'com.example.roteirovisivel';

// build numbers (incrementar quando publicar)
const ANDROID_VERSION_CODE = Number(process.env.ANDROID_VERSION_CODE || 1);
const IOS_BUILD_NUMBER = process.env.IOS_BUILD_NUMBER || '1';

export default {
  expo: {
    name: 'Disney',
    slug: 'roteiro-visivel-app',

    // Versão de produto (sem impactar código nativo)
    version: '1.0.0',

    // SDK 54 + runtime por SDK (mantém OTA compatível)
    runtimeVersion: { policy: 'sdkVersion' },
    // Manter este campo ajuda ferramentas/diagnóstico
    sdkVersion: '54.0.0',

    orientation: 'portrait',
    assetBundlePatterns: ['**/*'],
    updates: { fallbackToCacheTimeout: 0 },

    // Ícones/Splash só entram se existirem
    ...(exists('./assets/icon.png') ? { icon: './assets/icon.png' } : {}),
    ...(exists('./assets/splash.png')
      ? {
          splash: {
            image: './assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
          },
        }
      : {}),
    ...(exists('./assets/adaptive-icon.png')
      ? {
          android: {
            adaptiveIcon: {
              foregroundImage: './assets/adaptive-icon.png',
              backgroundColor: '#ffffff',
            },
          },
        }
      : {}),

    ios: {
      bundleIdentifier: IOS_BUNDLE_ID,
      buildNumber: IOS_BUILD_NUMBER,
      supportsTablet: true,
      infoPlist: {
        NSMicrophoneUsageDescription:
          'Este app usa o microfone para gravações/áudio quando você escolhe gravar.',
        NSCameraUsageDescription:
          'Este app pode usar a câmera em funcionalidades de vídeo, se você permitir.',
      },
    },

    android: {
      package: ANDROID_PACKAGE,
      versionCode: ANDROID_VERSION_CODE,
      // Permissões mínimas para áudio/vídeo (ajuste conforme uso real)
      permissions: [
        'INTERNET',
        'RECORD_AUDIO', // necessário se gravar áudio com expo-audio
        'WAKE_LOCK',
        'FOREGROUND_SERVICE',
      ],
      // adaptiveIcon já configurado acima se o arquivo existir
    },

    web: {
      ...(exists('./assets/favicon.png') ? { favicon: './assets/favicon.png' } : {}),
    },

    // Plugins usados no seu projeto (SDK 54: migração expo-av -> expo-audio/video)
    plugins: [
      'expo-file-system',
      'expo-audio',
      'expo-video',
      // Descomente se quiser forçar sdks/targets específicos:
      // [
      //   'expo-build-properties',
      //   {
      //     android: { minSdkVersion: 24, compileSdkVersion: 35, targetSdkVersion: 35 },
      //     ios: { deploymentTarget: '13.0' }
      //   }
      // ]
    ],

    extra: {
      // Disponível em Constants.expoConfig.extra e process.env.EXPO_PUBLIC_WEATHER_API_KEY no app
      WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
      // Mantém o projectId se você estiver usando EAS (opcional; EAS injeta automaticamente)
      // eas: { projectId: '...' },
    },
  },
};
