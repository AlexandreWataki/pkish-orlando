// src/IA/IAventureSeScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator, Alert, Platform, Image, StatusBar, Animated
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { format, parse, differenceInCalendarDays, addYears, isAfter, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { gerarRoteiroIAFromPrompt, type DiaGerado } from '@/IA/gerarComIA';
import { getApiKey } from '@/logic/keys/openaiKey';
import { SECOES_IA, CHIP_OPCOES, type ItemConfig, buildPromptFromForm } from '@/IA/iaPerguntas';
import type { RootNavigationProp } from '@/logic/types/navigation';

const AZUL_NEON = '#00FFFF';
const AZUL_ESCURO = '#001F3F';
const LOGO = require('@/assets/imagens/logo4.png');
const DRAFT_KEY = 'IAventureSe:draft:v2';

// ---------- PROMPTS POR TIPO DE DIA (opcional, com fallback seguro) ----------
let PROMPTS_WORD: Record<string, string> = {};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PROMPTS_WORD = require('@/IA/prompts')?.PROMPTS_WORD ?? {};
} catch {
  PROMPTS_WORD = {}; // se o módulo não existir ainda, seguimos sem travar
}

// ---------- DEMO ----------
const DEMO: DiaGerado[] = [
  {
    data: '2025-10-05',
    parque: 'Parque Disney - Magic Kingdom',
    turnos: [
      { turno: 'Manhã', atividades: ['08:30 • Rope Drop no castelo', '09:15 • Seven Dwarfs Mine Train'] },
      { turno: 'Tarde', atividades: ['13:00 • Almoço no Pecos Bill', '14:20 • Pirates of the Caribbean'] },
      { turno: 'Noite', atividades: ['19:30 • Fireworks no Hub', '21:00 • Tron Lightcycle Run (fila)'] },
    ],
    observacoes: 'Use Lightning Lane onde possível.',
  },
  {
    data: '2025-10-06',
    parque: 'Parque Universal - Islands of Adventure',
    turnos: [
      { turno: 'Manhã', atividades: ['09:00 • Hagrid’s Magical Creatures', '10:30 • VelociCoaster'] },
      { turno: 'Tarde', atividades: ['13:30 • The Amazing Spider-Man', '15:00 • Hogwarts Express'] },
      { turno: 'Noite', atividades: ['18:30 • Mythos (jantar)', '20:00 • Passeio em Hogsmeade'] },
    ],
  },
];

// ✅ helper local para evitar crash se não houver import
function validarRoteiroDias(dias: DiaGerado[]): DiaGerado[] {
  return dias
    .filter(d => d && typeof d === 'object')
    .map(d => ({
      data: d.data || '',
      parque: d.parque || '',
      turnos: Array.isArray(d.turnos) ? d.turnos : [],
      observacoes: d.observacoes,
    }))
    .filter(d => d.parque && d.turnos);
}

// ---------- HELPERS DE PROMPTS/DISTRIBUIÇÃO ----------
function montarFilaSlots(opts: {
  total: number;
  nChegada: number; nSaida: number;
  nDisney: number; nUniversal: number;
  nDescanso: number; nCompras: number;
  selDisney: string[];
  selUniversal: string[];
}) {
  const fila: string[] = [];
  const pushMany = (label: string, n: number) => { for (let i = 0; i < n; i++) fila.push(label); };

  // 1) Chegada
  pushMany('CHEGADA', opts.nChegada);

  // 2) Parques (intercalando Disney/Universal conforme seleções)
  let dLeft = opts.nDisney;
  let uLeft = opts.nUniversal;
  const disneyCycle = (opts.selDisney.length ? opts.selDisney : ['MK', 'AK', 'HS', 'EPCOT']).slice();
  const uniCycle    = (opts.selUniversal.length ? opts.selUniversal : ['UNIVERSAL', 'ISLANDS', 'EPIC']).slice();
  let dIdx = 0, uIdx = 0;
  while (dLeft > 0 || uLeft > 0) {
    if (dLeft > 0) { fila.push(disneyCycle[dIdx % disneyCycle.length]); dIdx++; dLeft--; }
    if (uLeft > 0) { fila.push(uniCycle[uIdx % uniCycle.length]);       uIdx++; uLeft--; }
  }

  // 3) Dias leves
  pushMany('DESCANSO', opts.nDescanso);
  pushMany('COMPRAS', opts.nCompras);

  // 4) Saída
  pushMany('SAIDA', opts.nSaida);

  // 5) Ajuste de comprimento
  while (fila.length < opts.total) fila.push('DESCANSO');
  return fila.slice(0, opts.total);
}

function anexarPromptsPorDia(promptBase: string, slots: string[]) {
  if (!slots.length) return promptBase;

  const linhas: string[] = [];
  linhas.push('');
  linhas.push('### PROMPTS_BASEADOS_EM_TIPO_DE_DIA');
  linhas.push('> A seguir há um bloco por DIA/“slot”. Siga-os como guia forte de estilo e conteúdo.\n');

  slots.forEach((key, i) => {
    const txt = PROMPTS_WORD[key] || '';
    if (!txt) return; // se não tiver prompt específico, pulamos sem quebrar
    linhas.push(`#### DIA ${i + 1}: ${key}`);
    linhas.push('```md');
    linhas.push(txt);
    linhas.push('```');
    linhas.push('');
  });

  return `${promptBase}\n\n${linhas.join('\n')}`;
}

