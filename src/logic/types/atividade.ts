export interface AtividadeDia {
  id?: string;
  titulo: string;
  subtitulo?: string;
  descricao?: string;
  tipo?: 
    'informativa' 
    | 'jantar' 
    | 'almoco' 
    | 'cafe' 
    | 'atracao' 
    | 'disney' 
    | 'universal' 
    | 'descanso' 
    | 'compras' 
    | 'refeicao' 
    | 'atividade' 
    | 'regiao' 
    | 'area'
    | 'transporte'; // âœ… ADICIONADO AQUI

  local?: string;
  selecionavel?: boolean;
  escolhida?: boolean;
  tempoEstimado?: number;
  horarioSugerido?: string;
  preco?: string;
  regiao?: string;
  area?: string; // âœ… Adicionado aqui
  perfil?: string;
  imagem?: string;
  latitude?: number;
  longitude?: number;
  experiencias?: string[];

  // Detalhes extras
  acesso?: string;
  destaque?: string;
  precoMedio?: number;

  // Atributos especÃ­ficos para atraÃ§Ãµes
  alturaMinima?: number;
  tempoMedioFila?: number;
  filaAceitavel?: number;
  idadeRecomendada?: string;

  filtros?: {
    tipo?: string;
    regiao?: string;
    area?: string;
    filaAceitavel?: string;
  };

  // âœ… Novos campos para transporte
  origem?: string;
  destino?: string;
  icone?: string;
  precoEstimado?: number;
}
