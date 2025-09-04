import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Platform, Text } from 'react-native';
import LogoAtencao from './LogoAtencao';

export type AvisoLegalProps = {
  children?: React.ReactNode;
  incluirGuiaNaoOficial?: boolean;
  fixoNoRodape?: boolean;   // se true, fica acima do seu rodapé azul
  compact?: boolean;
  theme?: 'blue' | 'light'; // 'blue' = fundo azul, texto branco
  onPress?: () => void;

  /** novo: para igualar exatamente aos cards de input (largura/raio/padding) */
  variant?: 'card' | 'default';
};

const COLORS = {
  blueBg: '#004b87',
  white: '#FFFFFF',
  lightBg: 'rgba(255,255,255,0.95)',
  textBlue: '#004b87',
};

const AvisoLegal: React.FC<AvisoLegalProps> = ({
  children,
  incluirGuiaNaoOficial = true,
  fixoNoRodape = false,
  compact = true,
  theme = 'blue',
  onPress,
  variant = 'card', // padrão já igual aos outros cards
}) => {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.92, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const textoBase = children ?? (
    <>App independente sem vínculo Disney/Universal.</>
  );

  const isBlue = theme === 'blue';

  return (
    <Animated.View
      style={[
        styles.containerBase,
        variant === 'card' ? styles.cardLike : styles.defaultLike,
        isBlue ? styles.bgBlue : styles.bgLight,
        fixoNoRodape && styles.fixo,
        Platform.OS === 'android' && styles.androidElevation,
        { opacity: pulse },
      ]}
    >
      <TouchableOpacity
        activeOpacity={onPress ? 0.85 : 1}
        onPress={onPress}
        style={styles.inner}
      >
        <LogoAtencao size={compact ? 16 : 18} color={isBlue ? COLORS.white : COLORS.textBlue} blink />
        <View style={{ width: 10 }} />
        <Text
          style={[
            styles.texto,
            compact && styles.textoCompact,
            { color: isBlue ? COLORS.white : COLORS.textBlue },
          ]}
        >
          {textoBase}
          {incluirGuiaNaoOficial ? ' • Guia não oficial' : ''}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  containerBase: {
    alignSelf: 'center',
  },

  /** Igual aos outros cards (width/raio/padding/margens) */
  cardLike: {
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginVertical: 3,
  },

  /** Variante antiga (se precisar em outros lugares) */
  defaultLike: {
    width: '90%',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
  },

  inner: { flexDirection: 'row', alignItems: 'center' },
  bgBlue: { backgroundColor: COLORS.blueBg },
  bgLight: { backgroundColor: COLORS.lightBg },
  texto: {
    flex: 1,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  textoCompact: {
    fontSize: 9,
    lineHeight: 12,
  },
  fixo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 106, // fica acima do seu rodapé azul
  },
  androidElevation: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default AvisoLegal;
