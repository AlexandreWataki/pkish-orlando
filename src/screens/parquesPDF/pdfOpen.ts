// src/screens/parquesPDF/pdfOpen.ts
import { Platform, Linking as RNLinking } from 'react-native';
import * as ExpoLinking from 'expo-linking';

export const stripChromeExtensionUrl = (u: string) => {
  const m = (u || '').match(/chrome-extension:\/\/[^/]+\/(https?:\/\/.+)$/i);
  return m ? m[1] : u;
};

export const normalizeUrl = (raw: string) => {
  const clean = stripChromeExtensionUrl(String(raw || '').trim());
  return /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
};

/** Abrir direto no navegador/app padrão — mesmo comportamento das promoções */
export const openExternalDirect = async (rawUrl: string) => {
  const url = normalizeUrl(rawUrl);
  try {
    if (!url) return false;

    if (Platform.OS === 'web') {
      (window as any)?.open(url, '_blank', 'noopener,noreferrer');
      return true;
    }

    // Usa Expo Linking se existir; senão, Linking nativo
    const linking: any = (ExpoLinking as any)?.openURL ? ExpoLinking : RNLinking;
    await linking.openURL(url);
    return true;
  } catch {
    return false;
  }
};
