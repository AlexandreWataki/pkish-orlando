ï»¿import { jantaresProximos } from './jantaresProximos';
import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';

export const gerarRefeicaoJantar = (
  parkisheiro: Parkisheiro,
  regiao?: string,
  latitude?: number,
  longitude?: number
): AtividadeDia[] => {
  const atividades: AtividadeDia[] = [];
  const perfilSelecionado = parkisheiro.perfis?.refeicoes?.perfil;

  if (!perfilSelecionado) {
    atividades.push({
      titulo: "Ã°Å¸ÂÂ Jantar",
      descricao: "Nenhum perfil de refeiÃƒÂ§ÃƒÂ£o selecionado.",
      horarioSugerido: '19:00',
      tipo: 'refeicao',
    });
    return atividades;
  }

  // Ã°Å¸Å¸Â¡ PRIORIDADE 1: buscar por coordenadas
  if (latitude != null && longitude != null) {
    const jantarMaisProximo = jantaresProximos
      .filter((r) => r.tipo === perfilSelecionado)
      .sort((a, b) => {
        const distA = Math.pow(latitude - a.latitude, 2) + Math.pow(longitude - a.longitude, 2);
        const distB = Math.pow(latitude - b.latitude, 2) + Math.pow(longitude - b.longitude, 2);
        return distA - distB;
      })[0];

    if (jantarMaisProximo) {
      atividades.push(formatarJantar(jantarMaisProximo));
      return atividades;
    }
  }

  // Ã°Å¸Å¸Â¡ PRIORIDADE 2: buscar por nome de regiÃƒÂ£o (normalizado)
  const nomeRegiao = regiao ?? parkisheiro.regiaoHospedagem?.nome;
  if (nomeRegiao) {
    const nomeRegiaoNorm = nomeRegiao.trim().toLowerCase();
    const jantarRegiao = jantaresProximos.find(
      (r) => r.tipo === perfilSelecionado &&
             r.regiao.trim().toLowerCase() === nomeRegiaoNorm
    );

    if (jantarRegiao) {
      atividades.push(formatarJantar(jantarRegiao));
      return atividades;
    }
  }

  // Ã°Å¸Å¸Â¡ PRIORIDADE 3: qualquer jantar com o perfil
  const jantarQualquer = jantaresProximos.find(r => r.tipo === perfilSelecionado);
  if (jantarQualquer) {
    atividades.push(formatarJantar(jantarQualquer));
    return atividades;
  }

  // Ã°Å¸Å¸Â¥ NENHUM encontrado
  atividades.push({
    titulo: "Ã°Å¸ÂÂ Jantar",
    descricao: "Nenhum local de jantar encontrado para o perfil selecionado nesta regiÃƒÂ£o.",
    horarioSugerido: '19:00',
    tipo: 'refeicao',
  });

  return atividades;
};

// Ã°Å¸â€Â§ funÃƒÂ§ÃƒÂ£o auxiliar para formatar o card
function formatarJantar(jantar: any): AtividadeDia {
  return {
    titulo: `Ã°Å¸ÂÂ ${jantar.nome}`,
    descricao:
      `Tipo: ${jantar.tipo}\n` +
      `PreÃƒÂ§o mÃƒÂ©dio: $${jantar.precoMedio}` +
      (jantar.acesso ? `\nAcesso: ${jantar.acesso} (da regiÃƒÂ£o ${jantar.regiao})` : '') +
      (jantar.destaque ? `\nDestaque: ${jantar.destaque}` : ''),
    horarioSugerido: '19:00',
    tipo: 'refeicao',
    regiao: jantar.regiao,
    acesso: jantar.acesso,
    destaque: jantar.destaque,
    latitude: jantar.latitude,
    longitude: jantar.longitude,
    precoMedio: jantar.precoMedio,
  };
}
