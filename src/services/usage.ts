// src/services/usage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Application from 'expo-application';
import { Platform } from 'react-native';
import { env } from '@/config/env';

const STORAGE_FLAG = '@gravou_usage_ok';

/** Obtém um ID único do dispositivo (Android ou iOS) */
async function getDeviceId(): Promise<string> {
  try {
    if (Platform.OS === 'android') {
      // ✅ método correto do expo-application
      const id = await Application.getAndroidId();
      return id || 'unknown';
    }

    // ✅ iOS: usa o ID do fornecedor (vendor)
    const iosId = await Application.getIosIdForVendorAsync?.();
    return iosId || 'unknown';
  } catch (err) {
    console.warn('⚠️ Falha ao obter deviceId:', err);
    return 'unknown';
  }
}

/** Envia um registro leve de uso da aplicação para o backend (/usage) */
export async function tentarGravarUso(payload: Record<string, any> = {}): Promise<boolean> {
  try {
    const deviceId = await getDeviceId();
    const appVersion = Application.nativeApplicationVersion || '0';
    const body = JSON.stringify({
      deviceId,
      appVersion,
      data: { action: 'comecar', ...payload },
    });

    const res = await fetch(`${env.apiUrl}/usage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    // garante parsing seguro do JSON
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
    const ok = !!json?.ok;

    if (ok) {
      await AsyncStorage.setItem(STORAGE_FLAG, 'true');
    }

    return ok;
  } catch (err) {
    console.warn('⚠️ Falha ao gravar uso:', err);
    // não bloqueia o fluxo caso falhe
    return false;
  }
}

/** Lê se já foi gravado uso anteriormente */
export async function leFlagGravou(): Promise<boolean> {
  const v = await AsyncStorage.getItem(STORAGE_FLAG);
  return v === 'true';
}

/** Limpa a flag de uso gravado */
export async function limpaFlagGravou(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_FLAG);
}
