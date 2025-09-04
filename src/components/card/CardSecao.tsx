import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  ImageBackground,
} from 'react-native';
import fundo from '../../assets/imagens/fundo.png';

type Props = {
  titulo: string;
  subtitulo?: string;
  tipo?: 'importante' | 'descanso' | 'compras' | 'refeicao' | 'disney' | 'universal' | 'area' | 'noite' | 'informativa';
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export const CardSecao = ({
  titulo,
  subtitulo,
  tipo = 'descanso',
  children,
  style,
}: Props) => {
  const tituloCompleto = subtitulo ? `${titulo} ${subtitulo}` : titulo;

  const corBase =
    tipo === 'noite' || tipo === 'importante' || tipo === 'area' || tipo === 'informativa'
      ? '#6A0DAD'
      : tipo === 'compras'
      ? 'rgba(255,204,0,0.2)'
      : tipo === 'refeicao'
      ? 'rgba(255,183,77,0.2)'
      : tipo === 'disney'
      ? 'rgba(0,119,204,0.05)'
      : tipo === 'universal'
      ? 'rgba(85,0,170,0.2)'
      : 'rgba(0,119,204,0.2)';

  const brilhoAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(brilhoAnim, { toValue: 0.85, duration: 2000, useNativeDriver: true }),
        Animated.timing(brilhoAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(borderAnim, { toValue: 1, duration: 3000, useNativeDriver: false })
    ).start();
  }, []);

  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#00BFFF', '#ffffff', '#00BFFF'],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        style,
        {
          borderWidth: 1.8,
          borderColor: animatedBorderColor as any,
          shadowColor: '#00BFFF',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 8,
        },
      ]}
    >
      <ImageBackground
        source={fundo}
        resizeMode="repeat"
        imageStyle={styles.imageSize}
        style={styles.background}
      >
        <View style={[styles.innerCard, { backgroundColor: corBase }]}>
          <View style={styles.header}>
            <Animated.Text
              style={[
                styles.title,
                tipo === 'noite' && styles.titleNoite, // apenas noite -> 14
                { opacity: brilhoAnim },
              ]}
              numberOfLines={2}
            >
              ✨ {tituloCompleto.toUpperCase()} ✨
            </Animated.Text>
          </View>
          <View style={styles.content}>{children}</View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  background: {
    width: '100%',
  },
  imageSize: {
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
  },
  innerCard: {
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: '5%',
  },
  header: {
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    width: '100%',
    textShadowColor: '#00BFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  titleNoite: {
    fontSize: 12,
  },
  content: {
    marginTop: 2,
    width: '100%',
  },
  texto: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'justify',
    lineHeight: 14,
    flexWrap: 'wrap',
  },
});

export default CardSecao;
