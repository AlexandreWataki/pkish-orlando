import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  meio?: string;
  distancia?: string;
  tempoEstimado?: string;
  destino?: string;
  precoUber?: string;
  icone?: keyof typeof Ionicons.glyphMap;
  tipo?: 'disney' | 'universal' | 'compras' | 'saida' | 'chegada' | 'descanso' | 'default';
};

export const CardTransporteChegada = ({
  meio = 'Carro',
  distancia = '---',
  tempoEstimado = '---',
  destino = 'destino',
  precoUber,
  icone = 'car-outline',
  tipo = 'chegada',
}: Props) => {
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(borderAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgba(0,255,255,1)', 'rgba(0,119,204,1)', 'rgba(0,255,255,1)'],
  });

  const coresPorTipo = {
    disney: { fundo: '#1976D2' },
    chegada: { fundo: '#1976D2' },
    saida: { fundo: 'rgba(0, 100, 200, 0.8)' },
    universal: { fundo: 'rgba(85, 0, 170, 0.9)' },
    compras: { fundo: 'rgba(0, 150, 100, 0.9)' },
    descanso: { fundo: 'rgba(0, 180, 220, 0.9)' },
    default: { fundo: '#1976D2' },
  };

  const { fundo } = coresPorTipo[tipo] ?? coresPorTipo.default;

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: fundo,
          borderWidth: 1.5,
          borderColor: animatedBorderColor,
          shadowColor: '#00ffff',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 5,
        },
      ]}
    >
      <View style={styles.header}>
        <Ionicons name={icone} size={12} color="#FFFFFFFF" style={styles.icon} />
        <Text style={styles.title}>{meio}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.descricao}>
          Distância: {distancia}
          {'\n'}Tempo estimado: {tempoEstimado} até {destino}
          {precoUber ? `\nUber/Lyft: ${precoUber}` : ''}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginVertical: 6,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  icon: {
    marginRight: 4,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFFFF',
    textAlign: 'justify',
    lineHeight: 14,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  content: {
    marginTop: 2,
  },
  descricao: {
    fontSize: 10,
    color: '#FFFFFFFF',
    lineHeight: 14,
    textAlign: 'justify',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});

export default CardTransporteChegada;
