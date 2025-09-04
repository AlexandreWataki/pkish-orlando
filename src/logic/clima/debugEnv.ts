// src/logic/clima/debugEnv.ts
import Constants from 'expo-constants';

export function logClimaEnv() {
  const envKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
  const extraKey =
    (Constants?.expoConfig as any)?.extra?.WEATHER_API_KEY ??
    (Constants as any)?.manifest?.extra?.WEATHER_API_KEY;

  const mask = (v?: string | null) =>
    !v ? 'absent' : `${v.slice(0, 4)}***len=${v.length}`;

  console.log('[WEATHER_DEBUG] EXPO_PUBLIC_WEATHER_API_KEY =', mask(envKey as any));
  console.log('[WEATHER_DEBUG] extra.WEATHER_API_KEY      =', mask(extraKey));
}
