ï»¿import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDays, format } from 'date-fns';
import { buscarClima } from '@/logic/clima/buscarclima';

/** Utils */
export function normalizarNomeRegiao(nome?: string): string | null {
  if (!nome) return null;
  return nome.trim().toLowerCase();
}

/** Tipos existentes */
type DiasDistribuidos = {
  chegada: number;
  saida: number;
  disney: number;
  universal: number;
  compras: number;
  descanso: number;
};

type DiaManual = {
  tipo: string;
  nomeParque?: string;
  horarioVoo?: string;
  completo?: boolean;
  perfilDescanso?: string;
  perfilCompras?: string;
  perfilAtracoes?: {
    valor: string[];
    nome?: string[];
    icone?: string[];
  };
};

type DiaFinal = {
  id: string;
  data: Date;
  tipo: string;
  nomeParque?: string;
  horarioVoo?: string;
  perfilDescanso?: string;
  perfilCompras?: string;
  perfilAtracoes?: {
    valor: string[];
    nome?: string[];
    icone?: string[];
  };
  clima?: {
    temperatura: string;
    condicao: string;
    icone: string;
  };
};

type RegiaoHospedagem = {
  nome: string;
  latitude: number;
  longitude: number;
};

type VooChegada = { aeroporto?: string; horario?: string; horarioHora?: string };
type VooSaida = { aeroporto?: string; horario?: string; horarioHora?: string };

/** Tipos para IA (compatÃƒÂ­vel com seu IAventureSeScreen atual) */
export type PreferenciasIA = {
  dataInicial: string;
  dataFinal: string;
  adultos: number;
  criancas: number;
  parques: string; // separado por vÃƒÂ­rgula
  ritmo: 'lento' | 'medio' | 'rapido';
  orcamentoPorDia: number;
  perfilRefeicoes: string;
  observacoes?: string;
};

export type DiaGeradoIA = {
  data: string;
  parque?: string;
  atividades: string[];
  refeicoes?: string[];
  observacoes?: string;
};

export type RoteiroIATipo = {
  resumo?: string;
  roteiro: DiaGeradoIA[];
};

type Parkisheiro = {
  id: string;
  nome: string;
  email?: string;
  senha?: string;
  dataInicio?: Date;
  dataSaida?: Date;
  totalDias?: number;
  diasDistribuidos?: DiasDistribuidos;
  diasDistribuidosManuais?: DiaManual[];
  roteiroFinal?: DiaFinal[];
  regiaoHospedagem?: RegiaoHospedagem | null;
  visitedScreens: string[];
  vooChegada?: VooChegada;
  vooSaida?: VooSaida;
  perfis?: { [categoria: string]: any };
};

/** Turnos */
type EscolhasPorTurno = {
  [diaId: string]: {
    [turno: string]: string;
  };
};

/** Storage keys */
export const STORAGE_KEY = '@OrlandoApp:parkisheiros';
export const USUARIO_ATUAL_KEY = '@OrlandoApp:usuarioAtual';
const IA_PREFS = 'IA_PREFS';
const IA_ROTEIRO = 'IA_ROTEIRO';

