import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type Props = {
  nomeParque: string;
  imagemMapa: any; // require('@/assets/magic-kingdom-map.jpg')
};

export const CardMapaParque = ({ nomeParque, imagemMapa }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{nomeParque}</Text>
      <Image source={imagemMapa} style={styles.imagem} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdfefe',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    elevation: 2,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});
