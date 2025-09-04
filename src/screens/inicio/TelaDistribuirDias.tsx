// src/screens/inicio/TelaDistribuirDias.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { Ionicons } from '@expo/vector-icons';
import { addDays } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import SelectBox from '@/components/card/SelectBox';
import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AvisoLegal from '@/components/card/AvisoLegal';

// 🔒 Listas SEM "(guia)"
const parquesDisney = [
  'Magic Kingdom',
  'Epcot',
  "Disney's Hollywood Studios",
  "Disney's Animal Kingdom",
];

const parquesUniversal = [
  'Universal Studios Florida',
  'Islands of Adventure',
  'Epic Universe',
];

const comprasOpcoes = ['Dia de Compras'];
const descansoOpcoes = ['Dia de Descanso'];

// 👇 Rótulos humanos para selects
const LABELS_TIPO: Record<string, string> = {
  disney: 'Parques Disney',
  universal: 'Parques Universal',
  compras: 'Dia de Compras',
  descanso: 'Dia de Descanso',
};

// 👇 Rótulos painel lateral
const LABELS_TIPO_PAINEL: Record<string, [string, string?]> = {
  chegada:  ['chegada'],
  saida:    ['saída'],
  descanso: ['Dia de', 'Descanso'],
  compras:  ['Dia de', 'Compras'],
  disney:   ['Parques Disney'],
  universal:['Parques Universal'],
};

function formatarData(data: Date) {
  const diasSemana = [
    'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira',
    'Quinta-Feira', 'Sexta-Feira', 'Sábado'
  ];
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear();
  const diaSemana = diasSemana[data.getDay()];
  return `${dia}/${mes}/${ano} ${diaSemana}`;
}

