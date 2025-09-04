import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import CardAtracao from '@/components/cards/CardAtracao';
import { Atracao } from '@/logic/types/atracao';
import atracoesJson from '@/data/atracoes/index.json';

export default function Explorar() {
  const [filtro, setFiltro] = useState('');
  const [atracoes, setAtracoes] = useState<Atracao[]>([]);

  useEffect(() => {
    setAtracoes(atracoesJson as Atracao[]);
  }, []);

  const atracoesFiltradas = atracoes.filter((a) =>
    a.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🔍 Explorar Atrações</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nome..."
        value={filtro}
        onChangeText={setFiltro}
      />

      <FlatList
        data={atracoesFiltradas}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => <CardAtracao atracao={item} />}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma atração encontrada.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  vazio: {
    marginTop: 20,
    textAlign: 'center',
    color: '#999',
  },
});
