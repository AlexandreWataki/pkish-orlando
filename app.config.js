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
    sdkVersion: '54.0.0',
    runtimeVersion: { policy: 'sdkVersion' },
    updates: { fallbackToCacheTimeout: 0 },

    ...(exists('./assets/icon.png') ? { icon: './assets/icon.png' } : {}),

    ios: { /* ... seus campos ... */ },
    android: { /* ... seus campos ... */ },

    plugins: ['expo-file-system', 'expo-audio', 'expo-video'],

    web: {
      ...(exists('./assets/favicon.png') ? { favicon: './assets/favicon.png' } : {}),
    },

    extra: {
      // Mantém compat, mas não dependa disso no código
      WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
    },
  },
};