export default function TelaDistribuirDias() {
  const navigation = useNavigation<any>();
  const {
    parkisheiroAtual,
    setTipoManualDoDia,
    gerarRoteiroFinal,
    markVisited,
  } = useParkisheiro();

  const [clima, setClima] = useState<any>(null);
  useEffect(() => { buscarClima('28.5383,-81.3792').then(setClima); }, []);
  useEffect(() => { markVisited('TelaDistribuirDias'); }, []);

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  const dataInicio = parkisheiroAtual.dataInicio
    ? new Date(
        parkisheiroAtual.dataInicio.getFullYear(),
        parkisheiroAtual.dataInicio.getMonth(),
        parkisheiroAtual.dataInicio.getDate()
      )
    : new Date();

  const esperado: Record<string, number> = parkisheiroAtual.diasDistribuidos || {};

  const [dias, setDias] = useState(() => {
    const estrutura: { tipo: string; nomeParque?: string; completo: boolean }[] = [];
    const distribuicao: Record<string, number> = esperado;

    if (distribuicao.chegada) {
      for (let i = 0; i < distribuicao.chegada; i++) {
        estrutura.push({ tipo: 'Chegada de Avião', completo: true });
      }
    }
    ['disney', 'universal', 'compras', 'descanso'].forEach(tipo => {
      if (distribuicao[tipo]) {
        for (let i = 0; i < distribuicao[tipo]; i++) {
          estrutura.push({
            tipo: '',
            nomeParque: tipo === 'disney' || tipo === 'universal' ? '' : undefined,
            completo: false,
          });
        }
      }
    });
    if (distribuicao.saida) {
      for (let i = 0; i < distribuicao.saida; i++) {
        estrutura.push({ tipo: 'Saída de Avião', completo: true });
      }
    }
    return estrutura;
  });

  const [expandParque, setExpandParque] = useState<boolean[]>([]);
  useEffect(() => { setExpandParque(dias.map(() => true)); }, [dias.length]);

  const setDia = (index: number, novo: any) => {
    const atualizados = [...dias];
    atualizados[index] = novo;
    setDias(atualizados);
    setTipoManualDoDia(index, novo);
  };

  const reabrirEdicao = (index: number) => {
    const atual = { ...dias[index] };
    if (atual.tipo === 'chegada' || atual.tipo === 'saida' || atual.tipo === 'Chegada de Avião' || atual.tipo === 'Saída de Avião') return;
    const novo = { ...atual, completo: false };
    if (atual.tipo === 'disney' || atual.tipo === 'universal') novo.nomeParque = '';
    setDia(index, novo);
    const nova = [...expandParque];
    nova[index] = true;
    setExpandParque(nova);
  };

  const contagemUsados: Record<string, { total: number; completos: number }> = useMemo(() => {
    const conta: Record<string, { total: number; completos: number }> = {};
    dias.forEach((d) => {
      const tipo = d.tipo;
      if (!tipo) return;
      if (!conta[tipo]) conta[tipo] = { total: 0, completos: 0 };
      conta[tipo].total += 1;
      if (d.completo) conta[tipo].completos += 1;
    });
    return conta;
  }, [dias]);

  const completosChegada = useMemo(
    () => dias.filter(d => d.tipo === 'Chegada de Avião').length,
    [dias]
  );
  const completosSaida = useMemo(
    () => dias.filter(d => d.tipo === 'Saída de Avião').length,
    [dias]
  );

  const getCompletos = (tipo: string) => {
    if (tipo === 'chegada') return completosChegada;
    if (tipo === 'saida') return completosSaida;
    return contagemUsados[tipo]?.completos || 0;
  };

  const podeAvancar = useMemo(() => {
    return dias.every(d => {
      if (!d.tipo) return false;
      if ((d.tipo === 'disney' || d.tipo === 'universal') && !d.nomeParque) return false;
      if ((d.tipo === 'compras' || d.tipo === 'descanso') && !d.completo) return false;
      return true;
    });
  }, [dias]);

  const avancar = () => { gerarRoteiroFinal(); navigation.navigate('Aeroporto&Hotel'); };
  const voltar = () => { navigation.goBack(); };

  const tiposDisponiveis = useMemo(() => {
    return Object.keys(esperado)
      .filter(t => t !== 'chegada' && t !== 'saida')
      .filter(tipo => getCompletos(tipo) < (esperado[tipo] || 0));
  }, [esperado, contagemUsados, completosChegada, completosSaida]);

  // 🔹 ordem fixa do painel + filtragem dos que realmente aparecem
  const ordemPainel = ['chegada', 'descanso', 'disney', 'universal', 'compras', 'saida'] as const;
  const tiposExibidosPainel = useMemo(
    () => ordemPainel.filter(t => (esperado[t] || 0) > 0),
    [esperado]
  );
  const ultimoTipoDoPainel = tiposExibidosPainel[tiposExibidosPainel.length - 1]; // pode ser undefined se nada exibido

  return (
    <LinearGradient
      colors={['#0077cc', '#00bfff', '#52D6FF', '#52D6FF']}
      locations={[0, 0.6, 0.9, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={{ marginTop: 40 }}>
        <CabecalhoDia
          titulo=""
          data={dataFormatada}
          diaSemana={diaSemana}
          clima={clima?.condicao || 'Parcialmente nublado'}
          temperatura={clima ? `${clima.temp}°C` : '28°C'}
          iconeClima={clima?.icone}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {dias.map((dia, index) => {
          const data = addDays(dataInicio, index);
          const tipoDia = dia.tipo;
          const isDisney = tipoDia === 'disney';
          const isUniversal = tipoDia === 'universal';
          const isCompras = tipoDia === 'compras';
          const isDescanso = tipoDia === 'descanso';

          const parques = isDisney ? parquesDisney
            : isUniversal ? parquesUniversal
            : isCompras ? comprasOpcoes
            : isDescanso ? descansoOpcoes
            : [];

          return (
            <View
              key={index}
              style={[
                styles.card,
                index === 0
                  ? { marginTop: 0, alignSelf: 'flex-start', marginLeft: 16 }
                  : { width: '67%', alignSelf: 'flex-start', marginTop: 10, marginLeft: 16 }
              ]}
            >
              <Text style={styles.data}>{formatarData(data)}</Text>

              {dia.completo ? (
                <TouchableOpacity
                  onPress={() => reabrirEdicao(index)}
                  disabled={dia.tipo === 'chegada' || dia.tipo === 'saida' || dia.tipo === 'Chegada de Avião' || dia.tipo === 'Saída de Avião'}
                  style={[styles.botaoSelecionado, { backgroundColor: '#004b87' }]}
                >
                  <Text style={styles.textoSelecionado}>
                    {dia.nomeParque || LABELS_TIPO[tipoDia] || tipoDia || 'Selecionado'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  <SelectBox
                    label="Tipo do Dia"
                    value={tipoDia || ''}
                    options={tiposDisponiveis.map(t => ({
                      label: LABELS_TIPO[t] ?? t,
                      value: t,
                    }))}
                    onChange={(tipo) => {
                      const novo = { tipo, nomeParque: '', completo: false };
                      setDia(index, novo);
                      const nova = [...expandParque];
                      nova[index] = true;
                      setExpandParque(nova);
                    }}
                  />

                  {expandParque[index] && parques.length > 0 && (
                    <SelectBox
                      label="Escolha"
                      value={dia.nomeParque || ''}
                      options={parques.map(p => ({ label: p, value: p }))}
                      onChange={(opcao) => {
                        const novo = { ...dia, nomeParque: opcao, completo: true };
                        setDia(index, novo);
                        const nova = [...expandParque];
                        nova[index] = false;
                        setExpandParque(nova);
                      }}
                    />
                  )}
                </>
              )}

              {/* FAB de aviso somente para Disney/Universal */}
              {(isDisney || isUniversal) && (
                <View style={[styles.fab, { marginTop: 8 }]}>
                  <Ionicons name="information-circle" size={16} color="#fff" />
                  <Text style={styles.fabText}>(guia não oficial)</Text>
                </View>
              )}
            </View>
          );
        })}

        {podeAvancar && (
          <View style={[styles.card, styles.cardAviso]}>
            <AvisoLegal theme="blue" compact incluirGuiaNaoOficial={false}>
              App independente sem vínculo Disney/Universal.
            </AvisoLegal>
          </View>
        )}
      </ScrollView>

      {/* Painel lateral com TICK no último item exibido quando tudo completo */}
      <View style={styles.painelLateral}>
        {tiposExibidosPainel.map((tipo) => {
          const total = esperado[tipo] || 0;
          const completos = getCompletos(tipo);

          let cor = 'rgba(0,75,135,0.3)';
          if (completos === total) cor = '#003366';
          else if (completos > 0) cor = '#FFD700';

          const [l1, l2] = LABELS_TIPO_PAINEL[tipo] ?? [LABELS_TIPO[tipo] ?? tipo];
          const isLong = tipo === 'disney' || tipo === 'universal';

          const isUltimo = tipo === ultimoTipoDoPainel;
          const mostrarTick = podeAvancar && isUltimo; // ✅ tick apenas no último e só quando tudo concluído

          return (
            <View key={tipo} style={[styles.itemPainel, { backgroundColor: cor }]}>
              {/* ✅ TICK igual ao do roteiro lá em cima */}
              {mostrarTick && (
                <Ionicons name="checkmark" size={18} color="#fff" style={styles.itemTick} />
              )}
              <Text style={[styles.itemTexto, isLong && styles.itemTextoSmall]}>{l1}</Text>
              {!!l2 && <Text style={[styles.itemTexto, isLong && styles.itemTextoSmall]}>{l2}</Text>}
              <Text style={styles.itemTextoCont}>{completos}/{total}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.rodapeFundo} />
      <View style={styles.rodapeConteudo}>
        <TouchableOpacity onPress={voltar} style={styles.botaoSeta}>
          <Ionicons name="arrow-back-circle" size={48} color="#004b87" />
        </TouchableOpacity>
        <TouchableOpacity onPress={avancar} style={styles.botaoSeta} disabled={!podeAvancar}>
          <Ionicons
            name="arrow-forward-circle"
            size={48}
            color={podeAvancar ? "#004b87" : "rgba(0,75,135,0.3)"}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 140,
    alignItems: 'flex-start',
    minHeight: '100%',
    width: '100%',
  },
  card: {
    width: '92%',
    alignSelf: 'center',
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
  },
  cardAviso: {
    width: '72%',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 8,
    backgroundColor: 'transparent',
    padding: 0,
  },
  data: { fontWeight: 'bold', fontSize: 12, color: '#003366', marginBottom: 6 },
  botaoSelecionado: { padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  textoSelecionado: { color: '#ffffff', fontSize: 12, fontWeight: '600' },

  painelLateral: {
    position: 'absolute',
    top: '40.5%',
    transform: [{ translateY: -100 }],
    right: 10,
    alignItems: 'flex-end',
    gap: 10,
    zIndex: 50,
  },
  itemPainel: {
    width: 84,
    height: 70,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  // ✅ checkmark posicionado no canto superior direito do bloco
  itemTick: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  itemTexto: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 12,
    flexWrap: 'wrap',
  },
  itemTextoSmall: { fontSize: 9, lineHeight: 11 },
  itemTextoCont: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
    marginTop: 2,
  },

  fab: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#004b87',
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fabText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  rodapeFundo: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 100, backgroundColor: '#52D6FF',
    borderBottomLeftRadius: 10, borderBottomRightRadius: 10
  },
  rodapeConteudo: {
    position: 'absolute', bottom: 50, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20
  },
  botaoSeta: { justifyContent: 'center', alignItems: 'center' },
});
