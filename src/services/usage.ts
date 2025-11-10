// src/services/usage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Application from 'expo-application';
import { Platform } from 'react-native';
import { env } from '@/config/env';

const STORAGE_FLAG = '@gravou_usage_ok';

async function getDeviceId() {
  try {
    if (Platform.OS === 'android') {
      // ✅ método correto do expo-application
      const id = await Application.getAndroidId();
      return id || 'unknown';
    }

    // ✅ iOS: usa o ID do fornecedor (vendor)
    const iosId = await Application.getIosIdForVendorAsync?.();
    return iosId || 'unknown';
  } catch {
    return 'unknown';
  }
}

export async function tentarGravarUso(payload: Record<string, any> = {}) {
  try {
    const deviceId = await getDeviceId();
    const appVersion = Application.nativeApplicationVersion || '0';

    const res = await fetch(`${env.apiUrl}/usage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceId,
        appVersion,
        data: { action: 'comecar', ...payload },
      }),
    });

    const json = await res.json().catch(() => ({} as any));
    const ok = !!json?.ok;

    if (ok) {
      await AsyncStorage.setItem(STORAGE_FLAG, 'true');
    }

    return ok;
  } catch {
    // não bloqueia o fluxo caso falhe
    return false;
  }
}

export async function leFlagGravou() {
  const v = await AsyncStorage.getItem(STORAGE_FLAG);
  return v === 'true';
}

export async function limpaFlagGravou() {
  await AsyncStorage.removeItem(STORAGE_FLAG);
}
