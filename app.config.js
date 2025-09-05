import fs from 'fs';
import path from 'path';

const exists = (p) => fs.existsSync(path.resolve(process.cwd(), p));

// IDs via env (configure no EAS: Project → Secrets)
const ANDROID_PACKAGE = process.env.ANDROID_PACKAGE || 'com.example.roteirovisivel';
const IOS_BUNDLE_ID  = process.env.IOS_BUNDLE_ID  || 'com.example.roteirovisivel';

// build numbers
const ANDROID_VERSION_CODE = Number(process.env.ANDROID_VERSION_CODE || 1);
const IOS_BUILD_NUMBER     = process.env.IOS_BUILD_NUMBER || '1';

// API host/port (opcional)
const API_HOST = process.env.API_HOST || '';
const API_PORT = Number(process.env.API_PORT || 3000);

export default {
  expo: {
    name: 'Disney',
    slug: 'roteiro-visivel-app',

    // Produto
    version: '1.0.0',
    // SDK 54: ok usar runtimeVersion por policy
    runtimeVersion: { policy: 'sdkVersion' },

    orientation: 'portrait',
    assetBundlePatterns: ['**/*'],
    updates: { url: undefined, fallbackToCacheTimeout: 0 },

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
      permissions: [
        'INTERNET',
        'RECORD_AUDIO',
        'WAKE_LOCK',
        'FOREGROUND_SERVICE',
      ],
      ...(exists('./assets/adaptive-icon.png')
        ? {
            adaptiveIcon: {
              foregroundImage: './assets/adaptive-icon.png',
              backgroundColor: '#ffffff',
            },
          }
        : {}),
    },

    web: {
      ...(exists('./assets/favicon.png') ? { favicon: './assets/favicon.png' } : {}),
    },

    // ✅ SDK 54: use expo-audio / expo-video (não use expo-av)
    plugins: [
      'expo-file-system',
      'expo-audio',
      'expo-video',
      // Se precisar pin de sdks nativos, descomente:
      // [
      //   'expo-build-properties',
      //   {
      //     android: { minSdkVersion: 24, compileSdkVersion: 35, targetSdkVersion: 35 },
      //     ios: { deploymentTarget: '13.0' }
      //   }
      // ]
    ],

    extra: {
      WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
      API_HOST,
      API_PORT,
      // scheme útil para abrir o dev client via deep link
      // (opcional) ex.: roteiros://
      // scheme: 'roteiros',
    },

    // (Opcional) defina um scheme se quiser deep link personalizado:
    // scheme: 'roteiros',
  },
};
