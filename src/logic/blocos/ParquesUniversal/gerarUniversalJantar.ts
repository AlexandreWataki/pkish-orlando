import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';
import { jantaresUniversal } from './JantarUniversal'; // Importa opÃ§Ãµes de jantar da Universal

// Mapeia o nome do parque para a regiÃ£o de fogos correspondente
const mapaShowParaJantar: Record<string, string> = {
  'universal studios florida': 'FogosUniversalStudios',
  'islands of adventure': 'FogosIslandsOfAdventure',
  "universal's epic universe": 'FogosEpicoUniverse',
};

// FunÃ§Ã£o de comparaÃ§Ã£o que aceita tipo string, array ou string separada por vÃ­rgula (case insensitive)
function tipoInclui(tipo: string | string[], perfil: string) {
  if (!tipo) return false;
  if (Array.isArray(tipo)) {
    return tipo.map(t => t.toLowerCase().trim()).includes(perfil.toLowerCase().trim());
  }
  return tipo
    .toLowerCase()
    .split(',')
    .map(s => s.trim())
    .includes(perfil.toLowerCase().trim());
}

export const gerarUniversalJantar = (
  parkisheiro: Parkisheiro,
  regiao?: string,
  latitude?: number,
  longitude?: number
): AtividadeDia[] => {
  const atividades: AtividadeDia[] = [];

  const perfilSelecionado = parkisheiro.perfis?.refeicoes?.perfil;
  if (!perfilSelecionado) {
    atividades.push({
      titulo: 'ðŸ½ï¸ Jantar',
      descricao: 'Nenhum perfil de refeiÃ§Ã£o selecionado.',
      horarioSugerido: '19:00',
      tipo: 'jantar',
    });
    return atividades;
  }

  // ðŸ”¹ Converte regiao para a regiÃ£o de show (Fogos...), se for um parque da Universal
  let regiaoNormalizada = '';
  if (regiao) {
    const regiaoLower = regiao.toLowerCase().trim();
    regiaoNormalizada = mapaShowParaJantar[regiaoLower] || regiao;
  }

  // 1ï¸âƒ£ Busca por coordenadas (se latitude e longitude forem fornecidas)
  if (latitude != null && longitude != null) {
    const jantarMaisProximo = jantaresUniversal
      .filter(j =>
        tipoInclui(j.tipo, perfilSelecionado) &&
        (!regiaoNormalizada || j.regiao.toLowerCase() === regiaoNormalizada.toLowerCase())
      )
      .sort((a, b) => {
        const distA = Math.pow(latitude - a.latitude, 2) + Math.pow(longitude - a.longitude, 2);
        const distB = Math.pow(latitude - b.latitude, 2) + Math.pow(longitude - b.longitude, 2);
        return distA - distB;
      })[0];

    if (jantarMaisProximo) {
      atividades.push(formatarJantarUniversal(jantarMaisProximo));
      return atividades;
    }
  }

  // 2ï¸âƒ£ Busca por nome da regiÃ£o (usando regiÃ£o de fogos, se aplicÃ¡vel)
  if (regiaoNormalizada) {
    const jantarRegiao = jantaresUniversal.find(
      j => tipoInclui(j.tipo, perfilSelecionado) &&
      j.regiao.trim().toLowerCase() === regiaoNormalizada.toLowerCase()
    );
    if (jantarRegiao) {
      atividades.push(formatarJantarUniversal(jantarRegiao));
      return atividades;
    }
  }

  // 3ï¸âƒ£ Busca por qualquer jantar com o tipo (fallback)
  const jantarQualquer = jantaresUniversal.find(j => tipoInclui(j.tipo, perfilSelecionado));
  if (jantarQualquer) {
    atividades.push(formatarJantarUniversal(jantarQualquer));
    return atividades;
  }

  // 4ï¸âƒ£ Nada encontrado
  atividades.push({
    titulo: 'ðŸ½ï¸ Jantar',
    descricao: 'Nenhuma sugestÃ£o encontrada com seu perfil nesta regiÃ£o.',
    horarioSugerido: '19:00',
    tipo: 'jantar',
  });

  return atividades;
};

// ðŸ”§ FunÃ§Ã£o auxiliar
function formatarJantarUniversal(jantar: any): AtividadeDia {
  return {
    titulo: `ðŸ½ï¸ ${jantar.nome} â€“ Jantar`,
    descricao:
      `Tipo: ${Array.isArray(jantar.tipo) ? jantar.tipo.join(', ') : jantar.tipo}\n` +
      `PreÃ§o mÃ©dio: $${jantar.precoMedio}` +
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
