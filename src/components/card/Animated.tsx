import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

type Props = {
  titulo: string;
};

const AnimatedTituloTurno = ({ titulo }: Props) => {
  const brilhoAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(brilhoAnim, {
          toValue: 0.4,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(brilhoAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.Text style={[styles.titulo, { opacity: brilhoAnim }]}>âœ¨ {titulo.toUpperCase()} âœ¨</Animated.Text>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default AnimatedTituloTurno;
