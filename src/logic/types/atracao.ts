export type AtracaoParque = {
  id: string;
  titulo: string;
  subtitulo: string;
  tipo: string;
  tipoPerfil: string[];
  alturaMinima: number;
  filaExpress: boolean;
  tempoMedioFila: number;
  filaAceitavel: number;
  idadeRecomendada: string;
  atracaoSemFila: boolean;
  turnoRecomendado: 'manha' | 'tarde' | 'noite';
  descricao: string;
  icone: string;
  imagem: string;
  regiao: string;
  parque: string;
  area?: string; // opcional, mas pode ser preenchida como regiao
  latitude: number;
  longitude: number;
};

export function gerarAtividadeDaAtracao(atracao: any) {
  return {
    id: atracao.id,
    titulo: `${atracao.icone} ${atracao.titulo}`,
    descricao: atracao.descricao,
    local: atracao.regiao,
    tipo: 'disney',
    imagem: atracao.imagem,
    alturaMinima: atracao.alturaMinima,
    atracaoSemFila: atracao.atracaoSemFila ?? atracao.AtracaoSemFila ?? atracao.semFila ?? false,
    turnoRecomendado: atracao.turnoRecomendado,
    parque: atracao.parque,
    regiao: atracao.regiao,
    area: atracao.area ?? atracao.regiao,
    filaAceitavel: atracao.filaAceitavel,
    latitude: atracao.latitude ?? 0,
    longitude: atracao.longitude ?? 0,
  };
}
