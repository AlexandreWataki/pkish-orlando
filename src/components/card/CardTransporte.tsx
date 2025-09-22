import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  meio: string;
  tempoEstimado: string;
  destino: string;
};

export const CardTransporte = ({ meio, tempoEstimado, destino }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons name="car-outline" size={22} color="#16a085" />
        <Text style={styles.titulo}>{meio}</Text>
      </View>
      <Text style={styles.descricao}>
        Tempo estimado atÃ© {destino}: {tempoEstimado}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8f8f5',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1abc9c',
  },
  descricao: {
    fontSize: 14,
    color: '#117a65',
  },
});