export default function IAventureSeScreen() {
  const navigation = useNavigation<RootNavigationProp<'IAventureSe'>>();

  // ==== estado (mantive seus campos) ====
  const [dias, setDias] = useState('');
  const [parques, setParques] = useState('');
  const [ritmo, setRitmo] = useState('');
  const [perfil, setPerfil] = useState('');
  const [refeicoes, setRefeicoes] = useState('');
  const [extras, setExtras] = useState('');
  const [detalhado, setDetalhado] = useState(false);

  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [qtdDiasTotais, setQtdDiasTotais] = useState('');

  const [nChegada, setNChegada] = useState(0);
  const [nSaida, setNSaida] = useState(0);
  const [nDisney, setNDisney] = useState(0);
  const [nUniversal, setNUniversal] = useState(0);
  const [nDescanso, setNDescanso] = useState(0);
  const [nCompras, setNCompras] = useState(0);

  const [qtdParques, setQtdParques] = useState('');
  const [qtdDescanso, setQtdDescanso] = useState('');
  const [qtdCompras, setQtdCompras] = useState('');
  const [qtdDisney, setQtdDisney] = useState('');
  const [qtdUniversal, setQtdUniversal] = useState('');

  const [temDiaChegada, setTemDiaChegada] = useState<'sim'|'não'>('não');
  const [temDiaSaida,   setTemDiaSaida]   = useState<'sim'|'não'>('não');

  const [selDisney, setSelDisney] = useState<string[]>([]);
  const [selUniversal, setSelUniversal] = useState<string[]>([]);
  const [selExtrasLocais, setSelExtrasLocais] = useState<string[]>([]);
  const [ritmoEscolha, setRitmoEscolha] = useState('');

  // PERFIL DO GRUPO (estados mantidos para compatibilidade)
  const [perfilAdultos, setPerfilAdultos] = useState('2');
  const [perfilCriancas, setPerfilCriancas] = useState('1');
  const [idadeCrianca, setIdadeCrianca] = useState('7');
  const [alturaCrianca, setAlturaCrianca] = useState('1,22');

  const [passesFila, setPassesFila] = useState<string[]>([]);
  const [preferRefeicoes, setPreferRefeicoes] = useState<string[]>([]);
  const [transporteEscolhido, setTransporteEscolhido] = useState<string[]>([]);

  const [showsPrincipais, setShowsPrincipais] = useState<string[]>([]);
  const [paradasDesfiles, setParadasDesfiles] = useState<string[]>([]);
  const [eventosEspeciais, setEventosEspeciais] = useState<string[]>([]);
  const [restricoes, setRestricoes] = useState<string[]>([]);

  const [listaCompras, setListaCompras] = useState<string[]>([]);
  const [itensEssenciais, setItensEssenciais] = useState<string[]>([]);
  const [resumoJanela, setResumoJanela] = useState('');
  const [previewPlano, setPreviewPlano] = useState<string[]>([]);
  const [preRoteiroTxt, setPreRoteiroTxt] = useState('');
  const [maisAlgo, setMaisAlgo] = useState('');

  const [gerando, setGerando] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;

  // ---- clima / cabeçalho ----
  const [clima, setClima] = useState<any>(null);
  useEffect(() => { buscarClima('Orlando').then(setClima).catch(() => {}); }, []);
  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  // Sombras
  const glowHard = Platform.OS === 'web'
    ? { boxShadow: '0 0 12px rgba(0,255,255,0.9)' as any }
    : { shadowColor: AZUL_NEON, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.9, shadowRadius: 12, elevation: 8 };
  const glowSoft = Platform.OS === 'web'
    ? { boxShadow: '0 0 6px rgba(0,255,255,0.5)' as any }
    : { shadowColor: AZUL_NEON, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 6, elevation: 5 };
  const textNeon = Platform.OS === 'web'
    ? { textShadow: `0 0 10px ${AZUL_NEON}` as any }
    : { textShadowColor: AZUL_NEON, textShadowRadius: 10, textShadowOffset: { width: 0, height: 0 } };

  // ===== helpers form =====
  function getValue(id: string): any {
    switch (id) {
      case 'dataInicio': return dataInicio;
      case 'dataFim': return dataFim;
      case 'qtdDiasTotaisInput': return qtdDiasTotais;
      case 'qtdDiasSug': return '';

      case 'selDisney': return selDisney;
      case 'selUniversal': return selUniversal;
      case 'selExtrasLocais': return selExtrasLocais;

      case 'ritmoEscolha': return ritmoEscolha;

      case 'perfilAdultos': return perfilAdultos;
      case 'perfilCriancas': return perfilCriancas;
      case 'idadeCrianca': return idadeCrianca;
      case 'alturaCrianca': return alturaCrianca;

      case 'passesFila': return passesFila;
      case 'preferRefeicoes': return preferRefeicoes;
      case 'transporteEscolhido': return transporteEscolhido;

      case 'showsPrincipais': return showsPrincipais;
      case 'paradasDesfiles': return paradasDesfiles;
      case 'eventosEspeciais': return eventosEspeciais;

      case 'restricoesEscolhas': return restricoes;

      case 'pedidoFrase': return maisAlgo;

      case 'resumoJanela': return resumoJanela;
      default: return '';
    }
  }
  function setValue(id: string, v: any): void {
    switch (id) {
      case 'dataInicio': setDataInicio(v); break;
      case 'dataFim': setDataFim(v); break;
      case 'qtdDiasTotaisInput': setQtdDiasTotais(v.replace?.(/\D/g, '') || v); break;
      case 'qtdDiasSug': {
        const num = parseInt(String(v).replace(/\D/g, ''), 10);
        if (!Number.isNaN(num)) setQtdDiasTotais(String(num));
        break;
      }

      case 'selDisney': setSelDisney(v); break;
      case 'selUniversal': setSelUniversal(v); break;
      case 'selExtrasLocais': setSelExtrasLocais(v); break;

      case 'ritmoEscolha': setRitmoEscolha(v); break;

      case 'perfilAdultos': setPerfilAdultos(String(v)); break;
      case 'perfilCriancas': setPerfilCriancas(String(v)); break;
      case 'idadeCrianca': setIdadeCrianca(String(v)); break;
      case 'alturaCrianca': setAlturaCrianca(String(v)); break;

      case 'passesFila': setPassesFila(v); break;
      case 'preferRefeicoes': setPreferRefeicoes(v); break;
      case 'transporteEscolhido': setTransporteEscolhido(v); break;

      case 'showsPrincipais': setShowsPrincipais(v); break;
      case 'paradasDesfiles': setParadasDesfiles(v); break;
      case 'eventosEspeciais': setEventosEspeciais(v); break;

      case 'restricoesEscolhas': setRestricoes(v); break;

      case 'pedidoFrase': setMaisAlgo(v); break;

      case 'resumoJanela': setResumoJanela(v); break;
    }
  }
  function toggleChipMulti(id: string, label: string) {
    const arr: string[] = Array.isArray(getValue(id)) ? getValue(id) : [];
    const novo = arr.includes(label) ? arr.filter(x => x !== label) : [...arr, label];
    setValue(id, novo);
  }

  async function limparTudo() {
    setDias(''); setParques(''); setRitmo(''); setPerfil(''); setRefeicoes(''); setExtras('');
    setDataInicio(''); setDataFim(''); setQtdDiasTotais('');
    setSelDisney([]); setSelUniversal([]); setSelExtrasLocais([]);
    setRitmoEscolha('');
    setPerfilAdultos('2'); setPerfilCriancas('1'); setIdadeCrianca('7'); setAlturaCrianca('1,22');
    setPassesFila([]); setPreferRefeicoes([]); setTransporteEscolhido([]);
    setListaCompras([]); setItensEssenciais([]);
    setShowsPrincipais([]); setParadasDesfiles([]); setEventosEspeciais([]); setRestricoes([]);
    setResumoJanela(''); setPreviewPlano([]); setPreRoteiroTxt(''); setMaisAlgo('');
    setNChegada(0); setNSaida(0); setNDisney(0); setNUniversal(0); setNDescanso(0); setNCompras(0);
    await AsyncStorage.removeItem(DRAFT_KEY);
  }

  function parseDDMM(ddmm: string): Date | null {
    const m = ddmm?.match?.(/^(\d{1,2})\/(\d{1,2})$/);
    if (!m) return null;
    const year = hoje.getFullYear();
    const d = parse(`${m[1].padStart(2,'0')}/${m[2].padStart(2,'0')}/${year}`, 'dd/MM/yyyy', new Date());
    return d;
  }

  // calcula total entre datas se usuario preencher ambas
  useEffect(() => {
    const ini = parseDDMM(dataInicio);
    theEnd: {
      const fim0 = parseDDMM(dataFim);
      if (!ini || !fim0) break theEnd;
      const fim = isAfter(ini, fim0) ? addYears(fim0, 1) : fim0;
      const diff = differenceInCalendarDays(fim, ini);
      if (!Number.isNaN(diff) && diff >= 0) setQtdDiasTotais(String(diff + 1));
    }
  }, [dataInicio, dataFim]);

  // resumo em uma linha (UI)
  useEffect(() => {
    const partes: string[] = [];
    if (dataInicio && dataFim) partes.push(`Período ${dataInicio} → ${dataFim}`);
    if (qtdDiasTotais) partes.push(`${qtdDiasTotais} dias (inclusivo)`);
    if (selDisney.length) partes.push(`Disney: ${selDisney.join(', ')}`);
    if (selUniversal.length) partes.push(`Universal: ${selUniversal.join(', ')}`);
    if (selExtrasLocais.length) partes.push(`Locais: ${selExtrasLocais.join(', ')}`);
    if (ritmoEscolha) partes.push(`Ritmo: ${ritmoEscolha}`);
    const perfilStr = `Perfil: ${perfilAdultos || '0'} adultos • ${perfilCriancas || '0'} crianças${idadeCrianca ? ` (${idadeCrianca}a)` : ''}${alturaCrianca ? `, ${alturaCrianca}m` : ''}`;
    partes.push(perfilStr);
    if (passesFila.length) partes.push(`Passes: ${passesFila.join(', ')}`);
    if (preferRefeicoes.length) partes.push(`Refeições: ${preferRefeicoes.join(', ')}`);
    if (transporteEscolhido.length) partes.push(`Transporte: ${transporteEscolhido.join(', ')}`);
    const showsLine = [showsPrincipais.join(', '), paradasDesfiles.join(', '), eventosEspeciais.join(', ')].filter(Boolean).join(' • ');
    if (showsLine) partes.push(`Shows: ${showsLine}`);
    if (restricoes.length) partes.push(`Restrições: ${restricoes.join(', ')}`);
    setResumoJanela(partes.join(' • '));
  }, [
    dataInicio, dataFim, qtdDiasTotais,
    selDisney, selUniversal, selExtrasLocais, ritmoEscolha,
    perfilAdultos, perfilCriancas, idadeCrianca, alturaCrianca,
    passesFila, preferRefeicoes, transporteEscolhido,
    showsPrincipais, paradasDesfiles, eventosEspeciais, restricoes
  ]);

  // contadores → auxiliares
  useEffect(() => {
    setQtdDisney(nDisney ? String(nDisney) : '');
    setQtdUniversal(nUniversal ? String(nUniversal) : '');
    setQtdDescanso(nDescanso ? String(nDescanso) : '');
    setQtdCompras(nCompras ? String(nCompras) : '');
    setQtdParques(String(nDisney + nUniversal));
    setTemDiaChegada(nChegada ? 'sim' : 'não');
    setTemDiaSaida(nSaida ? 'sim' : 'não');
  }, [nDisney, nUniversal, nDescanso, nCompras, nChegada, nSaida]);

  // preview de slots
  useEffect(() => {
    const total = Number(qtdDiasTotais) || 0;
    if (!total) { setPreviewPlano([]); return; }
    const blocos: string[] = [];
    const push = (label: string, n: number) => { for (let i = 0; i < n; i++) blocos.push(label); };
    push('Voo / Chegada', nChegada);
    push('Parque Disney', nDisney);
    push('Dia de Descanso', nDescanso);
    push('Parque Universal', nUniversal);
    push('Compras / Disney Springs', nCompras);
    push('Voo / Saída', nSaida);
    while (blocos.length < total) blocos.push('Dia livre / Ajuste');
    setPreviewPlano(blocos.slice(0, total));
  }, [qtdDiasTotais, nChegada, nSaida, nDisney, nUniversal, nDescanso, nCompras]);

  // texto curto
  useEffect(() => {
    const total = Number(qtdDiasTotais) || 0;
    const soma = nChegada + nSaida + nDisney + nUniversal + nDescanso + nCompras;
    const partes: string[] = [];
    if (total) partes.push(`${total} dia(s)`);
    if (nChegada)  partes.push(`Chegada x${nChegada}`);
    if (nSaida)    partes.push(`Saída x${nSaida}`);
    if (nDisney)   partes.push(`Disney x${nDisney}`);
    if (nUniversal)partes.push(`Universal x${nUniversal}`);
    if (nDescanso) partes.push(`Descanso x${nDescanso}`);
    if (nCompras)  partes.push(`Compras x${nCompras}`);
    if (selDisney.length)   partes.push(`Foco Disney: ${selDisney.join(', ')}`);
    if (selUniversal.length)partes.push(`Foco Universal: ${selUniversal.join(', ')}`);
    if (passesFila.length)  partes.push(`Passes: ${passesFila.join(', ')}`);
    if (restricoes.length)  partes.push(`Evitar: ${restricoes.join(', ')}`);
    if (soma && total && soma !== total) partes.push(`⚠️ Ajuste: soma ${soma}/${total}`);
    setPreRoteiroTxt(partes.join(' • '));
  }, [
    qtdDiasTotais, nChegada, nSaida, nDisney, nUniversal, nDescanso, nCompras,
    selDisney, selUniversal, passesFila, restricoes
  ]);

  const totalPeriodo = Number(qtdDiasTotais) || 0;
  const somaQtds = nChegada + nSaida + nDisney + nUniversal + nDescanso + nCompras;
  const diffDias = totalPeriodo - somaQtds;
  const somaOk = totalPeriodo > 0 && diffDias === 0;

  // animação do botão
  useEffect(() => {
    if (somaOk) {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.06, duration: 600, useNativeDriver: Platform.OS !== 'web' }),
          Animated.timing(pulse, { toValue: 1.0,  duration: 600, useNativeDriver: Platform.OS !== 'web' }),
        ])
      );
      anim.start();
      return () => anim.stop();
    } else {
      pulse.stopAnimation?.();
      pulse.setValue(1);
    }
  }, [somaOk]);

  // snapshot
  const snapshot = () => ({
    dias, parques, ritmo, perfil, refeicoes, extras, detalhado,
    dataInicio, dataFim, qtdDiasTotais,
    nChegada, nSaida, nDisney, nUniversal, nDescanso, nCompras,
    qtdParques, qtdDescanso, qtdCompras, qtdDisney, qtdUniversal,
    temDiaChegada, temDiaSaida,
    selDisney, selUniversal, selExtrasLocais, ritmoEscolha,
    perfilAdultos, perfilCriancas, idadeCrianca, alturaCrianca,
    passesFila, preferRefeicoes, transporteEscolhido, listaCompras, itensEssenciais,
    showsPrincipais, paradasDesfiles, eventosEspeciais, restricoes,
    resumoJanela,
    preRoteiroTxt, maisAlgo,
  });

  const applySnapshot = (s: any) => {
    try {
      setDias(s.dias ?? ''); setParques(s.parques ?? ''); setRitmo(s.ritmo ?? '');
      setPerfil(s.perfil ?? ''); setRefeicoes(s.refeicoes ?? ''); setExtras(s.extras ?? '');
      setDetalhado(!!s.detalhado);
      setDataInicio(s.dataInicio ?? ''); setDataFim(s.dataFim ?? ''); setQtdDiasTotais(s.qtdDiasTotais ?? '');
      setNChegada(s.nChegada ?? 0); setNSaida(s.nSaida ?? 0); setNDisney(s.nDisney ?? 0);
      setNUniversal(s.nUniversal ?? 0); setNDescanso(s.nDescanso ?? 0); setNCompras(s.nCompras ?? 0);
      setQtdParques(s.qtdParques ?? ''); setQtdDescanso(s.qtdDescanso ?? ''); setQtdCompras(s.qtdCompras ?? '');
      setQtdDisney(s.qtdDisney ?? ''); setQtdUniversal(s.qtdUniversal ?? '');
      setTemDiaChegada(s.temDiaChegada ?? 'não'); setTemDiaSaida(s.temDiaSaida ?? 'não');
      setSelDisney(s.selDisney ?? []); setSelUniversal(s.selUniversal ?? []); setSelExtrasLocais(s.selExtrasLocais ?? []);
      setRitmoEscolha(s.ritmoEscolha ?? '');
      setPerfilAdultos(s.perfilAdultos ?? '2'); setPerfilCriancas(s.perfilCriancas ?? '1'); setIdadeCrianca(s.idadeCrianca ?? '7');
      setAlturaCrianca(s.alturaCrianca ?? '1,22');
      setPassesFila(s.passesFila ?? []); setPreferRefeicoes(s.preferRefeicoes ?? []); setTransporteEscolhido(s.transporteEscolhido ?? []);
      setListaCompras(s.listaCompras ?? []); setItensEssenciais(s.itensEssenciais ?? []);
      setShowsPrincipais(s.showsPrincipais ?? []); setParadasDesfiles(s.paradasDesfiles ?? []); setEventosEspeciais(s.eventosEspeciais ?? []);
      setRestricoes(s.restricoes ?? []);
      setResumoJanela(s.resumoJanela ?? '');
      setPreRoteiroTxt(s.preRoteiroTxt ?? ''); setMaisAlgo(s.maisAlgo ?? '');
    } catch {}
  };

  useEffect(() => { (async () => {
    const raw = await AsyncStorage.getItem(DRAFT_KEY);
    if (raw) applySnapshot(JSON.parse(raw));
  })(); }, []);

  const saveTimer = useRef<any>(null);
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(snapshot())).catch(() => {});
    }, 400);
    return () => saveTimer.current && clearTimeout(saveTimer.current);
  }, [
    dias, parques, ritmo, perfil, refeicoes, extras, detalhado,
    dataInicio, dataFim, qtdDiasTotais,
    nChegada, nSaida, nDisney, nUniversal, nDescanso, nCompras,
    qtdParques, qtdDescanso, qtdCompras, qtdDisney, qtdUniversal,
    temDiaChegada, temDiaSaida,
    selDisney, selUniversal, selExtrasLocais, ritmoEscolha,
    perfilAdultos, perfilCriancas, idadeCrianca, alturaCrianca,
    passesFila, preferRefeicoes, transporteEscolhido, listaCompras, itensEssenciais,
    showsPrincipais, paradasDesfiles, eventosEspeciais, restricoes, resumoJanela, preRoteiroTxt, maisAlgo
  ]);

  const handleSalvarRascunho = async () => {
    await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(snapshot()));
    Alert.alert('Salvo', 'Rascunho guardado com sucesso.');
  };

  // ===== navegação para o Menu Principal (RÁPIDA + reset em seguida) =====
  const goMenuPrincipalFast = () => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    requestAnimationFrame(() => {
      navigation.navigate('MenuPrincipal' as never);
    });
    setTimeout(() => {
      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'MenuPrincipal' as never }] }));
    }, 50);
  };

  // monta prompt
  function montarPromptFinal() {
    const formValues = {
      dataInicio, dataFim,
      qtdDiasTotaisInput: qtdDiasTotais,
      selDisney, selUniversal, selExtrasLocais,
      ritmoEscolha,
      perfilAdultos, perfilCriancas, idadeCrianca, alturaCrianca,
      passesFila, preferRefeicoes, transporteEscolhido,
      showsPrincipais, paradasDesfiles, eventosEspeciais,
      restricoesEscolhas: restricoes,
    } as Record<string, any>;

    let promptBase = buildPromptFromForm(formValues);

    if (!detalhado) {
      promptBase = promptBase
        .replace(/NIVEL_DETALHE:\s*ALTO/gi, 'NIVEL_DETALHE: BAIXO')
        .replace(/ITENS_POR_TURNO:\s*\d+\s*-\s*\d+/gi, 'ITENS_POR_TURNO: 4-6');
    } else {
      promptBase = promptBase
        .replace(/NIVEL_DETALHE:\s*BAIXO/gi, 'NIVEL_DETALHE: ALTO')
        .replace(/ITENS_POR_TURNO:\s*\d+\s*-\s*\d+/gi, 'ITENS_POR_TURNO: 6-9');
    }

    if (maisAlgo?.trim()) {
      promptBase += ` Observação do usuário: ${maisAlgo.trim()}.`;
    }

    const dist: string[] = [];
    if (nChegada)  dist.push(`Chegada x${nChegada}`);
    if (nSaida)    dist.push(`Saída x${nSaida}`);
    if (nDisney)   dist.push(`Disney x${nDisney}`);
    if (nUniversal)dist.push(`Universal x${nUniversal}`);
    if (nDescanso) dist.push(`Descanso x${nDescanso}`);
    if (nCompras)  dist.push(`Compras x${nCompras}`);
    if (dist.length) promptBase += ` Distribuição desejada: ${dist.join(', ')}.`;

    // ---- NEW: anexa prompts por tipo de dia, na ordem exata dos slots ----
    const slots = montarFilaSlots({
      total: Number(qtdDiasTotais) || 0,
      nChegada, nSaida, nDisney, nUniversal, nDescanso, nCompras,
      selDisney, selUniversal,
    });

    return anexarPromptsPorDia(promptBase, slots);
  }

  async function doGerarEFazerNavegacao() {
    await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(snapshot()));
    const promptFinal = montarPromptFinal();

    try {
      setGerando(true);
      const openaiKey = await getApiKey().catch(() => null);
      const hasAnyKey = !!openaiKey || !!(await AsyncStorage.getItem('OPENROUTER_API_KEY'));

      const out = await gerarRoteiroIAFromPrompt(promptFinal, { forcarOffline: !hasAnyKey });

      let diasGerados: DiaGerado[] = Array.isArray(out?.roteiro) ? out.roteiro : [];
      if (!diasGerados.length) throw new Error('Nada gerado.');

      diasGerados = validarRoteiroDias(diasGerados);
      navigation.navigate('IAResultado', { roteiroGerado: diasGerados });

      if (!hasAnyKey) {
        Alert.alert('Modo Offline','Gerei um roteiro básico sem API. Configure a chave para resultados mais detalhados.');
      }
    } catch (e: any) {
      navigation.navigate('IAResultado', { roteiroGerado: DEMO });
      Alert.alert('Aviso', e?.message ? `${e.message}\n\nMostrando um exemplo para pré-visualização.` : 'Falha ao gerar. Mostrando um exemplo para pré-visualização.');
    } finally {
      setGerando(false);
    }
  }

  function gerar() {
    if (gerando) return;
    const total = Number(qtdDiasTotais) || 0;
    const soma = nChegada + nSaida + nDisney + nUniversal + nDescanso + nCompras;
    const diff = total - soma;
    const somaOK = total > 0 && diff === 0;

    if (!somaOK) {
      Alert.alert(
        'Distribuição incompleta',
        diff > 0
          ? `Ainda faltam ${diff} dia(s) para distribuir. Deseja gerar mesmo assim?`
          : `Há ${-diff} dia(s) excedente(s). Deseja gerar mesmo assim?`,
        [
          { text: 'Ajustar', style: 'cancel' },
          { text: 'Gerar mesmo assim', onPress: () => { doGerarEFazerNavegacao(); } },
        ]
      );
      return;
    }

    doGerarEFazerNavegacao();
  }

  function inc(setter: (n: number) => void, cur: number, max?: number) {
    const total = Number(qtdDiasTotais) || 0;
    const soma = nChegada + nSaida + nDisney + nUniversal + nDescanso + nCompras;
    const limite = typeof max === 'number' ? max : Infinity;
    if (cur >= limite) return;
    if (soma >= total) return;
    setter(cur + 1);
  }
  function dec(setter: (n: number) => void, cur: number, min = 0) {
    if (cur <= min) return;
    setter(cur - 1);
  }

  const baseDate = parseDDMM(dataInicio);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Cabeçalho */}
      <View style={styles.headerWrap}>
        <CabecalhoDia titulo="" data={dataFormatada} diaSemana={diaSemana} clima={clima} />
        <View style={styles.titleRow}>
          <Text style={[styles.headerTitle, styles.headerTitleNeon, textNeon]}>Briefing da Viagem</Text>

          {/* Botões topo */}
          <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ConfiguracoesAPIKey')}
              activeOpacity={0.9}
              style={[styles.iconBtnSmall, glowSoft]}
              accessibilityLabel="Configurar API"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="key-outline" size={18} color={AZUL_NEON} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setDetalhado(d => !d)} activeOpacity={0.9} style={[styles.detailChip, glowSoft]} accessibilityRole="button">
              <Text style={styles.detailChipTxt}>{detalhado ? 'Detalhado: ON' : 'Detalhado: OFF'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>

        {/* ===== PERFIL DO GRUPO (FORA DE "TOTAIS") ===== */}
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.labelTopo}>Perfil do grupo</Text>
          <View style={[styles.boxGroup, glowHard]}>
            <View style={styles.perfilRow}>
              <View style={styles.perfilCol}>
                <Text style={styles.perfilLabel}>Quantidade de adultos</Text>
                <TextInput
                  style={styles.input}
                  value={perfilAdultos}
                  onChangeText={(t)=>setValue('perfilAdultos', t.replace(/\D/g,''))}
                  placeholder="Ex.: 2"
                  placeholderTextColor="#7b89a6"
                  keyboardType="numeric"
                  accessibilityLabel="Quantidade de adultos"
                />
              </View>

              <View style={styles.perfilCol}>
                <Text style={styles.perfilLabel}>Quantidade de crianças</Text>
                <TextInput
                  style={styles.input}
                  value={perfilCriancas}
                  onChangeText={(t)=>setValue('perfilCriancas', t.replace(/\D/g,''))}
                  placeholder="Ex.: 1"
                  placeholderTextColor="#7b89a6"
                  keyboardType="numeric"
                  accessibilityLabel="Quantidade de crianças"
                />
              </View>
            </View>

            <View style={[styles.perfilRow, { marginTop: 10 }]}>
              <View style={styles.perfilCol}>
                <Text style={styles.perfilLabel}>Idade da(s) criança(s)</Text>
                <TextInput
                  style={styles.input}
                  value={idadeCrianca}
                  onChangeText={(t)=>setValue('idadeCrianca', t.replace(/\D/g,''))}
                  placeholder="Ex.: 7"
                  placeholderTextColor="#7b89a6"
                  keyboardType="numeric"
                  accessibilityLabel="Idade das crianças em anos"
                />
              </View>

              <View style={styles.perfilCol}>
                <Text style={styles.perfilLabel}>Altura da(s) criança(s) (m)</Text>
                <TextInput
                  style={styles.input}
                  value={alturaCrianca}
                  onChangeText={(t)=>setValue('alturaCrianca', t.replace(/[^0-9,.\-]/g,'').replace('.',','))}
                  placeholder="Ex.: 1,22"
                  placeholderTextColor="#7b89a6"
                  keyboardType="decimal-pad"
                  accessibilityLabel="Altura das crianças em metros"
                />
              </View>
            </View>
          </View>
        </View>

        {/* ===== DEMAIS SEÇÕES ===== */}
        {SECOES_IA.filter(s => s.enabled).map((sec) => (
          <View key={sec.id} style={{ marginBottom: 12 }}>
            <Text style={styles.labelTopo}>{sec.titulo}</Text>
            <View style={[styles.boxGroup, glowHard]}>
              {sec.id === 'totais' ? (
                <View>
                  {/* Total de dias */}
                  <View style={{ marginBottom: 8 }}>
                    <TextInput
                      style={[styles.input]}
                      value={qtdDiasTotais}
                      onChangeText={(t) => setValue('qtdDiasTotaisInput', t)}
                      placeholder="Digite o total de dias (ou preencha Chegada/Saída para calcular)"
                      placeholderTextColor="#7b89a6"
                      keyboardType="numeric"
                      accessibilityLabel="Total de dias da viagem"
                    />
                  </View>

                  {/* Distribuição */}
                  <QuantRow icon="airplane-outline" label="Dia de Chegada" value={nChegada} onInc={() => inc(setNChegada, nChegada, 1)} onDec={() => dec(setNChegada, nChegada)} />
                  <QuantRow icon="airplane" label="Dia de Saída" value={nSaida} onInc={() => inc(setNSaida, nSaida, 1)} onDec={() => dec(setNSaida, nSaida)} />
                  <QuantRow icon="sparkles-outline" label="Parque Disney" value={nDisney} onInc={() => inc(setNDisney, nDisney)} onDec={() => dec(setNDisney, nDisney)} />
                  <QuantRow icon="planet-outline" label="Parque Universal" value={nUniversal} onInc={() => inc(setNUniversal, nUniversal)} onDec={() => dec(setNUniversal, nUniversal)} />
                  <QuantRow icon="bed-outline" label="Dia de Descanso" value={nDescanso} onInc={() => inc(setNDescanso, nDescanso)} onDec={() => dec(setNDescanso, nDescanso)} />
                  <QuantRow icon="cart-outline" label="Dia de Compras" value={nCompras} onInc={() => inc(setNCompras, nCompras)} onDec={() => dec(setNCompras, nCompras)} />

                  <Text style={[styles.sumText, { color: somaOk ? '#8BFFB3' : '#ff9aa2' }]}>{`Soma: ${nChegada + nSaida + nDisney + nUniversal + nDescanso + nCompras}/${Number(qtdDiasTotais) || 0} dia(s)`}</Text>
                  {!somaOk && (Number(qtdDiasTotais) || 0) > 0 && (
                    <Text style={styles.warnText}>{(Number(qtdDiasTotais) || 0) - (nChegada + nSaida + nDisney + nUniversal + nDescanso + nCompras) > 0
                      ? `Distribua ${(Number(qtdDiasTotais) || 0) - (nChegada + nSaida + nDisney + nUniversal + nDescanso + nCompras)} dia(s) restante(s).`
                      : `Remova ${-((Number(qtdDiasTotais) || 0) - (nChegada + nSaida + nDisney + nUniversal + nDescanso + nCompras))} dia(s) excedente(s).`}
                    </Text>
                  )}
                </View>
              ) : null}

              {sec.id !== 'totais' && sec.items.map((it: ItemConfig, idx) => {
                if (it.type === 'text' || it.type === 'textarea' || it.type === 'number') {
                  const isArea = it.type === 'textarea';
                  return (
                    <View key={`${sec.id}-${it.id}-${idx}`} style={{ marginBottom: isArea ? 0 : 8 }}>
                      {it.helperText ? <Text style={{ color: '#9fb3c8', marginBottom: 6, fontSize: 12 }}>{it.helperText}</Text> : null}
                      <TextInput
                        style={[styles.input, isArea && styles.textarea]}
                        value={String(getValue(it.id) || '')}
                        onChangeText={(t) => setValue(it.id, t)}
                        placeholder={it.placeholder}
                        placeholderTextColor="#7b89a6"
                        keyboardType={it.type === 'number' ? 'numeric' : 'default'}
                        multiline={isArea}
                        accessibilityLabel={it.placeholder}
                      />
                    </View>
                  );
                }

                if (it.type === 'chips-single' && it.chipOptionsKey) {
                  const opts = (CHIP_OPCOES as any)[it.chipOptionsKey] ?? [];
                  const current = String(getValue(it.id) || '');
                  return (
                    <View key={`${sec.id}-${it.id}-${idx}`} style={styles.rowChips}>
                      {opts.map((label: string) => (
                        <TouchableOpacity
                          key={label}
                          style={[styles.chip, current === label && { borderColor: AZUL_NEON }]}
                          onPress={() => setValue(it.id, label)}
                          accessibilityRole="button"
                          accessibilityState={{ selected: current === label }}
                          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        >
                          <Text style={[styles.chipTxt, current === label && { color: AZUL_NEON }]}>{label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  );
                }

                if (it.type === 'chips-multi' && it.chipOptionsKey) {
                  const opts = (CHIP_OPCOES as any)[it.chipOptionsKey] ?? [];
                  const arr: string[] = Array.isArray(getValue(it.id)) ? getValue(it.id) : [];
                  return (
                    <View key={`${sec.id}-${it.id}-${idx}`} style={styles.rowChips}>
                      {opts.map((label: string) => {
                        const active = arr.includes(label);
                        return (
                          <TouchableOpacity
                            key={label}
                            style={[styles.chip, active && { borderColor: AZUL_NEON }]}
                            onPress={() => toggleChipMulti(it.id, label)}
                            accessibilityRole="checkbox"
                            accessibilityState={{ checked: active }}
                            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                          >
                            <Text style={[styles.chipTxt, active && { color: AZUL_NEON }]}>{label}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
                }

                if (it.type === 'voice') {
                  return (
                    <View key={`${sec.id}-${it.id}-${idx}`}>
                      {it.helperText ? <Text style={{ color: '#9fb3c8', marginBottom: 8, fontSize: 12 }}>{it.helperText}</Text> : null}
                      <TextInput
                        style={[styles.input, styles.textarea]}
                        multiline
                        value={maisAlgo}
                        onChangeText={(t) => setValue(it.id, t)}
                        placeholder={it.placeholder || 'Fale em UMA frase o que deseja para o roteiro'}
                        placeholderTextColor="#7b89a6"
                        accessibilityLabel="Observações do usuário"
                      />
                      <View style={styles.actionsRow}>
                        <View style={styles.actionsLeft}>
                          <TouchableOpacity style={styles.btnClear} onPress={limparTudo} disabled={gerando}><Text style={styles.btnClearTxt}>Limpar</Text></TouchableOpacity>
                          <TouchableOpacity style={styles.iconBtn} onPress={handleSalvarRascunho} disabled={gerando} accessibilityLabel="Salvar rascunho">
                            <Ionicons name="save-outline" size={20} color={AZUL_NEON} />
                          </TouchableOpacity>
                        </View>
                        <Animated.View style={{ marginLeft: 'auto', transform: [{ scale: pulse }] }}>
                          <TouchableOpacity
                            style={[styles.generateBtn, !somaOk && { opacity: 0.6 }]}
                            onPress={gerar}
                            disabled={gerando}
                            accessibilityLabel="Gerar cards AI"
                            activeOpacity={0.85}
                          >
                            {gerando ? <ActivityIndicator color={AZUL_ESCURO} /> : <Text style={styles.generateTxt}>✨ Gerar cards AI</Text>}
                          </TouchableOpacity>
                        </Animated.View>
                      </View>
                    </View>
                  );
                }

                return null;
              })}

              {sec.id === 'totais' && (
                <View style={[styles.planPreview, glowSoft]}>
                  <Text style={styles.planPreviewTitle}>Pré-visualização do planejamento</Text>
                  {previewPlano.length === 0 ? (
                    <Text style={styles.planPreviewLine}>Preencha período e distribua as quantidades para ver aqui.</Text>
                  ) : (
                    previewPlano.map((linha, i) => {
                      const base = parseDDMM(dataInicio);
                      const rotulo = base ? format(addDays(base, i), 'dd/MM') : `Dia ${i + 1}`;
                      return <Text key={`pl-${i}`} style={styles.planPreviewLine}>{`${rotulo} • ${linha}`}</Text>;
                    })
                  )}
                  <Text style={styles.planPreviewFooter}>{`Total planejado: ${previewPlano.length}${qtdDiasTotais ? ` de ${qtdDiasTotais} dias` : ''}`}</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        <View style={{ height: 200 }} />
      </ScrollView>

      {/* 🖼️ Logo TRAVADO (sem clique) */}
      <View style={styles.footerBlack} pointerEvents="none">
        <Image source={LOGO} style={styles.footerLogo} resizeMode="contain" />
      </View>

      {/* ⬅️ Seta: voltar ao Menu Principal (rápido) */}
      <TouchableOpacity
        style={styles.bottomBackLeft}
        onPress={goMenuPrincipalFast}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel="Voltar ao Menu Principal"
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <View style={styles.glowCircle}>
          <Ionicons name="arrow-back-circle" size={44} color={AZUL_NEON} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

function QuantRow({ icon, label, value, onInc, onDec }:
  { icon: any; label: string; value: number; onInc: () => void; onDec: () => void; }) {
  return (
    <View style={styles.quantRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Ionicons name={icon as any} size={18} color={AZUL_NEON} />
        <Text style={styles.quantLabel}>{label}</Text>
      </View>
      <View style={styles.stepper}>
        <TouchableOpacity style={styles.stepBtn} onPress={onDec}><Text style={styles.stepBtnTxt}>−</Text></TouchableOpacity>
        <Text style={styles.quantValue}>{value}</Text>
        <TouchableOpacity style={styles.stepBtn} onPress={onInc}><Text style={styles.stepBtnTxt}>＋</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  headerWrap: { paddingTop: Platform.OS === 'android' ? 40 : 20, paddingHorizontal: 16, paddingBottom: 8, backgroundColor: '#000' },
  titleRow: { marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#E6F7FF' },
  headerTitleNeon: {},
  detailChip: { borderWidth: 1.5, borderColor: AZUL_NEON, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: '#000' },
  detailChipTxt: { color: AZUL_NEON, fontWeight: '800', fontSize: 11 },
  iconBtnSmall: {
    width: 36, height: 36, borderRadius: 999,
    borderWidth: 1.5, borderColor: AZUL_NEON,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#041022',
  },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 140 },
  labelTopo: { color: '#cfe3ff', marginBottom: 6, fontWeight: '600', fontSize: 12 },
  boxGroup: { backgroundColor: '#0f1330', borderWidth: 2, borderColor: AZUL_NEON, borderRadius: 14, padding: 12 },
  input: { backgroundColor: '#0b0e1a', borderWidth: 1.5, borderColor: '#2a3860', borderRadius: 10, padding: 10, color: '#e8f1ff', fontSize: 12 },

  // PERFIL DO GRUPO
  perfilRow: { flexDirection: 'row', gap: 10 },
  perfilCol: { flex: 1 },
  perfilLabel: { color: '#9fb3c8', marginBottom: 6, fontSize: 12, fontWeight: '600' },

  textarea: { minHeight: 90, textAlignVertical: 'top', marginTop: 8 },
  rowChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  chip: { borderWidth: 1.5, borderColor: '#3a4673', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: '#0b0e1a' },
  chipTxt: { color: '#cfe3ff', fontWeight: '700', fontSize: 12 },
  actionsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  actionsLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  btnClear: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, borderWidth: 1.5, borderColor: '#3a4673', backgroundColor: '#0b0e1a' },
  btnClearTxt: { color: '#9fb3c8', fontWeight: '700', fontSize: 12 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 999,
    borderWidth: 1.5, borderColor: AZUL_NEON,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#041022',
  },
  generateBtn: {
    backgroundColor: AZUL_NEON, paddingHorizontal: 10, height: 40, borderRadius: 10, justifyContent: 'center',
    ...Platform.select({ web: { boxShadow: '0 0 16px rgba(0,255,255,0.9)' as any }, default: {
      shadowColor: AZUL_NEON, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.9, shadowRadius: 12, elevation: 8,
    }}),
  },
  generateTxt: { fontWeight: '900', fontSize: 14, color: '#001F3F', textAlign: 'center' },
  planPreview: { marginTop: 12, padding: 10, borderRadius: 12, borderWidth: 1.5, borderColor: AZUL_NEON, backgroundColor: '#0b0e1a' },
  planPreviewTitle: { color: '#cfe3ff', fontWeight: '800', marginBottom: 6, fontSize: 12 },
  planPreviewLine: { color: '#9fb3c8', fontSize: 12, marginBottom: 2 },
  planPreviewFooter: { color: '#cfe3ff', fontSize: 12, marginTop: 6, fontWeight: '700' },

  // Rodapé com logo NÃO clicável
  footerBlack: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    height: 70, backgroundColor: '#000',
    justifyContent: 'center', alignItems: 'flex-end', paddingRight: 16,
  },
  footerLogo: { width: 120, height: 36, opacity: 0.95 },

  // Botão de voltar: área grande, por cima de tudo
  bottomBackLeft: {
    position: 'absolute', left: 10, bottom: 10,
    zIndex: 999,
  },
  glowCircle: {
    borderRadius: 999, padding: 6,
    backgroundColor: 'rgba(0,255,255,0.12)',
  },

  quantRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  quantLabel: { color: '#cfe3ff', fontWeight: '700', fontSize: 12 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  stepBtn: { width: 32, height: 28, borderRadius: 8, borderWidth: 1.5, borderColor: '#3a4673', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b0e1a' },
  stepBtnTxt: { color: '#cfe3ff', fontWeight: '900', fontSize: 14 },
  quantValue: { width: 28, textAlign: 'center', color: '#cfe3ff', fontWeight: '800' },
  sumText: { marginTop: 10, fontWeight: '800', fontSize: 12 },
  warnText: { color: '#ff9aa2', marginTop: 6, fontSize: 12, fontWeight: '700' },
});
