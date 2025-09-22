ï»¿import { almocosProximos } from './almocosProximos';
import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';

export const gerarRefeicaoAlmoco = (
  parkisheiro: Parkisheiro,
  regiao?: string,
  latitude?: number,
  longitude?: number
): AtividadeDia[] => {
  const atividades: AtividadeDia[] = [];
  const perfilSelecionado = parkisheiro.perfis?.refeicoes?.perfil;

  if (!perfilSelecionado) {
    atividades.push({
      titulo: "Ã°Å¸ÂÂ½Ã¯Â¸Â AlmoÃƒÂ§o",
      descricao: "Nenhum perfil de refeiÃƒÂ§ÃƒÂ£o selecionado.",
      horarioSugerido: '12:00',
      tipo: 'refeicao',
    });
    return atividades;
  }

  // Ã°Å¸Å¸Â¡ PRIORIDADE 1: buscar por coordenadas
  if (latitude != null && longitude != null) {
    const almocoMaisProximo = almocosProximos
      .filter((r) => r.tipo === perfilSelecionado)
      .sort((a, b) => {
        const distA = Math.pow(latitude - a.latitude, 2) + Math.pow(longitude - a.longitude, 2);
        const distB = Math.pow(latitude - b.latitude, 2) + Math.pow(longitude - b.longitude, 2);
        return distA - distB;
      })[0];

    if (almocoMaisProximo) {
      atividades.push(formatarAlmoco(almocoMaisProximo));
      return atividades;
    }
  }

  // Ã°Å¸Å¸Â¡ PRIORIDADE 2: buscar por nome de regiÃƒÂ£o (normalizado)
  const nomeRegiao = regiao ?? parkisheiro.regiaoHospedagem?.nome;
  if (nomeRegiao) {
    const nomeRegiaoNorm = nomeRegiao.trim().toLowerCase();
    const almocoRegiao = almocosProximos.find(
      (r) => r.tipo === perfilSelecionado &&
             r.regiao.trim().toLowerCase() === nomeRegiaoNorm
    );

    if (almocoRegiao) {
      atividades.push(formatarAlmoco(almocoRegiao));
      return atividades;
    }
  }

  // Ã°Å¸Å¸Â¡ PRIORIDADE 3: pegar qualquer almoÃƒÂ§o com o perfil
  const almocoFallback = almocosProximos.find(r => r.tipo === perfilSelecionado);
  if (almocoFallback) {
    atividades.push(formatarAlmoco(almocoFallback));
    return atividades;
  }

  // Ã°Å¸Å¸Â¥ NENHUM encontrado
  atividades.push({
    titulo: "Ã°Å¸ÂÂ½Ã¯Â¸Â AlmoÃƒÂ§o",
    descricao: "Nenhum local de almoÃƒÂ§o encontrado para o perfil selecionado.",
    horarioSugerido: '12:00',
    tipo: 'refeicao',
  });

  return atividades;
};

// Ã°Å¸â€Â§ funÃƒÂ§ÃƒÂ£o auxiliar
function formatarAlmoco(almoco: any): AtividadeDia {
  return {
    titulo: `Ã°Å¸ÂÂ½Ã¯Â¸Â ${almoco.nome}`,
    descricao:
      `Tipo: ${almoco.tipo}\n` +
      `PreÃƒÂ§o mÃƒÂ©dio: $${almoco.precoMedio}` +
      (almoco.acesso ? `\nAcesso: ${almoco.acesso} (da regiÃƒÂ£o ${almoco.regiao})` : '') +
      (almoco.destaque ? `\nDestaque: ${almoco.destaque}` : ''),
    horarioSugerido: '12:00',
    tipo: 'refeicao',
    regiao: almoco.regiao,
    acesso: almoco.acesso,
    destaque: almoco.destaque,
    latitude: almoco.latitude,
    longitude: almoco.longitude,
    precoMedio: almoco.precoMedio,
  };
}
