import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OpcaoTransporte {
  subtitulo: string;
  descricao: string;
}

interface Props {
  titulo?: string;
  local?: string;
  opcoes?: OpcaoTransporte[];
}

export const CardTransporteAeroportoChegada = ({
  titulo = 'Transporte atÃ© a regiÃ£o',
  local = '',
  opcoes = [],
}: Props) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Ionicons name="car-sport" size={20} color="#FFD700" style={styles.icon} />
      <Text style={styles.headerText}>{titulo}</Text>
    </View>
    {local ? <Text style={styles.local}>{local}</Text> : null}
    {(opcoes && opcoes.length > 0) ? (
      opcoes.map((opcao, index) => (
        <View key={index} style={styles.blocoTexto}>
          <Text style={styles.label}>{opcao.subtitulo}</Text>
          <Text style={styles.valor}>{opcao.descricao}</Text>
        </View>
      ))
    ) : (
      <Text style={styles.valor}>Nenhuma opÃ§Ã£o de transporte disponÃ­vel.</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 180, 255, 0.9)', // Azul claro translÃºcido
    borderRadius: 16,
    padding: 14,
    marginVertical: 10,
    borderWidth: 3,
    borderColor: '#FFD700',                    // Borda amarela
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
    marginLeft: 2,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  local: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 10,
    marginLeft: 2,
    fontStyle: 'italic',
  },
  blocoTexto: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  valor: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 2,
  },
});
