
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/logic/types/navigation';

// Imports dos arquivos de atrações
import atracoes from '@/data/atracoes/atracoes.json';
import atracoes_Animal_Kingdom_africa from '@/data/atracoes/atracoes_Animal_Kingdom_africa.json';
import atracoes_Animal_Kingdom_asia from '@/data/atracoes/atracoes_Animal_Kingdom_asia.json';
import atracoes_Animal_Kingdom_dinoland from '@/data/atracoes/atracoes_Animal_Kingdom_dinoland.json';
import atracoes_Animal_Kingdom_discoveryisland from '@/data/atracoes/atracoes_Animal_Kingdom_discoveryisland.json';
import atracoes_Animal_Kingdom_oasis from '@/data/atracoes/atracoes_Animal_Kingdom_oasis.json';
import atracoes_Animal_Kingdom_pandora from '@/data/atracoes/atracoes_Animal_Kingdom_pandora.json';
import atracoes_Animal_Kingdom_pandorao from '@/data/atracoes/atracoes_Animal_Kingdom_pandorao.json';
import atracoes_EPCOT_world_celebration from '@/data/atracoes/atracoes_EPCOT_world_celebration.json';
import atracoes_EPCOT_world_discovery from '@/data/atracoes/atracoes_EPCOT_world_discovery.json';
import atracoes_EPCOT_world_nature from '@/data/atracoes/atracoes_EPCOT_world_nature.json';
import atracoes_EPCOT_world_showcase from '@/data/atracoes/atracoes_EPCOT_world_showcase.json';
import atracoes_HS_animation_courtyard from '@/data/atracoes/atracoes_HS_animation_courtyard.json';
import atracoes_HS_echo_lake from '@/data/atracoes/atracoes_HS_echo_lake.json';
import atracoes_HS_galaxys_edge from '@/data/atracoes/atracoes_HS_galaxys_edge.json';
import atracoes_HS_hollywood_boulevard from '@/data/atracoes/atracoes_HS_hollywood_boulevard.json';
import atracoes_HS_sunset_boulevard from '@/data/atracoes/atracoes_HS_sunset_boulevard.json';
import atracoes_HS_toy_story_land from '@/data/atracoes/atracoes_HS_toy_story_land.json';
import atracoes_Magic_Kingdom_adventureland from '@/data/atracoes/atracoes_Magic_Kingdom_adventureland.json';
import atracoes_Magic_Kingdom_fantasyland from '@/data/atracoes/atracoes_Magic_Kingdom_fantasyland.json';
import atracoes_Magic_Kingdom_frontierland from '@/data/atracoes/atracoes_Magic_Kingdom_frontierland.json';
import atracoes_Magic_Kingdom_libertysquare from '@/data/atracoes/atracoes_Magic_Kingdom_libertysquare.json';
import atracoes_Magic_Kingdom_mainstreet from '@/data/atracoes/atracoes_Magic_Kingdom_mainstreet.json';
import atracoes_Magic_Kingdom_tomorrowland from '@/data/atracoes/atracoes_Magic_Kingdom_tomorrowland.json';

const arquivosMap: Record<string, any> = {
  "atracoes.json": atracoes,
  "atracoes_Animal_Kingdom_africa.json": atracoes_Animal_Kingdom_africa,
  "atracoes_Animal_Kingdom_asia.json": atracoes_Animal_Kingdom_asia,
  "atracoes_Animal_Kingdom_dinoland.json": atracoes_Animal_Kingdom_dinoland,
  "atracoes_Animal_Kingdom_discoveryisland.json": atracoes_Animal_Kingdom_discoveryisland,
  "atracoes_Animal_Kingdom_oasis.json": atracoes_Animal_Kingdom_oasis,
  "atracoes_Animal_Kingdom_pandora.json": atracoes_Animal_Kingdom_pandora,
  "atracoes_Animal_Kingdom_pandorao.json": atracoes_Animal_Kingdom_pandorao,
  "atracoes_EPCOT_world_celebration.json": atracoes_EPCOT_world_celebration,
  "atracoes_EPCOT_world_discovery.json": atracoes_EPCOT_world_discovery,
  "atracoes_EPCOT_world_nature.json": atracoes_EPCOT_world_nature,
  "atracoes_EPCOT_world_showcase.json": atracoes_EPCOT_world_showcase,
  "atracoes_HS_animation_courtyard.json": atracoes_HS_animation_courtyard,
  "atracoes_HS_echo_lake.json": atracoes_HS_echo_lake,
  "atracoes_HS_galaxys_edge.json": atracoes_HS_galaxys_edge,
  "atracoes_HS_hollywood_boulevard.json": atracoes_HS_hollywood_boulevard,
  "atracoes_HS_sunset_boulevard.json": atracoes_HS_sunset_boulevard,
  "atracoes_HS_toy_story_land.json": atracoes_HS_toy_story_land,
  "atracoes_Magic_Kingdom_adventureland.json": atracoes_Magic_Kingdom_adventureland,
  "atracoes_Magic_Kingdom_fantasyland.json": atracoes_Magic_Kingdom_fantasyland,
  "atracoes_Magic_Kingdom_frontierland.json": atracoes_Magic_Kingdom_frontierland,
  "atracoes_Magic_Kingdom_libertysquare.json": atracoes_Magic_Kingdom_libertysquare,
  "atracoes_Magic_Kingdom_mainstreet.json": atracoes_Magic_Kingdom_mainstreet,
  "atracoes_Magic_Kingdom_tomorrowland.json": atracoes_Magic_Kingdom_tomorrowland,
};

interface Atracao {
  nome: string;
  icone?: string;
  horario: string;
  tempoFilaAceitavel?: string;
  alturaMinima?: string;
}

type Props = {
  route: RouteProp<RootStackParamList, 'AtracoesPorArquivo'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'AtracoesPorArquivo'>;
};

export default function ListaAtracoesPorArquivoScreen({ route }: Props) {
  const { arquivo } = route.params;
  const [atracoes, setAtracoes] = useState<Atracao[]>([]);

  useEffect(() => {
    const dados = arquivosMap[arquivo];
    if (dados) setAtracoes(dados);
    else console.error("Arquivo de atrações não encontrado:", arquivo);
  }, [arquivo]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📂 {arquivo.replace('.json', '')}</Text>
      <FlatList
        data={atracoes}
        keyExtractor={(item, index) => `${item.nome}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.icone || '🎡'} {item.nome}</Text>
            <Text style={styles.linha}>🕒 Horário: {item.horario}</Text>
            {item.tempoFilaAceitavel && (
              <Text style={styles.linha}>⏳ Fila: {item.tempoFilaAceitavel}</Text>
            )}
            {item.alturaMinima && (
              <Text style={styles.linha}>📏 Altura mínima: {item.alturaMinima}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 16 },
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
