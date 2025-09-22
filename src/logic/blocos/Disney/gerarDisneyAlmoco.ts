ï»¿import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';
import { almocosDisney } from './AlmocoDisney';

// FunÃƒÂ§ÃƒÂ£o de comparaÃƒÂ§ÃƒÂ£o que aceita tipo string ou array (case insensitive)
function tipoInclui(tipo: string | string[], perfil: string) {
  if (!tipo) return false;
  if (Array.isArray(tipo)) {
    return tipo.map(t => t.toLowerCase().trim()).includes(perfil.toLowerCase().trim());
  }
  return tipo.toLowerCase().trim() === perfil.toLowerCase().trim();
}

export const gerarDisneyAlmoco = (
  parkisheiro: Parkisheiro,
  regiao?: string,
  latitude?: number,
  longitude?: number
): AtividadeDia[] => {
  const atividades: AtividadeDia[] = [];

  const perfilSelecionado = parkisheiro.perfis?.refeicoes?.perfil;
  if (!perfilSelecionado) {
    atividades.push({
      titulo: 'Ã°Å¸ÂÂ½Ã¯Â¸Â AlmoÃƒÂ§o',
      descricao: 'Nenhum perfil de refeiÃƒÂ§ÃƒÂ£o selecionado.',
      horarioSugerido: '12:00',
      tipo: 'almoco',
    });
    return atividades;
  }

  // 1Ã¯Â¸ÂÃ¢Æ’Â£ Busca por coordenadas
  if (latitude != null && longitude != null) {
    const almocoMaisProximo = almocosDisney
      .filter(a => tipoInclui(a.tipo, perfilSelecionado))
      .sort((a, b) => {
        const distA = Math.pow(latitude - a.latitude, 2) + Math.pow(longitude - a.longitude, 2);
        const distB = Math.pow(latitude - b.latitude, 2) + Math.pow(longitude - b.longitude, 2);
        return distA - distB;
      })[0];

    if (almocoMaisProximo) {
      atividades.push(formatarAlmocoDisney(almocoMaisProximo));
      return atividades;
    }
  }

  // 2Ã¯Â¸ÂÃ¢Æ’Â£ Busca por nome da regiÃƒÂ£o
  const nomeRegiao = regiao ?? parkisheiro.regiaoHospedagem?.nome;
  if (nomeRegiao) {
    const nomeRegiaoNorm = nomeRegiao.trim().toLowerCase();
    const almocoRegiao = almocosDisney.find(
      a => tipoInclui(a.tipo, perfilSelecionado) && a.regiao.trim().toLowerCase() === nomeRegiaoNorm
    );
    if (almocoRegiao) {
      atividades.push(formatarAlmocoDisney(almocoRegiao));
      return atividades;
    }
  }

  // 3Ã¯Â¸ÂÃ¢Æ’Â£ Busca por qualquer almoÃƒÂ§o com o tipo
  const almocoQualquer = almocosDisney.find(a => tipoInclui(a.tipo, perfilSelecionado));
  if (almocoQualquer) {
    atividades.push(formatarAlmocoDisney(almocoQualquer));
    return atividades;
  }

  // 4Ã¯Â¸ÂÃ¢Æ’Â£ Nada encontrado
  atividades.push({
    titulo: 'Ã°Å¸ÂÂ½Ã¯Â¸Â AlmoÃƒÂ§o',
    descricao: 'Nenhuma sugestÃƒÂ£o encontrada com seu perfil nesta regiÃƒÂ£o.',
    horarioSugerido: '12:00',
    tipo: 'almoco',
  });

  return atividades;
};

// Ã°Å¸â€Â§ FunÃƒÂ§ÃƒÂ£o auxiliar
function formatarAlmocoDisney(almoco: any): AtividadeDia {
  return {
    titulo: `Ã°Å¸ÂÂ½Ã¯Â¸Â ${almoco.nome} Ã¢â‚¬â€œ AlmoÃƒÂ§o`,
    descricao:
      `Tipo: ${Array.isArray(almoco.tipo) ? almoco.tipo.join(', ') : almoco.tipo}\n` +
      `PreÃƒÂ§o mÃƒÂ©dio: $${almoco.precoMedio}` +
      (almoco.acesso ? `\nAcesso: ${almoco.acesso}` : '') +
      (almoco.destaque ? `\nDestaque: ${almoco.destaque}` : ''),
    horarioSugerido: '12:00',
    tipo: 'almoco',
    regiao: almoco.regiao,
    acesso: almoco.acesso,
    destaque: almoco.destaque,
    latitude: almoco.latitude,
    longitude: almoco.longitude,
    precoMedio: almoco.precoMedio,
  };
}
