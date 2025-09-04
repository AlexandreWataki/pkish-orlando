// src/components/card/CardObjetivo.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  tipoDia?: string;
  nomeParque?: string;
};

export const CardObjetivo = ({ tipoDia = '', nomeParque = '' }: Props) => {
  const tipo = tipoDia
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim() || '';

  const getTitulo = () => {
    if (tipo === 'chegada') return 'Aeroporto de Orlando';
    if (tipo === 'saida') return 'Hotel em Orlando';
    if (tipo === 'descanso') return 'Dia de Descanso';
    if (tipo === 'compras') return 'Dia de Compras';
    if ((tipo.includes('disney') || tipo.includes('universal')) && nomeParque) {
      return nomeParque;
    }
    return 'Dia do Roteiro';
  };

  const getSubtitulo = () => {
    if (tipo === 'chegada') return '→ Hotel';
    if (tipo === 'saida') return '→ Aeroporto de Orlando';
    if (tipo === 'descanso') return 'Relaxar e aproveitar';
    if (tipo === 'compras') return 'Visitar shoppings ou outlets';
    if (tipo.includes('disney') || tipo.includes('universal')) {
      return 'Diversão o dia todo';
    }
    return '';
  };

  const getIcone = () => {
    if (tipo === 'chegada') return 'airplane';
    if (tipo === 'saida') return 'exit';
    if (tipo === 'descanso') return 'bed';
    if (tipo === 'compras') return 'cart';
    if (tipo.includes('disney') || tipo.includes('universal')) return 'ticket';
    return 'flag';
  };

  // 🔹 Efeito de fade do selo (2000ms)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 6000, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 6000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // 🔹 Fundo translúcido (10% de azul)
  const backgroundColor = 'rgba(0, 119, 200, 0.2)';

  return (
    <View style={[styles.card, { backgroundColor }]}>
      {/* 🔹 Selo animado no fundo do card */}
      <View style={styles.seloContainer}>
        <Animated.Image
          source={require('@/assets/imagens/selo_parque.png')}
          style={[
            styles.selo,
            { opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) },
          ]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require('@/assets/imagens/selo_parque_ativo.png')}
          style={[styles.selo, { opacity: fadeAnim }]}
          resizeMode="contain"
        />
      </View>

      {/* 🔹 Conteúdo do card */}
      <View style={styles.row}>
        <Ionicons name={getIcone()} size={16} color="#ffffff" style={styles.icon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.titulo} adjustsFontSizeToFit numberOfLines={2}>
            {getTitulo()}
          </Text>
          <Text style={styles.subtitulo} adjustsFontSizeToFit numberOfLines={2}>
            {getSubtitulo()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '98%',
    alignSelf: 'center',
    borderRadius: 10,           // 🔹 Raio 10
    paddingVertical: 8,
    paddingHorizontal: '5%',
    marginVertical: 6,
    overflow: 'hidden',         // 🔹 Mantém o selo dentro do card
    // 🔹 Borda removida
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  titulo: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'justify',
    lineHeight: 14,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  subtitulo: {
    fontSize: 10,
    color: 'white',
    marginTop: 2,
    textAlign: 'justify',
    lineHeight: 14,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  seloContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  selo: {
    width: '65%',
    height: '80%',
    position: 'absolute',
    marginRight: -60,
    right: 0,
  },
});

export default CardObjetivo;
