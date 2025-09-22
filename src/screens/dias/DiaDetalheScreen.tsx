ï»¿// src/screens/dias/DiaDetalheScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima, DadosClimaSimplificado } from '@/logic/clima/buscarclima';

import { DiaChegada } from './DiaChegada';
import { DiaCompras } from './DiaCompras';
import { DiaDescanso } from './DiaDescanso';
import { DiaParqueDisney } from './DiaParqueDisney';
import { DiaParqueUniversal } from './DiaParqueUniversal';
import { DiaSaida } from './DiaSaida';
import LogoAtencao from '@/components/card/LogoAtencao';

const DiaDetalheScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<
    RouteProp<{ DiaDetalheScreen: { diaId: string } }, 'DiaDetalheScreen'>
  >();
  const { diaId: initialDiaId } = route.params;
  const { parkisheiroAtual, gerarRoteiroFinal } = useParkisheiro();

  const roteiro = parkisheiroAtual?.roteiroFinal || [];

  const [selectedDiaId, setSelectedDiaId] = useState<string>(initialDiaId);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [clima, setClima] = useState<DadosClimaSimplificado | null>(null);

  const diaBruto = roteiro.find((d) => d.id === selectedDiaId) || null;

  const formatarData = (d?: string | number | Date) =>
    d ? format(new Date(d), 'dd/MM/yyyy') : '';

  // Buscar clima do DIA SELECIONADO
  useEffect(() => {
    (async () => {
      try {
        const dados: any = await buscarClima('Orlando');
        const alvoISO = diaBruto?.data ? new Date(diaBruto.data).toISOString().slice(0, 10) : null;

        let escolhido: any = null;
        const lista = (dados && (dados.previsao || dados.forecast || [])) as any[];

        if (alvoISO && Array.isArray(lista) && lista.length) {
          escolhido =
            lista.find((d) => {
              const iso =
                (d.dataISO || d.data || d.date || '').toString().slice(0, 10);
              return iso === alvoISO;
            }) || null;
        }

        const base = escolhido || dados;

        const normalizado: DadosClimaSimplificado = {
          condicao:
            base?.condicao ||
            base?.condition ||
            base?.descricao ||
            base?.summary ||
            '',
          temp:
            typeof base?.temp === 'number'
              ? base.temp
              : typeof base?.temperature === 'number'
              ? base.temperature
              : typeof base?.max === 'number'
              ? base.max
              : undefined,
          icone: base?.icone || base?.icon || undefined,
        };

        setClima(normalizado);
      } catch {
        setClima(null);
      }
    })();
  }, [selectedDiaId, diaBruto?.data]);

  const toggleList = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsListOpen((prev) => !prev);
  };

  const nomeDoDia = diaBruto?.data
    ? format(new Date(diaBruto.data), 'EEEE', { locale: ptBR })
    : '';

  // Ã¢Å“â€¦ sem datas no texto do scroll/lista
  const getNomeDisplay = (d: any) => {
    if (!d) return '';
    if (d.tipo === 'chegada') return 'Chegada em Orlando';
    if (d.tipo === 'saida') return 'SaÃƒÂ­da de Orlando';
    if (d.tipo === 'compras') return 'Dia de Compras';
    if (d.tipo === 'descanso') return 'Dia de Descanso';
    return d.nomeParque || (d.tipo === 'disney'
      ? 'Dia de Parque Disney'
      : d.tipo === 'universal'
      ? 'Dia de Parque Universal'
      : '');
  };

  const renderDiaEspecifico = (dia: typeof diaBruto | null) => {
    if (!dia) return <Text style={styles.textoJustificado}>Dia nÃƒÂ£o encontrado.</Text>;
    switch (dia.tipo) {
      case 'chegada':   return <DiaChegada diaBruto={dia} />;
      case 'compras':   return <DiaCompras diaBruto={dia} />;
      case 'descanso':  return <DiaDescanso diaBruto={dia} />;
      case 'disney':    return <DiaParqueDisney diaBruto={dia} />;
      case 'universal': return <DiaParqueUniversal diaBruto={dia} />;
      case 'saida':     return <DiaSaida diaBruto={dia} />;
      default:          return <Text style={styles.textoJustificado}>Tipo de dia desconhecido.</Text>;
    }
  };

  if (!diaBruto) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Ã°Å¸Å¡Â« Dia nÃƒÂ£o encontrado. Verifique o roteiro.</Text>
      </View>
    );
  }

  const atualIndex = roteiro.findIndex((d) => d.id === selectedDiaId);

  const irDiaAnterior = () => {
    if (atualIndex > 0) setSelectedDiaId(roteiro[atualIndex - 1].id);
    else navigation.goBack();
  };

  const mostrarCardBranco = () => {
    Alert.alert('Ã°Å¸â€œâ€“ Roteiro salvo!', 'VocÃƒÂª pode acessar em "ÃƒÅ¡ltimo Roteiro" no menu.', [
      { text: 'OK', onPress: () => navigation.navigate('MenuPrincipal') },
    ]);
  };

  const irDiaProximo = async () => {
    if (atualIndex < roteiro.length - 1) {
      setSelectedDiaId(roteiro[atualIndex + 1].id);
    } else {
      await gerarRoteiroFinal();
      mostrarCardBranco();
    }
  };

  const dataCabecalho = formatarData(diaBruto?.data);

  return (
    <LinearGradient
      colors={['#0077cc', '#00bfff', '#52D6FF', '#52D6FF']}
      locations={[0, 0.6, 0.9, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      {/* CabeÃƒÂ§alho mantÃƒÂ©m a data */}
      <View style={styles.cabecalho}>
        <CabecalhoDia
          titulo=""
          data={dataCabecalho}
          diaSemana={nomeDoDia}
          clima={clima?.condicao || undefined}
          temperatura={clima?.temp != null ? `${clima.temp}Ã‚Â°C` : undefined}
          iconeClima={clima?.icone}
        />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.seletorContainer}>
          <TouchableOpacity onPress={toggleList} style={styles.seletorHeader}>
            <Ionicons
              name={isListOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.seletorHeaderText} numberOfLines={2}>
              {(() => {
                const d = roteiro.find((x) => x.id === selectedDiaId);
                return d ? getNomeDisplay(d) : 'Selecione um dia';
              })()}
            </Text>
          </TouchableOpacity>

          {isListOpen && (
            <View style={styles.listaContainer}>
              {roteiro.map((d) => {
                const selecionado = d.id === selectedDiaId;
                return (
                  <TouchableOpacity
                    key={d.id}
                    style={[styles.linhaDia, selecionado && styles.linhaSelecionada]}
                    onPress={() => {
                      setSelectedDiaId(d.id);
                      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                      setIsListOpen(false);
                    }}
                  >
                    <Text
                      style={[styles.textoDia, selecionado && styles.textoSelecionado]}
                      numberOfLines={1}
                    >
                      {getNomeDisplay(d)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Ã°Å¸â€Âµ SOMENTE nos dias de parque: ÃƒÂ­cone piscante + "guia nÃƒÂ£o oficial" (sem card) */}
        {(diaBruto?.tipo === 'disney' || diaBruto?.tipo === 'universal') && (
          <View style={styles.inlineAviso}>
            <LogoAtencao size={14} color="#FFFFFF" blink />
            <Text style={styles.inlineAvisoTexto}>Guia NÃƒÂ£o Oficial - App sem vÃƒÂ­nculo Disney/Universal</Text>
          </View>
        )}

        <View style={styles.cardsContainer}>{renderDiaEspecifico(diaBruto)}</View>
      </ScrollView>

      <View style={styles.rodapeFundo} />
      <View style={styles.rodapeConteudo}>
        <TouchableOpacity onPress={irDiaAnterior} style={styles.botaoSeta}>
          <Ionicons name="arrow-back-circle" size={40} color="#0077cc" />
        </TouchableOpacity>

        <TouchableOpacity onPress={irDiaProximo} style={styles.botaoSeta}>
          <Ionicons name="arrow-forward-circle" size={40} color="#0077cc" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cabecalho: {
    marginTop: 40,
    marginBottom: 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  scrollArea: { flex: 1 },
  scrollContainer: { padding: 10, paddingBottom: 140, alignItems: 'center' },
  textoJustificado: { fontSize: 10, color: '#222', textAlign: 'justify', lineHeight: 14 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  emptyText: { fontSize: 10, color: '#333', textAlign: 'center' },

  // Seletor de dia
  seletorContainer: {
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: 'transparent',
    width: '94%',
    alignSelf: 'center',
  },
  seletorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    width: '100%',
    backgroundColor: 'transparent',
  },
  seletorHeaderText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    flexShrink: 1,
    textAlign: 'left',
  },
  listaContainer: { borderTopWidth: 0, width: '100%' },
  linhaDia: { paddingVertical: 8, paddingHorizontal: 10, width: '100%', backgroundColor: 'transparent' },
  linhaSelecionada: { backgroundColor: '#fff', borderRadius: 8 },
  textoDia: { color: '#fff', fontSize: 11, textAlign: 'left' },
  textoSelecionado: { color: '#000', fontWeight: 'bold' },

  // Cards do conteÃƒÂºdo do dia
  cardPrincipal: { width: '96%', alignSelf: 'center', marginBottom: -7 },
  cardsContainer: { width: '100%', alignSelf: 'center', marginBottom: -50 },

  // Ã°Å¸â€Âµ Linha simples do aviso (sem card)
  inlineAviso: {
    alignSelf: 'center',
    width: '94%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    marginBottom: 10,
  },
  inlineAvisoTexto: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'lowercase',
  },

  // RodapÃƒÂ©
  rodapeFundo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#52D6FF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  rodapeConteudo: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  botaoSeta: { justifyContent: 'center', alignItems: 'center' },
});

export default DiaDetalheScreen;
