ï»¿// src/components/card/BotaoMenuNeon.tsx
import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AZUL_NEON = '#00FFFF';
const AZUL_BORDA = '#00BFFF';
const AZUL_ESCURO = '#001F3F';

type Props = {
  titulo: string;
  subtitulo: string;
  /** Nome do Ã­cone do Ionicons (ex.: "map-outline"). Se nÃ£o passar, usa emoji. */
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  /** Fallback caso nÃ£o use Ã­cone */
  emoji?: string;
  onPress: () => void;
};

export default function BotaoMenuNeon({
  titulo,
  subtitulo,
  icon,
  emoji = 'âœ¨',
  onPress,
}: Props) {
  const borderAnim = useRef(new Animated.Value(0)).current;
  const brilhoAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // AnimaÃ§Ã£o da borda piscante
    Animated.loop(
      Animated.timing(borderAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      })
    ).start();

    // AnimaÃ§Ã£o de brilho (opacidade)
    Animated.loop(
      Animated.sequence([
        Animated.timing(brilhoAnim, { toValue: 0.4, duration: 1000, useNativeDriver: true }),
        Animated.timing(brilhoAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [AZUL_BORDA, '#FFFFFF', AZUL_BORDA],
  });

  return (
    <Animated.View style={[styles.container, { borderColor: animatedBorderColor }]}>
      <TouchableOpacity
        style={styles.botao}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={titulo}
      >
        <Animated.View style={[styles.linhaTitulo, { opacity: brilhoAnim }]}>
          {icon ? (
            <Ionicons name={icon} size={18} color={AZUL_NEON} style={{ marginRight: 6 }} />
          ) : (
            <Text style={styles.emoji}>{emoji}</Text>
          )}
          <Text style={styles.titulo}>{titulo}</Text>
        </Animated.View>

        <Animated.Text style={[styles.subtitulo, { opacity: brilhoAnim }]}>
          {subtitulo}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '92%',
    borderWidth: 2,
    borderRadius: 14,
    backgroundColor: AZUL_ESCURO,
    alignSelf: 'center',
    marginBottom: 5,
    shadowColor: AZUL_BORDA,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  emoji: {
    fontSize: 16,
    color: AZUL_NEON,
    textShadowColor: AZUL_BORDA,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    marginRight: 6,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AZUL_NEON,
    textShadowColor: AZUL_BORDA,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    includeFontPadding: false,
  },
  subtitulo: {
    fontSize: 9,
    color: AZUL_NEON,
    textShadowColor: AZUL_BORDA,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    marginTop: 2,
    textAlign: 'center',
    includeFontPadding: false,
  },
});
