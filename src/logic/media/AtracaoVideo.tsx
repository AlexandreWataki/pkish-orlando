// src/components/media/AtracaoVideo.tsx
import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { TouchableOpacity, Animated, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { openYouTube } from '@/logic/media/openYouTube'; // ✅ usa helper centralizado

type Props = {
  /** ID do YouTube (11 chars) ou URL (watch/shorts/embed/youtu.be). Se nada válido vier, não renderiza. */
  videoIdOrUrl?: string | null;
  /** Tamanho do ícone (default 18) */
  size?: number;
  /** Estilo extra para posicionamento — por padrão já fica absolute no canto superior esquerdo */
  style?: StyleProp<ViewStyle>;
  /** Define se o ícone “pisca”. Default: false (sem flashes) */
  blink?: boolean;
};

function extractId(input?: string | null): string | null {
  if (!input) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  const m = input.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

export default function AtracaoVideo({ videoIdOrUrl, size = 18, style, blink = false }: Props) {
  const videoId = useMemo(() => extractId(videoIdOrUrl ?? ''), [videoIdOrUrl]);

  // animação opcional (por padrão DESLIGADA para evitar “flashes”)
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!blink) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 900, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity, blink]);

  const open = useCallback(() => {
    if (!videoIdOrUrl && !videoId) return;
    // ✅ usa função global (abre app YouTube no mobile ou aba no web)
    openYouTube(videoIdOrUrl || videoId!);
  }, [videoIdOrUrl, videoId]);

  if (!videoIdOrUrl && !videoId) return null;

  return (
    <TouchableOpacity
      onPress={open}
      activeOpacity={0.85}
      hitSlop={{ top: 0, bottom: 0, left: 0, right: 0 }}
      style={[
        {
          position: 'absolute',
          left: 6,
          top: 6,
          padding: 4,
          backgroundColor: 'transparent',
          borderRadius: 999,
          zIndex: 5,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Abrir vídeo no YouTube"
    >
      <Animated.View style={{ opacity }}>
        <Ionicons name="logo-youtube" size={size} color="#FF0000" />
      </Animated.View>
    </TouchableOpacity>
  );
}
