ï»¿import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  aeroporto: string;
  horario: string;
  cidadeOrigem?: string;
};

export const CardAeroporto = ({ aeroporto, horario, cidadeOrigem }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons name="airplane" size={24} color="#2980b9" />
        <Text style={styles.textoNegrito}>
          Chegada em {cidadeOrigem ?? 'origem indefinida'}
        </Text>
      </View>
      <Text style={styles.detalhe}>Aeroporto: {aeroporto}</Text>
      <Text style={styles.detalhe}>HorÃƒÂ¡rio: {horario}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  textoNegrito: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  detalhe: {
    fontSize: 14,
    color: '#34495e',
  },
});
