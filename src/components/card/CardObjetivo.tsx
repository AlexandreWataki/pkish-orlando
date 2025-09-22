ï»¿// src/components/card/CardObjetivo.tsx
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
    if (tipo === 'chegada') return 'Ã¢â€ â€™ Hotel';
    if (tipo === 'saida') return 'Ã¢â€ â€™ Aeroporto de Orlando';
    if (tipo === 'descanso') return 'Relaxar e aproveitar';
    if (tipo === 'compras') return 'Visitar shoppings ou outlets';
    if (tipo.includes('disney') || tipo.includes('universal')) {
      return 'DiversÃƒÂ£o o dia todo';
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

  // Ã°Å¸â€Â¹ Efeito de fade do selo (2000ms)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 6000, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 6000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Ã°Å¸â€Â¹ Fundo translÃƒÂºcido (10% de azul)
  const backgroundColor = 'rgba(0, 119, 200, 0.2)';

  return (
    <View style={[styles.card, { backgroundColor }]}>
      {/* Ã°Å¸â€Â¹ Selo animado no fundo do card */}
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

      {/* Ã°Å¸â€Â¹ ConteÃƒÂºdo do card */}
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
    borderRadius: 10,           // Ã°Å¸â€Â¹ Raio 10
    paddingVertical: 8,
    paddingHorizontal: '5%',
    marginVertical: 6,
    overflow: 'hidden',         // Ã°Å¸â€Â¹ MantÃƒÂ©m o selo dentro do card
    // Ã°Å¸â€Â¹ Borda removida
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
