import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  distanciaKm: number;
};

export default function EstimadorUber({ distanciaKm }: Props) {
  const precoEstimado = (distanciaKm * 3.2 + 7).toFixed(2); // tarifa base + por km
  const tempoEstimado = Math.ceil(distanciaKm * 2); // minutos (ex: 2 min/km)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>🚗 Estimativa Uber</Text>
      <Text>🛣️ Distância: {distanciaKm} km</Text>
      <Text>🕒 Tempo estimado: {tempoEstimado} min</Text>
      <Text>💲 Custo estimado: R$ {precoEstimado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#eef',
    borderRadius: 10,
    margin: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});