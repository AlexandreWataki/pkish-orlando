
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  titulo: string;
  icone?: string;
  children: React.ReactNode;
};

export default function InfoCard({ titulo, icone, children }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{icone} {titulo}</Text>
      <View style={styles.conteudo}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  conteudo: {
    paddingLeft: 8,
  },
});