/** Context Type Ã¢â‚¬â€ adicionadas as propriedades/aÃƒÂ§ÃƒÂµes de IA */
type ParkisheiroContextType = {
  parkisheiros: Parkisheiro[];
  parkisheiroAtual: Parkisheiro;
  regiaoHospedagem: RegiaoHospedagem | null;
  escolhasPorTurno: EscolhasPorTurno;

  // UsuÃƒÂ¡rios / sessÃƒÂ£o
  adicionarParkisheiro: (novo: Parkisheiro) => void;
  atualizarParkisheiro: (id: string, dados: Partial<Parkisheiro>) => void;
  loginParkisheiro: (email: string, senha: string) => Parkisheiro | null;
  setUsuarioAtual: (usuario: Parkisheiro) => void;

  // DistribuiÃƒÂ§ÃƒÂ£o / dias
  setTipoManualDoDia: (index: number, dia: DiaManual) => void;
  gerarRoteiroFinal: () => Promise<void>;
  setHorarioVoo: (tipo: 'chegada' | 'saida', valor: string) => void;

  // Local / navegaÃƒÂ§ÃƒÂ£o
  setRegiaoHospedagem: (regiao: RegiaoHospedagem | null) => void;
  getLocalHospedagem: () => RegiaoHospedagem | null;
  salvarEscolhaTurno: (diaId: string, turno: string, atividade: string) => void;
  markVisited: (screen: string) => void;
  getProximaTela: () => string;

  // Perfis
  salvarPerfil: (categoria: string, dados: any) => void;
  atualizarPerfilDescansoPorDia: (data: string, perfil: string) => Promise<void>;
  atualizarPerfilComprasPorDia: (data: string, perfil: string) => Promise<void>;
  atualizarPerfilAtracoesPorDia: (
    data: string,
    perfil: { valor: string[]; nome?: string[]; icone?: string[] }
  ) => Promise<void>;

  // IA Ã¢â‚¬â€ NOVO
  preferenciasIA: PreferenciasIA | null;
  roteiroIA: RoteiroIATipo | null;
  salvarRoteiroIA: (r: RoteiroIATipo, prefs?: PreferenciasIA) => Promise<void>;
  carregarUltimaBuscaIA: () => Promise<void>;
  limparRoteiroIA: () => Promise<void>;

  // Limpeza geral
  limparRoteiroFinal: () => Promise<void>;
};

/** InstÃƒÂ¢ncia e hook */
const ParkisheiroContext = createContext<ParkisheiroContextType>({} as ParkisheiroContextType);
export const useParkisheiro = () => useContext(ParkisheiroContext);

/** Estado inicial do usuÃƒÂ¡rio atual */
export let parkisheiroAtual: Parkisheiro = {
  id: 'default',
  nome: '',
  diasDistribuidosManuais: [],
  regiaoHospedagem: null,
  visitedScreens: [],
  perfis: {},
};

