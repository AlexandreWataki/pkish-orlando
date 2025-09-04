import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  titulo: string;
  descricao?: string;
  local?: string;
};

export const CardDescanso = ({ titulo, descricao, local }: Props) => {
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
      <View style={styles.header}>
        <Ionicons name="bed-outline" size={12} color="#000000ff" style={styles.icon} />
        <Text
          style={styles.title}
          adjustsFontSizeToFit
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {titulo}
        </Text>
      </View>
      <View style={styles.content}>
        {!!descricao && <Text style={styles.texto}>{descricao}</Text>}
        {!!local && <Text style={styles.texto}>{local}</Text>}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#00C853',
    borderRadius: 10,
    marginBottom: 10,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  icon: {
    marginRight: 4,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'justify',
    lineHeight: 14,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  content: {
    gap: 2,
  },
  texto: {
    color: '#000000ff',
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'justify',
  },
});

export default CardDescanso;
