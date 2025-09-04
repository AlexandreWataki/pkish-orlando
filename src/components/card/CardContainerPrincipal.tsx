import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Animated,
} from 'react-native';

type Props = {
  children: React.ReactNode;
  imagemFundo?: ImageSourcePropType;
};

export const CardContainerPrincipal = ({ children, imagemFundo }: Props) => {
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
        styles.wrapper,
        {
          borderWidth: 1.5,
          borderColor: animatedBorderColor,
          shadowColor: '#00ffff',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 5,
          borderRadius: 10,
          overflow: 'hidden',
        },
      ]}
    >
      <ImageBackground
        source={imagemFundo || require('@/assets/imagens/ingresso.jpg')}
        style={styles.container}
        imageStyle={styles.backgroundImage}
      >
        <Image
          source={require('@/assets/imagens/selo_parque.png')}
          style={styles.ticket}
          resizeMode="contain"
        />
        <View style={styles.overlay}>{children}</View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  container: {
    alignSelf: 'stretch',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    resizeMode: 'repeat',
    width: '100%',
    height: '100%',
  },
  ticket: {
    position: 'absolute',
    top: -5,
    right: 10,
    width: 100,
    height: 100,
    transform: [{ rotate: '-20deg' }],
    zIndex: 5,
  },
  overlay: {
    padding: 8,
  },
});

export default CardContainerPrincipal;
