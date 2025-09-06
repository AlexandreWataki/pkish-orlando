// app.config.js
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const exists = (p) => fs.existsSync(path.resolve(process.cwd(), p));

export default {
  expo: {
    name: 'Disney',
    slug: 'roteiro-visivel-app',
    version: '1.0.0',
    orientation: 'portrait',
    runtimeVersion: { policy: 'sdkVersion' }, // EAS inferirá a SDK pela dependência "expo"
    updates: { fallbackToCacheTimeout: 0 },

    ...(exists('./assets/icon.png') ? { icon: './assets/icon.png' } : {}),

    ios: {
      // para iOS (quando for buildar iOS), é obrigatório:
      // bundleIdentifier: 'com.seuorg.disney',
    },

    android: {
      package: 'com.roteirovisivel.disney',   // obrigatório para Android
      versionCode: 1,
      adaptiveIcon: exists('./assets/adaptive-icon.png')
        ? { foregroundImage: './assets/adaptive-icon.png', backgroundColor: '#FFFFFF' }
        : undefined,
    },

    plugins: ['expo-file-system', 'expo-audio', 'expo-video'],

    web: {
      ...(exists('./assets/favicon.png') ? { favicon: './assets/favicon.png' } : {}),
    },

    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID || '5af40461-d503-48ee-8235-db931cb08ab1',
      },
      WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
    },
  },
};
