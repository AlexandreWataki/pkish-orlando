// src/logic/media/YouTubeViewCore.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { openYouTube } from '@/logic/media/openYouTube'; // ✅ helper global

type Props = {
  idOrUrl: string;
  height?: number;
  autoplay?: boolean;
  onOpenExternal?: () => void;
};

/**
 * Componente minimalista que apenas dispara a abertura do vídeo
 * no YouTube (app ou navegador) e não renderiza player embutido.
 */
export default function YouTubeViewCore({
  idOrUrl,
  height = 250,
  onOpenExternal,
}: Props) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!idOrUrl) {
        if (mounted) setOpened(true);
        onOpenExternal?.();
        return;
      }
      try {
        await openYouTube(idOrUrl);   // ✅ usa função global (Web + Android/iOS)
      } finally {
        if (mounted) {
          setOpened(true);
          onOpenExternal?.();
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [idOrUrl, onOpenExternal]);

  // apenas reserva espaço visual (sem WebView)
  return <View style={[styles.container, { height }]} />;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
