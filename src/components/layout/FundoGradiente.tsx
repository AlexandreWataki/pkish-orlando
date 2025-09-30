import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type Dia = {
  numero: number;
  data: string;
  tipo: string;
  parque_nome?: string;
  destino?: string;
};

type Props = {
  bloco: Dia;
  onPress?: () => void;
};

export default function DiaCardPadrao({ bloco, onPress }: Props) {
  const tipoFormatado = bloco.tipo.toLowerCase().includes('chegada') ? 'chegada' :
                        bloco.tipo.toLowerCase().includes('disney') ? 'disney' :
                        bloco.tipo.toLowerCase().includes('universal') ? 'universal' :
                        bloco.tipo.toLowerCase().includes('compras') ? 'compras' :
                        bloco.tipo.toLowerCase().includes('saida') ? 'saida' : 'default';

  const icone = {
    chegada: '🛬',
    saida: '🛫',
    disney: '🏰',
    universal: '🎬',
    compras: '🛍️',
    default: '📅',
  }[tipoFormatado];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.titulo}>{icone} Dia {bloco.numero} - {bloco.data}</Text>
      <Text style={styles.linha}>Tipo: <Text style={styles.valor}>{bloco.tipo}</Text></Text>
      {bloco.parque_nome && (
        <Text style={styles.linha}>🎢 Parque: <Text style={styles.valor}>{bloco.parque_nome}</Text></Text>
      )}
      {bloco.destino && (
        <Text style={styles.linha}>📍 Destino: <Text style={styles.valor}>{bloco.destino}</Text></Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    padding: 14,
    marginVertical: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  linha: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 2,
  },
  valor: {
    color: '#fff',
    fontWeight: '600',
  },
});
