ï»¿import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';
import { jantaresDisney } from './JantarDisney';

// FunÃƒÂ§ÃƒÂ£o de comparaÃƒÂ§ÃƒÂ£o que aceita tipo string, array ou string separada por vÃƒÂ­rgula (case insensitive)
function tipoInclui(tipo: string | string[], perfil: string) {
  if (!tipo) return false;
  if (Array.isArray(tipo)) {
    return tipo.map(t => t.toLowerCase().trim()).includes(perfil.toLowerCase().trim());
  }
  return tipo.toLowerCase().split(',').map(s => s.trim()).includes(perfil.toLowerCase().trim());
}

export const gerarDisneyJantar = (
  parkisheiro: Parkisheiro,
  regiao?: string,
  latitude?: number,
  longitude?: number
): AtividadeDia[] => {
  const atividades: AtividadeDia[] = [];

  const perfilSelecionado = parkisheiro.perfis?.refeicoes?.perfil;
  if (!perfilSelecionado) {
    atividades.push({
      titulo: 'Ã°Å¸ÂÂ½Ã¯Â¸Â Jantar',
      descricao: 'Nenhum perfil de refeiÃƒÂ§ÃƒÂ£o selecionado.',
      horarioSugerido: '19:00',
      tipo: 'jantar',
    });
    return atividades;
  }

  // 1Ã¯Â¸ÂÃ¢Æ’Â£ Busca por coordenadas
  if (latitude != null && longitude != null) {
    const jantarMaisProximo = jantaresDisney
      .filter(j => tipoInclui(j.tipo, perfilSelecionado))
      .sort((a, b) => {
        const distA = Math.pow(latitude - a.latitude, 2) + Math.pow(longitude - a.longitude, 2);
        const distB = Math.pow(latitude - b.latitude, 2) + Math.pow(longitude - b.longitude, 2);
        return distA - distB;
      })[0];

    if (jantarMaisProximo) {
      atividades.push(formatarJantarDisney(jantarMaisProximo));
      return atividades;
    }
  }

  // 2Ã¯Â¸ÂÃ¢Æ’Â£ Busca por nome da regiÃƒÂ£o
  const nomeRegiao = regiao ?? parkisheiro.regiaoHospedagem?.nome;
  if (nomeRegiao) {
    const nomeRegiaoNorm = nomeRegiao.trim().toLowerCase();
    const jantarRegiao = jantaresDisney.find(
      j => tipoInclui(j.tipo, perfilSelecionado) && j.regiao.trim().toLowerCase() === nomeRegiaoNorm
    );
    if (jantarRegiao) {
      atividades.push(formatarJantarDisney(jantarRegiao));
      return atividades;
    }
  }

  // 3Ã¯Â¸ÂÃ¢Æ’Â£ Busca por qualquer jantar com o tipo
  const jantarQualquer = jantaresDisney.find(j => tipoInclui(j.tipo, perfilSelecionado));
  if (jantarQualquer) {
    atividades.push(formatarJantarDisney(jantarQualquer));
    return atividades;
  }

  // 4Ã¯Â¸ÂÃ¢Æ’Â£ Nada encontrado
  atividades.push({
    titulo: 'Ã°Å¸ÂÂ½Ã¯Â¸Â Jantar',
    descricao: 'Nenhuma sugestÃƒÂ£o encontrada com seu perfil nesta regiÃƒÂ£o.',
    horarioSugerido: '19:00',
    tipo: 'jantar',
  });

  return atividades;
};

// Ã°Å¸â€Â§ FunÃƒÂ§ÃƒÂ£o auxiliar
function formatarJantarDisney(jantar: any): AtividadeDia {
  return {
    titulo: `Ã°Å¸ÂÂ½Ã¯Â¸Â ${jantar.nome} Ã¢â‚¬â€œ Jantar`,
    descricao:
      `Tipo: ${Array.isArray(jantar.tipo) ? jantar.tipo.join(', ') : jantar.tipo}\n` +
      `PreÃƒÂ§o mÃƒÂ©dio: $${jantar.precoMedio}` +
      (jantar.acesso ? `\nAcesso: ${jantar.acesso}` : '') +
      (jantar.destaque ? `\nDestaque: ${jantar.destaque}` : ''),
    horarioSugerido: '19:00',
    tipo: 'jantar',
    regiao: jantar.regiao,
    acesso: jantar.acesso,
    destaque: jantar.destaque,
    latitude: jantar.latitude,
    longitude: jantar.longitude,
    precoMedio: jantar.precoMedio,
  };
}
