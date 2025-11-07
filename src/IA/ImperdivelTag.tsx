// ImperdivelTag.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

export default function ImperdivelTag() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.2, duration: 550, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 550, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity, marginRight: 8 }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: '#FF3131',
          textShadowColor: '#FFD700',
          textShadowRadius: 8,
        }}
        numberOfLines={1}
      >
        ✨ IMPERDÍVEL
      </Text>
    </Animated.View>
  );
}
