// src/screens/inicio/TelaAtracoes.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Animated, Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Constants from 'expo-constants';

import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import type { AtividadeDia } from '@/logic/types/atividade';

import CardAtracao from '@/components/card/CardAtracao';
import CardAtracaoUniversal from '@/components/card/CardAtracaoUniversal';
import { CardSecao } from '@/components/card/CardSecao';

import { getVideoUrlFromMap, searchYouTubeForAttraction } from '@/logic/media/YoutubeUtils';

// Dados
import * as disneyData from '@/logic/geradores/todasAtracoesDisney';
import * as universalData from '@/logic/geradores/todasAtracoesUniversal';

// Navegação tipada para abrir a YouTubePlayer screen
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootStack';

type AnyObj = Record<string, any>;
type AtracaoExt = AtividadeDia & {
  id: string; parque?: string; regiao?: string; area?: string; land?: string; setor?: string;
  icone?: string; imagem?: string; tipoPerfil?: string[] | string;
  alturaMinima?: number; tempoMedioFila?: number; filaAceitavel?: number; idadeRecomendada?: string;
};

function flattenModule(mod: AnyObj): AtracaoExt[] {
  const directArrays =
    (mod.atracoesDisney as AtracaoExt[]) ??
    (mod.todasAtracoesDisney as AtracaoExt[]) ??
    (mod.atracoesUniversal as AtracaoExt[]) ??
    (mod.todasAtracoesUniversal as AtracaoExt[]) ??
    (Array.isArray(mod.default) ? (mod.default as AtracaoExt[]) : undefined);

  if (Array.isArray(directArrays)) {
    return directArrays.map((a: AnyObj) => ({
      id: a.id ?? `${a.titulo ?? 'atracao'}-${Math.random().toString(36).slice(2, 7)}`,
      tipo: 'atracao',
      titulo: a.titulo ?? 'Sem título',
      descricao: a.descricao ?? '',
      subtitulo: a.subtitulo ?? a.area ?? a.regiao ?? '',
      regiao: a.regiao ?? a.area ?? a.land ?? a.setor ?? '',
      parque: a.parque,
      latitude: a.latitude ?? 0,
      longitude: a.longitude ?? 0,
      icone: a.icone,
      imagem: a.imagem,
      alturaMinima: a.alturaMinima,
      tempoMedioFila: a.tempoMedioFila,
      filaAceitavel: a.filaAceitavel,
      idadeRecomendada: a.idadeRecomendada,
      tipoPerfil: a.tipoPerfil,
    }));
  }

  const out: AtracaoExt[] = [];
  for (const [key, val] of Object.entries(mod)) {
    if (val && typeof val === 'object' && Array.isArray((val as AnyObj).atracoes)) {
      const areaName = (val as AnyObj).regiao ?? (val as AnyObj).nome ?? (val as AnyObj).area ?? key;
      const parque = (val as AnyObj).parque;
      for (const a of (val as AnyObj).atracoes as AnyObj[]) {
        out.push({
          id: a.id ?? `${a.titulo ?? 'atracao'}-${Math.random().toString(36).slice(2, 7)}`,
          tipo: 'atracao',
          titulo: a.titulo ?? 'Sem título',
          descricao: a.descricao ?? '',
          subtitulo: a.subtitulo ?? areaName,
          regiao: a.regiao ?? areaName,
          parque: a.parque ?? parque,
          latitude: a.latitude ?? 0,
          longitude: a.longitude ?? 0,
          icone: a.icone,
          imagem: a.imagem,
          alturaMinima: a.alturaMinima,
          tempoMedioFila: a.tempoMedioFila,
          filaAceitavel: a.filaAceitavel,
          idadeRecomendada: a.idadeRecomendada,
          tipoPerfil: a.tipoPerfil,
        });
      }
    }
  }
  return out;
}

const AREA_TODAS = '__TODAS__';

// Título animado da área
const AreaTitle: React.FC<{ text: string }> = ({ text }) => {
  const anim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 0.85, duration: 800, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [anim]);
  return <Animated.Text style={[styles.areaTitle, { opacity: anim }]} numberOfLines={2}>✨ {text.toUpperCase()} ✨</Animated.Text>;
};

// Ícone piscando (YouTube)
const BlinkingIcon: React.FC<{ name: any; size?: number; style?: any }> = ({ name, size = 30, style }) => {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 100, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 100, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);
  return (
    <Animated.View style={[{ opacity }, style]}>
      <Ionicons name={name} size={size} color="#FF0000" />
    </Animated.View>
  );
};

