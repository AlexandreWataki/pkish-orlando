ï»¿import { cafesProximos } from './cafesProximos';
import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';

export const gerarRefeicaoCafe = (
  parkisheiro: Parkisheiro,
  regiao?: string,
  latitude?: number,
  longitude?: number
): AtividadeDia[] => {
  const atividades: AtividadeDia[] = [];

  const perfilSelecionado = parkisheiro.perfis?.refeicoes?.perfil;

  if (!perfilSelecionado) {
    atividades.push({
      titulo: "Ã¢Ëœâ€¢ CafÃƒÂ© da manhÃƒÂ£",
      descricao: "Nenhum perfil de refeiÃƒÂ§ÃƒÂ£o selecionado.",
      horarioSugerido: '07:00',
      tipo: 'refeicao',
    });
    return atividades;
  }

  // Ã°Å¸Å¸Â¡ PRIORIDADE 1: buscar por coordenadas
  if (latitude != null && longitude != null) {
    const cafeMaisProximo = cafesProximos
      .filter((c) => c.tipo === perfilSelecionado)
      .sort((a, b) => {
        const distA = Math.pow(latitude - a.latitude, 2) + Math.pow(longitude - a.longitude, 2);
        const distB = Math.pow(latitude - b.latitude, 2) + Math.pow(longitude - b.longitude, 2);
        return distA - distB;
      })[0];

    if (cafeMaisProximo) {
      atividades.push(formatarCafe(cafeMaisProximo));
      return atividades;
    }
  }

  // Ã°Å¸Å¸Â¡ PRIORIDADE 2: buscar por nome de regiÃƒÂ£o (normalizado)
  const nomeRegiao = regiao ?? parkisheiro.regiaoHospedagem?.nome;
  if (nomeRegiao) {
    const nomeRegiaoNorm = nomeRegiao.trim().toLowerCase();
    const cafeRegiao = cafesProximos.find(
      (r) => r.tipo === perfilSelecionado && r.regiao.trim().toLowerCase() === nomeRegiaoNorm
    );

    if (cafeRegiao) {
      atividades.push(formatarCafe(cafeRegiao));
      return atividades;
    }
  }

  // Ã°Å¸Å¸Â¡ PRIORIDADE 3: pegar qualquer cafÃƒÂ© com o perfil
  const cafeQualquer = cafesProximos.find((r) => r.tipo === perfilSelecionado);
  if (cafeQualquer) {
    atividades.push(formatarCafe(cafeQualquer));
    return atividades;
  }

  // Ã°Å¸Å¸Â¥ NENHUM encontrado
  atividades.push({
    titulo: "Ã¢Ëœâ€¢ CafÃƒÂ© da manhÃƒÂ£",
    descricao: "Nenhuma sugestÃƒÂ£o de cafÃƒÂ© da manhÃƒÂ£ encontrada para seu perfil nesta regiÃƒÂ£o.",
    horarioSugerido: '07:00',
    tipo: 'refeicao',
  });

  return atividades;
};

// Ã°Å¸â€Â§ funÃƒÂ§ÃƒÂ£o auxiliar para formatar um card
function formatarCafe(cafe: any): AtividadeDia {
  return {
    titulo: `Ã¢Ëœâ€¢ ${cafe.nome}`,
    descricao:
      `Tipo: ${cafe.tipo}\n` +
      `PreÃƒÂ§o mÃƒÂ©dio: $${cafe.precoMedio}` +
      (cafe.acesso ? `\nAcesso: ${cafe.acesso} (da regiÃƒÂ£o ${cafe.regiao})` : '') +
      (cafe.destaque ? `\nDestaque: ${cafe.destaque}` : ''),
    horarioSugerido: '07:00',
    tipo: 'refeicao',
    regiao: cafe.regiao,
    acesso: cafe.acesso,
    destaque: cafe.destaque,
    latitude: cafe.latitude,
    longitude: cafe.longitude,
    precoMedio: cafe.precoMedio,
  };
}
