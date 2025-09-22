import React, { memo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Promocao } from './promocao';

const AZUL_NEON = '#00FFFF';
const AZUL_BORDA = '#00BFFF';
const AZUL_ESCURO = '#001F3F';

type Props = {
  item: Promocao & { sobre?: string; oQueTem?: string[] };
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

  // monta o texto Ãºnico
  const texto = [
    item.sobre || item.descricao,
    item.oQueTem ? item.oQueTem.join(', ') : null,
  ]
    .filter(Boolean)
    .join(' â€” ');

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onPress?.(item)}
    >
      <View style={styles.right}>
        <Text numberOfLines={2} style={styles.title}>{item.titulo}</Text>
        {item.parceiro ? <Text style={styles.parceiro}>{item.parceiro}</Text> : null}

        {/* Descritivo Ãºnico justificado */}
        <Text style={styles.textJust}>{texto}</Text>
      </View>

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
  title: { flex: 1, color: '#fff', fontWeight: '700', fontSize: 16 },
  parceiro: { color: '#bfefff', fontSize: 12, marginTop: 2 },
  textJust: {
    marginTop: 8,
    color: '#e6f7ff',
    fontSize: 13,
    textAlign: 'justify',
    lineHeight: 19,
  },
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
});