type Step = 'rede' | 'parque' | 'area' | 'lista';

export default function TelaAtracoes() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { markVisited } = useParkisheiro?.() || {};

  const [clima, setClima] = useState<any>(null);
  const [avisoAceito, setAvisoAceito] = useState(true); // já aceito
  const [step, setStep] = useState<Step>('rede');       // começa em "selecione o complexo"

  const [rede, setRede] = useState<'disney' | 'universal' | ''>('');
  const [parque, setParque] = useState<string>('');
  const [area, setArea] = useState<string>('');

  const [videoById, setVideoById] = useState<Record<string, string>>({});
  const YT_API_KEY = (Constants?.expoConfig?.extra as any)?.YT_API_KEY || '';

  // clima para cabeçalho
  useEffect(() => { buscarClima('Orlando').then(setClima).catch(() => setClima(null)); }, []);
  useEffect(() => { markVisited?.('TelaAtracoes'); }, []);

  // ⚠️ Sem auto-pular: sempre reseta pro passo "rede" ao abrir
  useEffect(() => {
    setRede('');
    setParque('');
    setArea('');
    setStep('rede');
  }, [route.params]);

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  const climaHeader = useMemo(() => {
    if (clima && typeof clima.temp === 'number' && !Number.isNaN(clima.temp)) {
      return {
        tempC: Math.round(clima.temp),
        condition: clima.condicao ?? '',
        iconUrl: clima.icone ?? undefined,
      };
    }
    return null;
  }, [clima]);

  const listaDisney = useMemo(() => flattenModule(disneyData), []);
  const listaUniversal = useMemo(() => flattenModule(universalData), []);

  const getParquesFromList = (lista: AtracaoExt[]) => {
    const set = new Set<string>();
    for (const a of lista) if (a.parque) set.add(String(a.parque));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  };

  const listaRede = useMemo(
    () => (rede === 'disney' ? listaDisney : rede === 'universal' ? listaUniversal : []),
    [rede, listaDisney, listaUniversal]
  );

  const parquesDisponiveis = useMemo(() => getParquesFromList(listaRede), [listaRede]);

  const areasDisponiveis = useMemo(() => {
    if (!parque) return [];
    const set = new Set<string>();
    for (const a of listaRede) {
      if (a.parque === parque) {
        const nomeArea = a.regiao ?? a.area ?? a.land ?? a.setor;
        if (nomeArea) set.add(String(nomeArea));
      }
    }
    const arr = Array.from(set).sort((a, b) => a.localeCompare(b));
    return ['Todas as áreas', ...arr];
  }, [listaRede, parque]);

  const handleSelectRede = (p: 'disney' | 'universal') => {
    setRede(p); setParque(''); setArea('');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep('parque');
  };
  const handleSelectParque = (p: string) => {
    setParque(p); setArea(AREA_TODAS);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep('area');
  };
  const handleSelectArea = (a: string) => {
    setArea(a);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep('lista');
  };

  const grupos = useMemo(() => {
    if (!parque) return [] as { area: string; atracoes: AtracaoExt[] }[];

    if (area === AREA_TODAS) {
      const map = new Map<string, AtracaoExt[]>();
      for (const a of listaRede) {
        if (a.parque !== parque) continue;
        const key = a.regiao ?? a.area ?? a.land ?? a.setor ?? 'Outros';
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(a);
      }
      return Array.from(map.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([ar, atr]) => ({ area: ar, atracoes: atr }));
    }

    const atracoes = listaRede.filter(
      (a) => a.parque === parque && (a.regiao === area || a.area === area || a.land === area || a.setor === area)
    );
    return [{ area, atracoes }];
  }, [listaRede, parque, area]);

  const tituloCard = parque ? parque : 'Atrações';
  const subtituloCard = area ? (area === AREA_TODAS ? '— Todas as áreas' : `— ${area}`) : '';
  const tipoCard: 'disney' | 'universal' | 'area' = rede === 'disney' ? 'disney' : rede === 'universal' ? 'universal' : 'area';

  const extractYouTubeId = (input?: string | null): string | null => {
    if (!input) return null;
    const m = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  };
  const toWatchUrl = (maybeEmbedOrWatch: string): string => {
    const id = extractYouTubeId(maybeEmbedOrWatch);
    return id ? `https://www.youtube.com/watch?v=${id}` : maybeEmbedOrWatch;
  };

  const handleOpenVideo = async (a: AtracaoExt) => {
    let watch = videoById[a.id];

    if (!watch) {
      const mapped = getVideoUrlFromMap({ id: a.id, titulo: a.titulo, parque: a.parque, regiao: a.regiao });
      if (mapped) watch = toWatchUrl(mapped);
    }

    if (!watch && YT_API_KEY) {
      try {
        const found = await searchYouTubeForAttraction(
          { id: a.id, titulo: a.titulo, parque: a.parque, regiao: a.regiao },
          YT_API_KEY
        );
        if (found) watch = toWatchUrl(found);
      } catch {}
    }

    if (!watch) {
      Alert.alert('Vídeo indisponível', 'Ainda não temos um vídeo para esta atração.');
      return;
    }

    setVideoById(prev => ({ ...prev, [a.id]: watch }));
    navigation.navigate('YouTubePlayer', { idOrUrl: watch });
  };

  const renderTopStep = () => {
    if (!avisoAceito) {
      return (
        <View style={styles.wrapSeletor}>
          <TouchableOpacity
            activeOpacity={0.95}
            style={[styles.btnSeletorBranco, { justifyContent: 'space-between' }]}
            onPress={() => setAvisoAceito(true)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="information-circle-outline" size={18} color="#004b87" />
              <Text numberOfLines={1} style={[styles.btnSeletorTxt, { color: '#004b87' }]}>
                Guia não oficial — toque para continuar
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#004b87" />
          </TouchableOpacity>

          <View style={[styles.avisoBox, { marginTop: 6 }]}>
            <Text style={styles.avisoTitulo}>
              Este app é um <Text style={{ fontWeight: '900' }}>guia não oficial</Text>.
            </Text>
            <Text style={styles.avisoTexto}>
              Marcas e nomes podem pertencer à Disney Enterprises, Inc., Universal City Studios LLC e demais detentores.
            </Text>
            <Text style={styles.avisoTexto}>Consulte canais oficiais para horários, filas e políticas.</Text>
          </View>
        </View>
      );
    }

    if (step === 'rede') {
      return (
        <View style={styles.wrapSeletor}>
          <View style={[styles.btnSeletorBranco, { justifyContent: 'space-between' }]}>
            <Text numberOfLines={1} style={[styles.btnSeletorTxt, { color: '#004b87' }]}>
              Selecione o Complexo (Disney/Universal)
            </Text>
            <Ionicons name="chevron-down" size={18} color="#004b87" />
          </View>

          <View style={styles.listaContainer}>
            {(['disney', 'universal'] as const).map((p) => (
              <TouchableOpacity key={p} activeOpacity={0.9} style={styles.linhaItem} onPress={() => handleSelectRede(p)}>
                <Text style={styles.textoItem}>{p === 'disney' ? 'Complexo Disney' : 'Complexo Universal'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    if (step === 'parque') {
      return (
        <View style={styles.wrapSeletor}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.btnSeletorBranco, { justifyContent: 'space-between' }]}
            onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setStep('rede'); }}
          >
            <Text numberOfLines={1} style={[styles.btnSeletorTxt, { color: '#004b87' }]}>
              Selecione o Parque — {rede === 'disney' ? 'Complexo Disney' : 'Complexo Universal'}
            </Text>
            <Ionicons name="chevron-up" size={18} color="#004b87" />
          </TouchableOpacity>

          <View style={styles.listaContainer}>
            {parquesDisponiveis.map((p) => (
              <TouchableOpacity key={p} activeOpacity={0.9} style={styles.linhaItem} onPress={() => handleSelectParque(p)}>
                <Text style={styles.textoItem}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    if (step === 'area') {
      return (
        <View style={styles.wrapSeletor}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.btnSeletorBranco, { justifyContent: 'space-between' }]}
            onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setStep('parque'); }}
          >
            <Text numberOfLines={1} style={[styles.btnSeletorTxt, { color: '#004b87' }]}>
              Selecione a Área — {parque}
            </Text>
            <Ionicons name="chevron-up" size={18} color="#004b87" />
          </TouchableOpacity>

          <View style={styles.listaContainer}>
            {areasDisponiveis.map((a) => (
              <TouchableOpacity key={a} activeOpacity={0.9} style={styles.linhaItem}
                onPress={() => handleSelectArea(a === 'Todas as áreas' ? AREA_TODAS : a)}>
                <Text style={styles.textoItem}>{a}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.wrapSeletor, { marginBottom: 2 }]}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.btnSeletorBranco, { justifyContent: 'space-between' }]}
          onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setStep('area'); }}
        >
          <Text numberOfLines={1} style={[styles.btnSeletorTxt, { color: '#004b87' }]}>
            {area === AREA_TODAS ? 'Todas as áreas' : `${area} (Área)`} — {parque}
          </Text>
          <Ionicons name="chevron-up" size={18} color="#004b87" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#0077cc', '#00bfff', '#add8e6', '#ffffff', '#ffffff']}
      locations={[0, 0.25, 0.5, 0.78, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      {/* Cabeçalho SEMPRE visível */}
      <View style={{ marginTop: 40 }}>
        <CabecalhoDia
          titulo=""
          data={dataFormatada}
          diaSemana={diaSemana}
          clima={climaHeader}
        />
      </View>

      {renderTopStep()}

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator>
        {step === 'lista' && parque && !!grupos.length && (
          <View style={{ width: '96%', alignSelf: 'center' }}>
            <CardSecao titulo={tituloCard} subtitulo={subtituloCard} tipo={tipoCard}>
              {grupos.map(({ area: nomeArea, atracoes }) => (
                <View key={nomeArea} style={styles.areaBloco}>
                  <AreaTitle text={nomeArea} />
                  {atracoes.map((a) => {
                    const injected = { ...a };
                    return (
                      <View key={a.id} style={{ marginBottom: 0, position: 'relative' }}>
                        <TouchableOpacity
                          onPress={() => handleOpenVideo(a)}
                          activeOpacity={0.85}
                          style={styles.videoIconTouch}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <BlinkingIcon name="logo-youtube" />
                        </TouchableOpacity>

                        {rede === 'disney'
                          ? <CardAtracao atracao={injected} />
                          : <CardAtracaoUniversal atracao={injected} />
                        }
                      </View>
                    );
                  })}
                </View>
              ))}
            </CardSecao>
          </View>
        )}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Rodapé SEMPRE visível */}
      <View style={styles.rodapeFundo} />
      <View style={styles.rodapeConteudo}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MenuPrincipal')}
          style={styles.botaoSeta}
          activeOpacity={0.9}
        >
          <Ionicons name="arrow-back-circle" size={40} color="#0077cc" />
        </TouchableOpacity>

        <Animated.View style={[styles.avisoLegalCard, { opacity: 1 }]}>
          <Text style={styles.avisoLegalTexto}>
            Guia independente e não oficial, sem vínculo com Disney ou Universal. Vídeos incorporados do YouTube, exibidos apenas para visualização.
          </Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Seletores
  wrapSeletor: { width: '90%', alignSelf: 'center', marginTop: 8, marginBottom: 6 },
  btnSeletorBranco: {
    backgroundColor: '#fff', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12,
    flexDirection: 'row', alignItems: 'center', shadowColor: '#00FFFF', shadowOpacity: 0.25, shadowRadius: 6, elevation: 2,
  },
  btnSeletorTxt: { fontSize: 12, fontWeight: 'bold', flexShrink: 1, textAlign: 'left' },
  listaContainer: { width: '100%', marginTop: 6, backgroundColor: 'transparent' },
  linhaItem: { paddingVertical: 8, paddingHorizontal: 10, width: '100%', backgroundColor: 'transparent' },
  textoItem: { color: '#FFFFFF', fontSize: 11, textAlign: 'left' },

  avisoBox: { width: '100%', backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 10, padding: 12 },
  avisoTitulo: { color: '#FFFFFF', fontSize: 12, fontWeight: '800', marginBottom: 6 },
  avisoTexto: { color: '#FFFFFF', fontSize: 11, lineHeight: 15, marginBottom: 4 },

  scrollArea: { flex: 1 },
  scrollContainer: { padding: 10, paddingBottom: 10, alignItems: 'center' },

  areaBloco: { marginTop: 0, marginBottom: 0 },

  areaTitle: {
    fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'left', width: '100%',
    textShadowColor: '#00BFFF', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 16, marginBottom: 4,
  },

  // Ícone do YouTube — sem fundo escuro
  videoIconTouch: {
    position: 'absolute',
    right: 5,
    top: 5,
    padding: 0,
    backgroundColor: 'transparent',
    borderRadius: 0,
    zIndex: 5,
  },

  // Rodapé
  avisoLegalCard: {
    flex: 1,
    backgroundColor: '#004b87',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  avisoLegalTexto: {
    fontSize: 9,
    color: '#FFFFFF',
    lineHeight: 13,
    textAlign: 'justify',
  },
  rodapeFundo: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 130,
    backgroundColor: '#ffffffff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
  },
  rodapeConteudo: {
    position: 'absolute', bottom: 50, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20,
  },
  botaoSeta: { justifyContent: 'center', alignItems: 'center' },
});
