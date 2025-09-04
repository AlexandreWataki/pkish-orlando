import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

type Props = {
  meio: string;
  distancia?: string;
  tempoEstimado: string;
  destino: string;
  precoUber?: string;
};

export const CardTransporteAtracao = ({
  meio,
  distancia,
  tempoEstimado,
  destino,
  precoUber,
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

  return (
    <Animated.View
      style={[
        styles.card,
        {
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
        <Text style={styles.title}>{meio}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.descricao}>
          Distância: {distancia ?? '---'} | Tempo estimado: {tempoEstimado} até {destino}
          {precoUber ? ` | Uber/Lyft: ${precoUber}` : ''}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1976D2',
    borderRadius: 10,
    marginVertical: 6,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    textAlign: 'justify',
    lineHeight: 14,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});

export default CardTransporteAtracao;
