ï»¿import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OpcaoTransporte {
  subtitulo: string;
  descricao: string;
}

interface Props {
  titulo: string;
  local: string;
  opcoes: OpcaoTransporte[];
}

export const CardResumoTransporte = ({ titulo, local, opcoes }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="car-sport" size={20} color="white" style={styles.icon} />
        <Text style={styles.headerText}>{titulo}</Text>
      </View>
      
        {opcoes.map((opcao, index) => (
        <View key={index} style={styles.blocoTexto}>
          <Text style={styles.label}>{opcao.subtitulo}</Text>
          <Text style={styles.valor}>{opcao.descricao}</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 119, 200, 0.9)', // branco translÃƒÂºcido
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
  blocoTexto: {
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 2,
  },
  valor: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
});
