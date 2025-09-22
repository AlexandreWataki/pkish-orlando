import { Regiao } from './regioesHospedagem';
import { EstiloRefeicao } from './perfilRefeicao';

export type DiasDistribuidos = {
  chegada: number;
  saida: number;
  disney: number;
  universal: number;
  compras: number;
  descanso: number;
};

export type DiaManual = {
  tipo: string;
  nomeParque?: string;
  horarioVoo?: string;
  completo?: boolean;
  perfilDescanso?: string;
  perfilCompras?: string;
};

export type DiaFinal = {
  id: string;
  data: Date;
  tipo: string;
  nomeParque?: string;
  horarioVoo?: string;
  perfilDescanso?: string;
  perfilCompras?: string;
  perfilAtracoes?: {
    valor: string;
    nome?: string;
    icone?: string;
  };
};

export type VooChegada = {
  aeroporto?: string;
  horario?: string;       // manha, tarde, noite, madrugada
  horarioHora?: string;   // ex: "14:45"
};

export type VooSaida = {
  aeroporto?: string;
  horario?: string;
  horarioHora?: string;
};

export type PerfilCompras = {
  perfil: string;
  [chave: string]: any;
};

export type Parkisheiro = {
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

  regiaoHospedagem?: Regiao | null;

  vooChegada?: VooChegada;
  vooSaida?: VooSaida;

  perfilRefeicao?: EstiloRefeicao;

  perfis?: {
    refeicoes?: {
      perfil: string;
      [chave: string]: any;
    };
    descanso?: {
      perfil: string;
      [chave: string]: any;
    };
    compras?: PerfilCompras;
    viagem?: {
      perfil: string;
      [chave: string]: any;
    };
    atracoes?: {
      perfil: string;
      [chave: string]: any;
    };
    [categoria: string]: any;
  };

  visitedScreens: string[];
};
