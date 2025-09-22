ï»¿import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';

type DiasDistribuidos = {
  chegada: number;
  saida: number;
  disney: number;
  universal: number;
  compras: number;
  descanso: number;
};

type ParkisheiroItem = {
  id: string;
  nome: string;
  email?: string;
  senha?: string;
  dataInicio?: Date;
  dataSaida?: Date;
  totalDias?: number;
  diasDistribuidos?: DiasDistribuidos;
  tipo: 'fixo' | 'dinamico';
};

const parkisFixos: ParkisheiroItem[] = [
  { id: '1', nome: 'JoÃƒÂ£o', tipo: 'fixo' as 'fixo' },
  { id: '2', nome: 'Maria', tipo: 'fixo' as 'fixo' },
  { id: '3', nome: 'Lucas', tipo: 'fixo' as 'fixo' },
];

export default function ListaParkisheiros() {
  const { parkisheiros } = useParkisheiro();

  const listaCompleta: ParkisheiroItem[] = [
    ...parkisFixos,
    ...parkisheiros.map((p) => ({ ...p, tipo: 'dinamico' as 'dinamico' })),
  ];

  const formatarData = (data?: Date) => {
    try {
      if (!data) return '';
      return new Date(data).toLocaleDateString('pt-BR');
    } catch {
      return '';
    }
  };

  const renderItem: ListRenderItem<ParkisheiroItem> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>Ã°Å¸â€˜Â¤ {item.nome}</Text>

      {item.email && <Text style={styles.info}>Ã°Å¸â€œÂ§ {item.email}</Text>}
      {item.senha && <Text style={styles.info}>Ã°Å¸â€Â {item.senha}</Text>}

      {item.dataInicio && item.dataSaida && (
        <Text style={styles.info}>
          Ã°Å¸â€”â€œ {formatarData(item.dataInicio)} atÃƒÂ© {formatarData(item.dataSaida)} ({item.totalDias || 0} dias)
        </Text>
      )}

      {item.diasDistribuidos && (
        <>
          <Text style={styles.info}>
            Ã°Å¸Å½Â¢ Disney: {item.diasDistribuidos.disney} | Ã°Å¸Å½Â¬ Universal: {item.diasDistribuidos.universal}
          </Text>
          <Text style={styles.info}>
            Ã°Å¸â€ºÂ Compras: {item.diasDistribuidos.compras} | Ã°Å¸ËœÅ’ Descanso: {item.diasDistribuidos.descanso}
          </Text>
        </>
      )}

      <Text style={styles.tipo}>{item.tipo === 'fixo' ? 'Ã°Å¸â€â€™ Fixo' : 'Ã°Å¸â€ â€¢ DinÃƒÂ¢mico'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Parkisheiros Cadastrados</Text>
      <FlatList
        data={listaCompleta}
        keyExtractor={(item, index) => `${item.id}-${item.tipo}-${index}`}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#ffffffcc',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  nome: { fontSize: 18, fontWeight: '600', color: '#003366', marginBottom: 4 },
  info: { fontSize: 14, color: '#000', marginBottom: 2 },
  tipo: { fontSize: 12, color: '#666', marginTop: 6, fontStyle: 'italic' },
});
