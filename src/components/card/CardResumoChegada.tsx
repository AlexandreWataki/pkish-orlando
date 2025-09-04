// src/components/card/CardResumoChegada.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  titulo: string;
  dados?: { label: string; valor?: string }[];
}

export const CardResumoChegada = ({ titulo, dados }: Props) => {
  const listaDados = Array.isArray(dados) ? dados : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="information-circle" size={20} color="white" style={styles.icon} />
        <Text style={styles.headerText}>{titulo}</Text>
      </View>

      {listaDados.map((item, index) => (
        <View key={index} style={styles.blocoLinha}>
          <Text style={styles.label}>{item.label}: </Text>
          <Text style={styles.valor}>{item.valor || 'Não informado'}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
    marginHorizontal: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 119, 200, 0.9)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 6,
    marginHorizontal: -12,
    marginTop: -12,
    marginBottom: 8,
  },
  icon: {
    marginRight: 6,
    marginLeft: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  blocoLinha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: 'bold',
    color: '#003366',
    fontSize: 14,
  },
  valor: {
    color: '#333',
    fontSize: 14,
    flexShrink: 1,
  },
});
