import { cafesProximos } from './cafesProximos';
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
      titulo: "☕ Café da manhã",
      descricao: "Nenhum perfil de refeição selecionado.",
      horarioSugerido: '07:00',
      tipo: 'refeicao',
    });
    return atividades;
  }

  // 🟡 PRIORIDADE 1: buscar por coordenadas
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

  // 🟡 PRIORIDADE 2: buscar por nome de região (normalizado)
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

  // 🟡 PRIORIDADE 3: pegar qualquer café com o perfil
  const cafeQualquer = cafesProximos.find((r) => r.tipo === perfilSelecionado);
  if (cafeQualquer) {
    atividades.push(formatarCafe(cafeQualquer));
    return atividades;
  }

  // 🟥 NENHUM encontrado
  atividades.push({
    titulo: "☕ Café da manhã",
    descricao: "Nenhuma sugestão de café da manhã encontrada para seu perfil nesta região.",
    horarioSugerido: '07:00',
    tipo: 'refeicao',
  });

  return atividades;
};

// 🔧 função auxiliar para formatar um card
function formatarCafe(cafe: any): AtividadeDia {
  return {
    titulo: `☕ ${cafe.nome}`,
    descricao:
      `Tipo: ${cafe.tipo}\n` +
      `Preço médio: $${cafe.precoMedio}` +
      (cafe.acesso ? `\nAcesso: ${cafe.acesso} (da região ${cafe.regiao})` : '') +
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
