// src/logic/types/enableLayoutAnimationAndroidLegacy.ts
import { Platform, UIManager } from 'react-native';

/**
 * Ativa o LayoutAnimation só no Android com arquitetura antiga.
 * Em Fabric (New Architecture) é no-op, então não chamamos.
 */
export function enableLayoutAnimationAndroidLegacy() {
  if (Platform.OS !== 'android') return;

  // Presença do Fabric indica New Architecture
  const isFabric = (global as any).nativeFabricUIManager != null;

  if (!isFabric && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
