// src/logic/types/enableLayoutAnimationAndroidLegacy.ts
import { Platform, UIManager } from 'react-native';

/**
 * Ativa o LayoutAnimation sÃ³ no Android com arquitetura antiga.
 * Em Fabric (New Architecture) Ã© no-op, entÃ£o nÃ£o chamamos.
 */
export function enableLayoutAnimationAndroidLegacy() {
  if (Platform.OS !== 'android') return;

  // PresenÃ§a do Fabric indica New Architecture
  const isFabric = (global as any).nativeFabricUIManager != null;

  if (!isFabric && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
