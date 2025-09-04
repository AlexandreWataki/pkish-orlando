import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  size?: number;
  color?: string;
  blink?: boolean;
};

const LogoAtencao: React.FC<Props> = ({ size = 18, color = '#FFFFFF', blink = true }) => {
  const anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!blink) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 0.6, duration: 200, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ])
    ).start();
  }, [blink]);

  return (
    <Animated.View style={{ opacity: anim }}>
      <Ionicons name="warning-outline" size={size} color={color} />
    </Animated.View>
  );
};

export default LogoAtencao;
