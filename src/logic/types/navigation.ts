// src/types/navigation.ts
import type { RouteProp } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { DiaGerado } from '@/IA/gerarComIA';

/**
 * Lista de rotas da Stack
 * - Mantém rotas antigas e novas para compatibilidade.
 * - IAResultado aceita undefined OU params (array/string), como seu IAResultadoScreen já trata.
 */
export type RootStackParamList = {
  /** Autenticação e início */
  Splash: undefined;
  Inicio: undefined;
  Login: undefined;
  Cadastro: undefined;

  /** Telas principais */
  MenuPrincipal: undefined;
  MonteSeuRoteiro: undefined; // opcional (alias)

  /** Configuração da viagem (novas e antigas) */
  ConfigViagem: undefined;            // novo
  Calendario: undefined;              // antigo: TelaDefinirQuantidadeDias
  DefinirTiposDias: undefined;        // novo
  TiposdeDias: undefined;             // antigo: TelaDefinirTiposDias
  DistribuirDias: undefined;          // novo
  DistribuicaodeDias: undefined;      // antigo
  'Aeroporto&Hotel': undefined;       // compatibilidade

  /** Perfis (novos e antigos) */
  PerfilDescanso: undefined;                 // novo
  PerfilCompras: undefined;                  // novo
  PerfilAtracoes: undefined;                 // já existia
  PerfilRefeicoes: undefined;                // já existia
  PerfilDescansoPorDiaScreen: undefined;     // antigo
  PerfilComprasPorDiaScreen: undefined;      // antigo

  /** Detalhe do dia */
  DiaCompleto: { diaId?: string } | undefined;

  /** IA — geração e visualização */
  IAventureSe: undefined;

  // ✅ Tolerante: pode vir sem params (contexto) OU com params (array/string/alternativos)
  IAResultado:
    | undefined
    | { roteiroGerado?: DiaGerado[] | string; usarIAParaTurnos?: boolean }
    | Record<string, any>; // ex.: { roteiro: [...]} | { dias: [...]} | { resultadoIA: ... }

  /** Aliases/novos nomes equivalentes */
  TelaGerarRoteiro: undefined;
  TelaResumoRoteiro: undefined;

  /** Lista de dias do roteiro */
  DiasViagem: undefined;

  /** Config */
  ConfiguracoesAPIKey: undefined;
};

/* ===================== Helpers de Tipagem ===================== */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type RootRouteProp<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>;

export type RootNavigation = NativeStackNavigationProp<RootStackParamList>;

/** Augment do React Navigation para autocomplete global */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
