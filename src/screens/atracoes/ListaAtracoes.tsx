import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import CardAtracao from 'src/components/cards/CardAtracao';
import { Atracao } from '@/logic/types/atracao';
import atracoesJson from '@/data/atracoes/index.json';

type Secao = {
  title: string;
  data: Atracao[];
};

export default function ListaAtracoes() {
  const [secoes, setSecoes] = useState<Secao[]>([]);

  useEffect(() => {
    const lista: Atracao[] = atracoesJson as Atracao[];

    // Agrupar por área
    const agrupado: { [area: string]: Atracao[] } = {};
    lista.forEach((a) => {
      if (!agrupado[a.area]) agrupado[a.area] = [];
      agrupado[a.area].push(a);
    });

    const secoesFormatadas: Secao[] = Object.entries(agrupado).map(([area, atracoes]) => ({
      title: area,
      data: atracoes,
    }));

    setSecoes(secoesFormatadas);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎡 Atrações por Área</Text>

      <SectionList
        sections={secoes}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => <CardAtracao atracao={item} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma atração disponível.</Text>}
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
    marginBottom: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  vazio: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
