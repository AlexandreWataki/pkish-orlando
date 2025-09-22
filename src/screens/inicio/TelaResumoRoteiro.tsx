﻿import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { gerarDiaChegada } from '@/logic/geradores/gerarDiaChegada';
import { DiaFinal } from '@/logic/types/DiaFinal';

function detectarTurno(horario: string): 'manha' | 'tarde' | 'noite' | 'madrugada' {
  const hora = parseInt(horario.split(':')[0], 10);
  if (hora >= 0 && hora < 6) return 'madrugada';
  if (hora < 12) return 'manha';
  if (hora < 18) return 'tarde';
  return 'noite';
}

export default function TelaResumoRoteiro() {
  const navigation = useNavigation<any>();
  const { parkisheiroAtual, atualizarParkisheiro } = useParkisheiro();

  const roteiro: DiaFinal[] = [...(parkisheiroAtual.roteiroFinal || [])].sort(
    (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
  );

  const formatarData = (data: Date | string | undefined) => {
    if (!data) return 'Data nÃ£o definida';
    return format(new Date(data), "EEEE, dd 'de' MMMM", { locale: ptBR });
  };

  const traduzirTipo = (tipo: string) => {
    switch (tipo) {
      case 'chegada': return 'ðŸ›¬ Chegada';
      case 'saida': return 'ðŸ›« SaÃ­da';
      case 'disney': return 'ðŸŽ¢ Parque Disney';
      case 'universal': return 'ðŸŽ¡ Parque Universal';
      case 'compras': return 'ðŸ›ï¸ Compras';
      case 'descanso': return 'ðŸ˜´ Descanso';
      default: return tipo;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Resumo do Roteiro</Text>
      {roteiro.map((dia, index) => {
        if (!dia) return null;

        const turno = detectarTurno(dia?.horarioVoo ?? '23:00');

        return (
          <View key={index} style={styles.card}>
            <Text style={styles.data}>{formatarData(dia.data)}</Text>
            <Text style={styles.tipo}>{traduzirTipo(dia.tipo)}</Text>

            {dia.tipo === 'chegada' && (
              <>
                {dia.horarioVoo ? (
                  <Text style={styles.horario}>â° Voo: {dia.horarioVoo} â€¢ Turno: {turno}</Text>
                ) : (
                  <View style={styles.seletorHorario}>
                    <Text style={styles.horario}>Definir horÃ¡rio do voo:</Text>
                    {[
                      { label: 'ðŸŒ™ Madrugada (00:01â€“06:00)', hora: '01:30' },
                      { label: 'â˜€ï¸ ManhÃ£ (06:01â€“12:00)', hora: '07:30' },
                      { label: 'ðŸŒ‡ Tarde (12:01â€“18:00)', hora: '13:30' },
                      { label: 'ðŸŒƒ Noite (18:01â€“00:00)', hora: '19:30' },
                    ].map(({ label, hora }) => (
                      <TouchableOpacity
                        key={hora}
                        style={styles.botaoHorario}
                        onPress={() => {
                          const roteiroAtualizado = [...(parkisheiroAtual.roteiroFinal || [])];
                          roteiroAtualizado[index].horarioVoo = hora;
                          atualizarParkisheiro(parkisheiroAtual.id, {
                            roteiroFinal: roteiroAtualizado,
                          });
                        }}
                      >
                        <Text style={styles.botaoTexto}>{`âœˆï¸ ${label}`}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </>
            )}

            {dia.tipo === 'chegada' && dia.horarioVoo && (
              <>
                {turno === 'madrugada' && (
                  <Text style={styles.aviso}>
                    ðŸŒ™ Chegada de madrugada. VÃ¡ direto ao hotel, descanse bem e nos vemos cedo para o planejamento do dia.
                  </Text>
                )}

                <TouchableOpacity
                  style={[styles.botao, turno === 'madrugada' && { backgroundColor: '#aaa' }]}
                  onPress={() => {
                    if (dia.tipo === 'chegada') {
                      const turnoDetectado = detectarTurno(dia.horarioVoo || '23:00');
                      const dataFormatada = new Date(dia.data).toISOString().split('T')[0];
                      const diaGerado = gerarDiaChegada(index + 1, dataFormatada, turnoDetectado);
                      const dataObj = new Date(dataFormatada);

                      const roteiroAtualizado = [...(parkisheiroAtual.roteiroFinal || [])];
                      const idx = roteiroAtualizado.findIndex((d) => d.id === dia.id);
                      roteiroAtualizado[idx] = { ...dia, ...diaGerado, data: dataObj };

                      atualizarParkisheiro(parkisheiroAtual.id, {
                        roteiroFinal: roteiroAtualizado,
                      });

                      navigation.navigate('DiaDetalheScreen', {
                        diaId: dia.id,
                        tipo: dia.tipo,
                        nomeParque: dia.nomeParque,
                      });
                    }
                  }}
                >
                  <Text style={styles.botaoTexto}>Gerar Dia</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#003366',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  data: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipo: {
    fontSize: 15,
    marginBottom: 4,
  },
  horario: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  aviso: {
    fontSize: 13,
    color: '#994400',
    marginTop: 6,
    fontStyle: 'italic',
  },
  seletorHorario: {
    marginTop: 6,
  },
  botaoHorario: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 4,
  },
  botao: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

