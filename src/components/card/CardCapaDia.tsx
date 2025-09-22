ï»¿// src/components/card/CardCapaDia.tsx

import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Props = {
  data: string;
  tipo: string;
  imagemFundo: string; // Ex: 'ingresso.jpg'
  selo?: string;       // Ex: 'selo_parque.png'
};

const tiposTraduzidos: Record<string, string> = {
  chegada: 'Chegada',
  saida: 'SaÃƒÂ­da',
  disney: 'Parque Disney',
  universal: 'Parque Universal',
  compras: 'Compras',
  descanso: 'Descanso',
};

export default function CardCapaDia({ data, tipo, imagemFundo, selo }: Props) {
  const dataFormatada = format(new Date(data), "EEEE, dd 'de' MMMM", { locale: ptBR });
  const tipoFormatado = tiposTraduzidos[tipo] || tipo;

  return (
    <ImageBackground
      source={require(`@/assets/imagens/${imagemFundo}`)}
      style={styles.container}
      imageStyle={styles.imagemFundo}
    >
      <View style={styles.overlay}>
        <Text style={styles.tipoTexto}>{tipoFormatado}</Text>
        <Text style={styles.dataTexto}>{dataFormatada}</Text>
        {selo && (
          <Image
            source={require(`@/assets/imagens/${selo}`)}
            style={styles.selo}
            resizeMode="contain"
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  imagemFundo: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 50, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  tipoTexto: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  dataTexto: {
    fontSize: 18,
    color: '#fff',
  },
  selo: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
});
