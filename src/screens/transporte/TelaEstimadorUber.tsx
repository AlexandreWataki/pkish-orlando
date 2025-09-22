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
      <Text style={styles.label}>ðŸš— Estimativa Uber</Text>
      <Text>ðŸ›£ï¸ DistÃ¢ncia: {distanciaKm} km</Text>
      <Text>ðŸ•’ Tempo estimado: {tempoEstimado} min</Text>
      <Text>ðŸ’² Custo estimado: R$ {precoEstimado}</Text>
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
