import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

type Props = {
  itens: string[];
};

export const CardListaSimples = ({ itens }: Props) => {
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
          borderColor: animatedBorderColor,
          borderWidth: 1.5,
          shadowColor: '#00ffff',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 5,
        },
      ]}
    >
      {itens.map((item, idx) => (
        <View key={idx} style={styles.item}>
          <Text style={styles.texto}>{item}</Text>
        </View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4C0073',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  texto: {
    fontSize: 10,
    lineHeight: 14,
    color: '#ffffff',
    textAlign: 'justify',
    flexShrink: 1,
  },
});

export default CardListaSimples;
