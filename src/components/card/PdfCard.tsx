// src/components/card/PdfCard.tsx
import React, { memo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  titulo: string;            // Ex.: "Magic Kingdom — Mapa Oficial (PDF)"
  parque?: string;           // Ex.: "Disney"
  descricao?: string;        // Ex.: "Mapa interativo • Atualizado 2025"
  onPress?: () => void;      // Navegar para VisualizarPDFScreen
};

const VERMELHO_NEON = '#FF4C4C';
const VERMELHO_ESCURO = '#7A0014';
const VERMELHO_BORDA = '#FF6B6B';

const PdfCard = ({ titulo, parque, descricao, onPress }: Props) => {
  const blink = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0.25, duration: 600, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, [blink]);

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      <View style={styles.leftIcon}>
        <Animated.View style={{ opacity: blink }}>
          <MaterialCommunityIcons name="file-pdf-box" size={28} color="#FFFFFF" />
        </Animated.View>
      </View>

      <View style={styles.right}>
        <Text numberOfLines={2} style={styles.title}>{titulo}</Text>
        {!!parque && <Text style={styles.parque}>{parque}</Text>}
        {!!descricao && <Text style={styles.textJust}>{descricao}</Text>}
      </View>

      {/* Selo piscante no canto */}
      <Animated.View style={[styles.seal, { opacity: blink }]}>
        <MaterialCommunityIcons name="lightning-bolt-outline" size={18} color={VERMELHO_NEON} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default memo(PdfCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '92%',
    alignSelf: 'center',
    backgroundColor: VERMELHO_ESCURO,
    borderRadius: 20,
    padding: 12,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: VERMELHO_BORDA,
    shadowColor: VERMELHO_NEON,
    shadowOpacity: 0.55,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
    position: 'relative',
  },
  leftIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  right: { flex: 1 },
  title: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  parque: { color: '#FFDADA', fontSize: 12, marginTop: 2 },
  textJust: {
    marginTop: 8,
    color: '#FFECEC',
    fontSize: 13,
    textAlign: 'justify',
    lineHeight: 19,
  },
  seal: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: VERMELHO_ESCURO,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: VERMELHO_NEON,
    shadowColor: VERMELHO_NEON,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
});
