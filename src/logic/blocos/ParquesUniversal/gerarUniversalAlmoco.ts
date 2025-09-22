import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';
import { almocosUniversal } from './AlmocoUniversal';

// FunÃ§Ã£o de comparaÃ§Ã£o que aceita tipo string, array ou string separada por vÃ­rgula (case insensitive)
function tipoInclui(tipo: string | string[], perfil: string) {
  if (!tipo) return false;
  if (Array.isArray(tipo)) {
    return tipo.map(t => t.toLowerCase().trim()).includes(perfil.toLowerCase().trim());
  }
  return tipo
    .toLowerCase()
    .split(',')
    .map(t => t.trim())
    .includes(perfil.toLowerCase().trim());
}

export const gerarUniversalAlmoco = (
  parkisheiro: Parkisheiro,
  regiao?: string,
  latitude?: number,
  longitude?: number
): AtividadeDia[] => {
  const atividades: AtividadeDia[] = [];

  const perfilSelecionado = parkisheiro.perfis?.refeicoes?.perfil;
  if (!perfilSelecionado) {
    atividades.push({
      titulo: 'ðŸ½ï¸ AlmoÃ§o',
      descricao: 'Nenhum perfil de refeiÃ§Ã£o selecionado.',
      horarioSugerido: '12:00',
      tipo: 'almoco',
    });
    return atividades;
  }

  // 1ï¸âƒ£ Busca por coordenadas
  if (latitude != null && longitude != null) {
    const almocoMaisProximo = almocosUniversal
      .filter(a => tipoInclui(a.tipo, perfilSelecionado))
      .sort((a, b) => {
        const distA = Math.pow(latitude - a.latitude, 2) + Math.pow(longitude - a.longitude, 2);
        const distB = Math.pow(latitude - b.latitude, 2) + Math.pow(longitude - b.longitude, 2);
        return distA - distB;
      })[0];

    if (almocoMaisProximo) {
      atividades.push(formatarAlmocoUniversal(almocoMaisProximo));
      return atividades;
    }
  }

  // 2ï¸âƒ£ Busca por nome da regiÃ£o
  const nomeRegiao = regiao ?? parkisheiro.regiaoHospedagem?.nome;
  if (nomeRegiao) {
    const nomeRegiaoNorm = nomeRegiao.trim().toLowerCase();
    const almocoRegiao = almocosUniversal.find(
      a => tipoInclui(a.tipo, perfilSelecionado) && a.regiao.trim().toLowerCase() === nomeRegiaoNorm
    );
    if (almocoRegiao) {
      atividades.push(formatarAlmocoUniversal(almocoRegiao));
      return atividades;
    }
  }

  // 3ï¸âƒ£ Busca por qualquer almoÃ§o com o tipo
  const almocoQualquer = almocosUniversal.find(a => tipoInclui(a.tipo, perfilSelecionado));
  if (almocoQualquer) {
    atividades.push(formatarAlmocoUniversal(almocoQualquer));
    return atividades;
  }

  // 4ï¸âƒ£ Nada encontrado
  atividades.push({
    titulo: 'ðŸ½ï¸ AlmoÃ§o',
    descricao: 'Nenhuma sugestÃ£o encontrada com seu perfil nesta regiÃ£o.',
    horarioSugerido: '12:00',
    tipo: 'almoco',
  });

  return atividades;
};

// ðŸ”§ FunÃ§Ã£o auxiliar
function formatarAlmocoUniversal(almoco: any): AtividadeDia {
  return {
    titulo: `ðŸ½ï¸ ${almoco.nome} â€“ AlmoÃ§o`,
    descricao:
      `Tipo: ${Array.isArray(almoco.tipo) ? almoco.tipo.join(', ') : almoco.tipo}\n` +
      `PreÃ§o mÃ©dio: $${almoco.precoMedio}` +
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