export const ParkisheiroProvider = ({ children }: { children: ReactNode }) => {
  const [parkisheiros, setParkisheiros] = useState<Parkisheiro[]>([]);
  const [escolhasPorTurno, setEscolhasPorTurno] = useState<EscolhasPorTurno>({});
  const [parkisheiroAtualState, setParkisheiroAtual] = useState<Parkisheiro>(parkisheiroAtual);

  /** IA Ã¢â‚¬â€ estado */
  const [preferenciasIA, setPreferenciasIA] = useState<PreferenciasIA | null>(null);
  const [roteiroIA, setRoteiroIA] = useState<RoteiroIATipo | null>(null);

  /** Carregar tudo do storage ao iniciar */
  useEffect(() => {
    const carregar = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setParkisheiros(JSON.parse(json));

        const user = await AsyncStorage.getItem(USUARIO_ATUAL_KEY);
        if (user) {
          const parsed = JSON.parse(user);
          if (parsed.dataInicio) parsed.dataInicio = new Date(parsed.dataInicio);
          if (parsed.dataSaida) parsed.dataSaida = new Date(parsed.dataSaida);
          if (parsed.roteiroFinal && Array.isArray(parsed.roteiroFinal)) {
            parsed.roteiroFinal = parsed.roteiroFinal.map((d: any) => ({
              ...d,
              data: new Date(d.data),
            }));
          }
          setParkisheiroAtual(parsed);
        }

        // IA
        const [prefs, rot] = await AsyncStorage.multiGet([IA_PREFS, IA_ROTEIRO]);
        const p = prefs?.[1] ? (JSON.parse(prefs[1]!) as PreferenciasIA) : null;
        const r = rot?.[1] ? (JSON.parse(rot[1]!) as RoteiroIATipo) : null;
        setPreferenciasIA(p);
        setRoteiroIA(r);
      } catch (err) {
        console.warn(err);
      }
    };
    carregar();
  }, []);

  /** PersistÃƒÂªncias */
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parkisheiros)).catch(console.warn);
  }, [parkisheiros]);

  useEffect(() => {
    AsyncStorage.setItem(USUARIO_ATUAL_KEY, JSON.stringify(parkisheiroAtualState)).catch(console.warn);
    parkisheiroAtual = { ...parkisheiroAtualState };
  }, [parkisheiroAtualState]);

  /** AÃƒÂ§ÃƒÂµes base */
  const adicionarParkisheiro = (novo: Parkisheiro) => {
    setParkisheiros(prev => [...prev, novo]);
    setParkisheiroAtual(novo);
  };

  const atualizarParkisheiro = (id: string, dados: Partial<Parkisheiro>) => {
    setParkisheiros(prev => prev.map(p => (p.id === id ? { ...p, ...dados } : p)));
    if (parkisheiroAtualState.id === id) setParkisheiroAtual(prev => ({ ...prev, ...dados }));
  };

  const loginParkisheiro = (email: string, senha: string): Parkisheiro | null => {
    const user = parkisheiros.find(p => p.email?.toLowerCase() === email.toLowerCase() && p.senha === senha);
    if (user) {
      setParkisheiroAtual(user);
      return user;
    }
    return null;
  };

  const setUsuarioAtual = (usuario: Parkisheiro) => {
    setParkisheiroAtual(usuario);
    atualizarParkisheiro(usuario.id, usuario);
  };

  const markVisited = (screen: string) => {
    const seen = parkisheiroAtualState.visitedScreens;
    if (!seen.includes(screen)) {
      atualizarParkisheiro(parkisheiroAtualState.id, { visitedScreens: [...seen, screen] });
    }
  };

  const getProximaTela = (): string => {
    const ordem = [
      'TelaDistribuirDias',
      'TelaAeroportoHotel',
      'PerfilComprasPorDiaScreen',
      'PerfilDescansoPorDiaScreen',
      'PerfilAtracoesPorDiaScreen',
      'PerfilRefeicoesScreen',
      'DiaCompleto',
    ];
    for (const tela of ordem) {
      if (!parkisheiroAtualState.visitedScreens.includes(tela)) return tela;
    }
    return 'MenuPrincipal';
  };

  const setTipoManualDoDia = (index: number, dia: DiaManual) => {
    const total = parkisheiroAtualState.totalDias || 0;
    const dias = [...(parkisheiroAtualState.diasDistribuidosManuais || Array(total).fill({}))];

    let novoIndex = index;
    if (dia.tipo === 'chegada') novoIndex = 0;
    else if (dia.tipo === 'saida') novoIndex = dias.length - 1;

    dias[novoIndex] = {
      tipo: dia.tipo || '',
      nomeParque: dia.nomeParque || '',
      horarioVoo: dia.horarioVoo,
      completo: dia.completo,
      perfilDescanso: dia.perfilDescanso,
      perfilCompras: dia.perfilCompras,
      perfilAtracoes: dia.perfilAtracoes,
    };

    atualizarParkisheiro(parkisheiroAtualState.id, { diasDistribuidosManuais: dias });
  };

  const setHorarioVoo = (tipo: 'chegada' | 'saida', valor: string) => {
    const dias = [...(parkisheiroAtualState.diasDistribuidosManuais || [])];
    const idx = tipo === 'chegada' ? 0 : dias.length - 1;
    if (idx < 0) return;

    const atual = dias[idx] || { tipo };
    dias[idx] = { ...atual, tipo: atual.tipo || tipo, horarioVoo: valor };

    const dados: Partial<Parkisheiro> = {
      diasDistribuidosManuais: dias,
      vooChegada: tipo === 'chegada'
        ? { ...parkisheiroAtualState.vooChegada, horario: valor }
        : parkisheiroAtualState.vooChegada,
      vooSaida: tipo === 'saida'
        ? { ...parkisheiroAtualState.vooSaida, horario: valor }
        : parkisheiroAtualState.vooSaida,
    };

    atualizarParkisheiro(parkisheiroAtualState.id, dados);
  };

  const setRegiaoHospedagem = (regiao: RegiaoHospedagem | null) => {
    atualizarParkisheiro(parkisheiroAtualState.id, { regiaoHospedagem: regiao });
  };

  const gerarRoteiroFinal = async () => {
    const { dataInicio, diasDistribuidosManuais = [] } = parkisheiroAtualState;
    if (!dataInicio) return;

    const base = new Date(dataInicio);
    const lista: DiaFinal[] = [];

    for (let i = 0; i < diasDistribuidosManuais.length; i++) {
      const diaManual = diasDistribuidosManuais[i];
      if (!diaManual) continue;
      const data = addDays(base, i);

      let clima;
      try {
        const climaCompleto = await buscarClima('Orlando');
        clima = climaCompleto
          ? {
              temperatura: `${climaCompleto.temp}Ã‚Â°C`,
              condicao: climaCompleto.condicao,
              icone: climaCompleto.icone,
            }
          : undefined;
      } catch (err) {
        console.warn('Erro ao buscar clima:', err);
      }

      lista.push({
        id: `dia${i + 1}`,
        data,
        tipo: diaManual.tipo,
        nomeParque: diaManual.nomeParque,
        horarioVoo: diaManual.horarioVoo,
        perfilDescanso: diaManual.perfilDescanso,
        perfilCompras: diaManual.perfilCompras,
        perfilAtracoes: diaManual.perfilAtracoes,
        clima,
      });
    }

    const atualizado = { ...parkisheiroAtualState, roteiroFinal: lista };
    setParkisheiroAtual(atualizado);
    await AsyncStorage.setItem(USUARIO_ATUAL_KEY, JSON.stringify(atualizado));
  };

  const getLocalHospedagem = () => parkisheiroAtualState.regiaoHospedagem || null;

  const salvarEscolhaTurno = (diaId: string, turno: string, atividade: string) => {
    setEscolhasPorTurno(prev => ({
      ...prev,
      [diaId]: {
        ...prev[diaId],
        [turno]: atividade,
      },
    }));
  };

  const salvarPerfil = (categoria: string, dados: any) => {
    const perfisAtualizados = {
      ...(parkisheiroAtualState.perfis || {}),
      [categoria]: dados,
    };
    atualizarParkisheiro(parkisheiroAtualState.id, { perfis: perfisAtualizados });
  };

  /** Ã¢Å“â€¦ Agora atualiza roteiroFinal e diasDistribuidosManuais */
  const atualizarPerfilDescansoPorDia = async (data: string, perfil: string) => {
    const novoRoteiro = (parkisheiroAtualState.roteiroFinal || []).map((dia) =>
      format(dia.data, 'yyyy-MM-dd') === data
        ? { ...dia, perfilDescanso: perfil }
        : dia
    );

    const novosManuais = (parkisheiroAtualState.diasDistribuidosManuais || []).map((dia, i) => {
      const dataDia = parkisheiroAtualState.dataInicio
        ? format(addDays(new Date(parkisheiroAtualState.dataInicio), i), 'yyyy-MM-dd')
        : '';
      return dataDia === data
        ? { ...dia, perfilDescanso: perfil }
        : dia;
    });

    atualizarParkisheiro(parkisheiroAtualState.id, {
      roteiroFinal: novoRoteiro,
      diasDistribuidosManuais: novosManuais,
    });
  };

  /** Ã¢Å“â€¦ Agora atualiza roteiroFinal e diasDistribuidosManuais */
  const atualizarPerfilComprasPorDia = async (data: string, perfil: string) => {
    const novoRoteiro = (parkisheiroAtualState.roteiroFinal || []).map((dia) =>
      format(dia.data, 'yyyy-MM-dd') === data
        ? { ...dia, perfilCompras: perfil }
        : dia
    );

    const novosManuais = (parkisheiroAtualState.diasDistribuidosManuais || []).map((dia, i) => {
      const dataDia = parkisheiroAtualState.dataInicio
        ? format(addDays(new Date(parkisheiroAtualState.dataInicio), i), 'yyyy-MM-dd')
        : '';
      return dataDia === data
        ? { ...dia, perfilCompras: perfil }
        : dia;
    });

    atualizarParkisheiro(parkisheiroAtualState.id, {
      roteiroFinal: novoRoteiro,
      diasDistribuidosManuais: novosManuais,
    });
  };

  const atualizarPerfilAtracoesPorDia = async (
    data: string,
    perfil: { valor: string[]; nome?: string[]; icone?: string[] }
  ) => {
    const novoRoteiro = (parkisheiroAtualState.roteiroFinal || []).map((dia) =>
      format(dia.data, 'yyyy-MM-dd') === data
        ? { ...dia, perfilAtracoes: perfil }
        : dia
    );

    const novosManuais = (parkisheiroAtualState.diasDistribuidosManuais || []).map((dia, i) => {
      const dataDia = parkisheiroAtualState.dataInicio
        ? format(addDays(new Date(parkisheiroAtualState.dataInicio), i), 'yyyy-MM-dd')
        : '';
      return dataDia === data
        ? { ...dia, perfilAtracoes: perfil }
        : dia;
    });

    atualizarParkisheiro(parkisheiroAtualState.id, {
      roteiroFinal: novoRoteiro,
      diasDistribuidosManuais: novosManuais,
    });
  };

  /** IA Ã¢â‚¬â€ aÃƒÂ§ÃƒÂµes */
  const salvarRoteiroIA = useCallback(async (r: RoteiroIATipo, prefs?: PreferenciasIA) => {
    setRoteiroIA(r);
    if (prefs) {
      setPreferenciasIA(prefs);
      await AsyncStorage.setItem(IA_PREFS, JSON.stringify(prefs));
    }
    await AsyncStorage.setItem(IA_ROTEIRO, JSON.stringify(r));
  }, []);

  const carregarUltimaBuscaIA = useCallback(async () => {
    const [p, r] = await AsyncStorage.multiGet([IA_PREFS, IA_ROTEIRO]);
    const pref = p?.[1] ? (JSON.parse(p[1]!) as PreferenciasIA) : null;
    const rot = r?.[1] ? (JSON.parse(r[1]!) as RoteiroIATipo) : null;
    setPreferenciasIA(pref);
    setRoteiroIA(rot);
  }, []);

  const limparRoteiroIA = useCallback(async () => {
    setPreferenciasIA(null);
    setRoteiroIA(null);
    await AsyncStorage.multiRemove([IA_PREFS, IA_ROTEIRO]);
  }, []);

  /** Limpeza geral (mantida sua lÃƒÂ³gica) */
  const limparRoteiroFinal = async () => {
    const atualizado = {
      ...parkisheiroAtualState,
      diasDistribuidos: undefined,
      diasDistribuidosManuais: [],
      roteiroFinal: [],
      perfis: {},
      vooChegada: undefined,
      vooSaida: undefined,
      visitedScreens: [],
    };
    setParkisheiroAtual(atualizado);
    await AsyncStorage.setItem(USUARIO_ATUAL_KEY, JSON.stringify(atualizado));
  };

  /** Value memoizado */
  const value = useMemo<ParkisheiroContextType>(() => ({
    parkisheiros,
    parkisheiroAtual: parkisheiroAtualState,
    regiaoHospedagem: parkisheiroAtualState.regiaoHospedagem ?? null,
    escolhasPorTurno,

    adicionarParkisheiro,
    atualizarParkisheiro,
    loginParkisheiro,
    setUsuarioAtual,

    setTipoManualDoDia,
    gerarRoteiroFinal,
    setHorarioVoo,

    setRegiaoHospedagem,
    getLocalHospedagem,
    salvarEscolhaTurno,
    markVisited,
    getProximaTela,

    salvarPerfil,
    atualizarPerfilDescansoPorDia,
    atualizarPerfilComprasPorDia,
    atualizarPerfilAtracoesPorDia,

    // IA
    preferenciasIA,
    roteiroIA,
    salvarRoteiroIA,
    carregarUltimaBuscaIA,
    limparRoteiroIA,

    // Limpeza geral
    limparRoteiroFinal,
  }), [
    parkisheiros,
    parkisheiroAtualState,
    escolhasPorTurno,
    preferenciasIA,
    roteiroIA,
  ]);

  return (
    <ParkisheiroContext.Provider value={value}>
      {children}
    </ParkisheiroContext.Provider>
  );
};
