ï»¿// src/logic/types/enableLayoutAnimationAndroidLegacy.ts
import { Platform, UIManager } from 'react-native';

/**
 * Ativa o LayoutAnimation sÃƒÂ³ no Android com arquitetura antiga.
 * Em Fabric (New Architecture) ÃƒÂ© no-op, entÃƒÂ£o nÃƒÂ£o chamamos.
 */
export function enableLayoutAnimationAndroidLegacy() {
  if (Platform.OS !== 'android') return;

  // PresenÃƒÂ§a do Fabric indica New Architecture
  const isFabric = (global as any).nativeFabricUIManager != null;

  if (!isFabric && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
