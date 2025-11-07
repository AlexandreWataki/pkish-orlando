import React, { memo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Promocao } from './promocao';

const AZUL_NEON = '#00FFFF';
const AZUL_BORDA = '#00BFFF';
const AZUL_ESCURO = '#002B5B';

type Props = {
  item: Promocao & { sobre?: string; oQueTem?: string[]; imperdivel?: boolean }; // <- garante o campo
  onPress?: (p: Promocao) => void;
};

const PromoCard = ({ item, onPress }: Props) => {
  const blink = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0.2, duration: 600, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, [blink]);

  const texto = [
    item.sobre || item.descricao,
    item.oQueTem ? item.oQueTem.join(', ') : null,
  ]
    .filter(Boolean)
    .join(' — ');

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onPress?.(item)}
      accessibilityRole="button"
      accessibilityLabel={`${item.titulo}. ${item.parceiro ?? ''}`}
    >
      <View style={styles.right}>
        <Text numberOfLines={2} style={styles.title}>{item.titulo}</Text>
        {item.parceiro ? <Text style={styles.parceiro}>{item.parceiro}</Text> : null}
        <Text style={styles.textJust}>{texto}</Text>
      </View>

      {/* Selo IMPERDÍVEL piscante (fica à esquerda do megafone) */}
      {item.imperdivel ? (
        <Animated.View style={[styles.badgeImperdivel, { opacity: blink }]}>
          <Text style={styles.badgeText}>IMPERDÍVEL</Text>
        </Animated.View>
      ) : null}

      {/* Megafone piscante no canto */}
      <Animated.View style={[styles.megafoneIcon, { opacity: blink }]}>
        <Ionicons name="megaphone-outline" size={18} color={AZUL_NEON} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default memo(PromoCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '92%',
    alignSelf: 'center',
    backgroundColor: AZUL_ESCURO,
    borderRadius: 20,
    padding: 12,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: AZUL_BORDA,
    shadowColor: AZUL_NEON,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
    position: 'relative',
  },
  right: { flex: 1 },
  title: { flex: 1, color: AZUL_NEON, fontWeight: '700', fontSize: 16 },
  parceiro: { color: '#bfefff', fontSize: 12, marginTop: 2 },
  textJust: {
    marginTop: 8,
    color: '#cfefff',
    fontSize: 13,
    textAlign: 'justify',
    lineHeight: 19,
  },

  /* ---- CANTO SUPERIOR DIREITO ---- */
  megafoneIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: AZUL_ESCURO,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: AZUL_NEON,
    shadowColor: AZUL_NEON,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  // Badge fica ANTES do megafone (mais à esquerda)
  badgeImperdivel: {
    position: 'absolute',
    top: 8,
    right: 40,                 // <- desloca para a esquerda do megafone
    paddingHorizontal: 10,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#001a33',
    borderWidth: 1.5,
    borderColor: AZUL_NEON,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: AZUL_NEON,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  badgeText: {
    color: AZUL_NEON,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
