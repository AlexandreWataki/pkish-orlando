ï»¿import { TurnoDia } from './turno';

export interface Dia {
  id: string; // <- Identificador ÃƒÂºnico para cada dia
  numero: number;
  data?: string;
  tipo: string;

  cabecalho: {
    titulo: string;
    subtitulo?: string; // <--- Adicionado subtÃƒÂ­tulo opcional
    imagem: string;
    clima: {
      temperatura: number;
      condicao: string;
      icone: string;
    };
  };

  objetivo: string;

  /**
   * Turnos do dia com tÃƒÂ­tulo e atividades.
   * Se precisar usar horÃƒÂ¡rio (como nos geradores com TurnoComHorario),
   * converta antes de retornar: { titulo, atividades } apenas.
   */
  turnos: TurnoDia[];

  dicas?: string[];

  hotel?: {
    nome: string;
    endereco: string;
  };

  regiao?: {
    nome: string;
    descricao: string;
  };

  extras?: {
    documentos?: {
      titulo: string;
      itens: string[];
      dicas?: string[];
    };
    voo?: {
      titulo: string;
      itens: string[];
      dicas?: string[];
    };
    checklist?: {
      titulo: string;
      itens: string[];
      dicas?: string[];
    };
    dicasAeroporto?: {
      titulo: string;
      itens: string[];
      dicas?: string[];
    };
  };
}
