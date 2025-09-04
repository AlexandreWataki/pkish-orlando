import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  dicas: string[];
}

export function CardDicas({ dicas }: Props) {
  if (dicas.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>💡 Dicas do Dia</Text>
      {dicas.map((dica, index) => (
        <Text key={index} style={styles.dica}>
          • {dica}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff80',
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#001F54',
  },
  dica: {
    fontSize: 15,
    marginBottom: 6,
    color: '#333',
  },
});
