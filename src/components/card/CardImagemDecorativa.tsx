import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const CardImagemDecorativa = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/imagens/ingresso.jpg')}
        style={styles.imagem}
        resizeMode="cover"
      />

      <Image
        source={require('@/assets/imagens/selo_parque.png')}
        style={styles.selo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc',
    position: 'relative',
  },
  imagem: {
    width: '100%',
    height: 250,
  },
  selo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 120,
    height: 120,
    transform: [{ rotate: '-15deg' }],
    zIndex: 2,
  },
});
