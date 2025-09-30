// src/components/card/BotaoMenuNeon.tsx
import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

const AZUL_NEON  = '#00FFFF';
const AZUL_BORDA = '#00BFFF';
const AZUL_ESCURO = '#002B5B';

type Props = {
  titulo: string;
  subtitulo: string;
  emoji: string;
  onPress: () => void;
};

export default function BotaoMenuNeon({ titulo, subtitulo, emoji, onPress }: Props) {
  const borderAnim = useRef(new Animated.Value(0)).current;
  const brilhoAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Borda com leve pulsar (neon ↔ borda)
    Animated.loop(
      Animated.timing(borderAnim, {
        toValue: 1,
        duration: 2600,
        useNativeDriver: false,
      })
    ).start();

    // Brilho do conteúdo
    Animated.loop(
      Animated.sequence([
        Animated.timing(brilhoAnim, { toValue: 0.6, duration: 900, useNativeDriver: true }),
        Animated.timing(brilhoAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, [borderAnim, brilhoAnim]);

  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [AZUL_BORDA, AZUL_NEON, AZUL_BORDA],
  });

  return (
    <Animated.View style={[styles.container, { borderColor: animatedBorderColor }]}>
      <TouchableOpacity style={styles.botao} onPress={onPress} activeOpacity={0.9}>
        <View style={styles.linhaTitulo}>
          <Animated.Text style={[styles.emoji, { opacity: brilhoAnim }]}>{emoji}</Animated.Text>
          <Animated.Text style={[styles.titulo, { opacity: brilhoAnim }]}>{titulo}</Animated.Text>
        </View>
        <Animated.Text style={[styles.subtitulo, { opacity: brilhoAnim }]}>{subtitulo}</Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '92%',
    alignSelf: 'center',
    marginBottom: 5,

    // visual
    backgroundColor: AZUL_ESCURO,
    borderWidth: 2,
    borderRadius: 14,

    // glow
    shadowColor: AZUL_NEON,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 2,
  },
  emoji: {
    fontSize: 16,
    color: AZUL_NEON,
    textShadowColor: AZUL_BORDA,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AZUL_NEON,
    textShadowColor: AZUL_BORDA,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitulo: {
    fontSize: 9,
    color: AZUL_NEON,
    textShadowColor: AZUL_BORDA,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    marginTop: 2,
  },
});
