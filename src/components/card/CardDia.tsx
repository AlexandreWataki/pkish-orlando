import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  data?: string;
  diaSemana?: string;
  clima?: string;
  temperatura?: string;
};

export const CabecalhoDia = ({
  data = '01/06/2025',
  diaSemana = 'Domingo',
  clima = 'Ensolarado',
  temperatura = '30°C',
}: Props) => {
  return (
    <ImageBackground
      source={require('@/assets/imagens/ingresso.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.header}>
        <Image source={require('@/assets/imagens/logo.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.infoBox}>
          <Text style={styles.diaSemana}>{diaSemana}</Text>
          <Text style={styles.data}>{data}</Text>
        </View>
        <View style={styles.climaBox}>
          <Ionicons name="cloud-outline" size={24} color="white" />
          <Text style={styles.temperatura}>{temperatura}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 180,
    justifyContent: 'flex-end',
    padding: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 40,
  },
  infoBox: {
    flex: 1,
    marginLeft: 12,
  },
  diaSemana: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  data: {
    fontSize: 14,
    color: '#eee',
  },
  climaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  temperatura: {
    color: '#fff',
    fontSize: 16,
  },
});
