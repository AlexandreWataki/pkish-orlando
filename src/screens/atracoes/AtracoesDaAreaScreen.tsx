import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/logic/types/navigation';

// Map estático com os arquivos
import atracoes_Animal_Kingdom_africa from '@/data/atracoes/atracoes_Animal_Kingdom_africa.json';
import atracoes_Animal_Kingdom_asia from '@/data/atracoes/atracoes_Animal_Kingdom_asia.json';
import atracoes_Animal_Kingdom_pandora from '@/data/atracoes/atracoes_Animal_Kingdom_pandora.json';
// ...adicione os demais conforme necessário

const arquivosMap: Record<string, any> = {
  'atracoes_Animal_Kingdom_africa.json': atracoes_Animal_Kingdom_africa,
  'atracoes_Animal_Kingdom_asia.json': atracoes_Animal_Kingdom_asia,
  'atracoes_Animal_Kingdom_pandora.json': atracoes_Animal_Kingdom_pandora
  // ...complete conforme o projeto
};

interface Atracao {
  nome: string;
  icone?: string;
  horario: string;
  tempoFilaAceitavel?: string;
  alturaMinima?: string;
}

type Props = {
  route: RouteProp<RootStackParamList, 'AtracoesDaArea'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'AtracoesDaArea'>;
};

export default function AtracoesDaAreaScreen({ route }: Props) {
  const { arquivo } = route.params;
  const [atracoes, setAtracoes] = useState<Atracao[]>([]);

  useEffect(() => {
    const data = arquivosMap[arquivo];
    if (data) setAtracoes(data);
    else console.error('Arquivo de atrações não encontrado:', arquivo);
  }, [arquivo]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎠 Atrações da área: {arquivo.replace('.json', '')}</Text>
      <FlatList
        data={atracoes}
        keyExtractor={(item, index) => `${item.nome}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.icone || '🎢'} {item.nome}</Text>
            <Text style={styles.linha}>🕒 Horário: {item.horario}</Text>
            {item.tempoFilaAceitavel && <Text style={styles.linha}>⏳ Fila: {item.tempoFilaAceitavel}</Text>}
            {item.alturaMinima && <Text style={styles.linha}>📏 Altura mínima: {item.alturaMinima}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0', padding: 16 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  nome: { fontSize: 16, fontWeight: 'bold' },
  linha: { fontSize: 14, color: '#444', marginTop: 4 },
});
