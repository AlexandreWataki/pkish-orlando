ï»¿import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';
import { jantaresUniversal } from './JantarUniversal'; // Importa opÃƒÂ§ÃƒÂµes de jantar da Universal

// Mapeia o nome do parque para a regiÃƒÂ£o de fogos correspondente
const mapaShowParaJantar: Record<string, string> = {
  'universal studios florida': 'FogosUniversalStudios',
  'islands of adventure': 'FogosIslandsOfAdventure',
  "universal's epic universe": 'FogosEpicoUniverse',
};

// FunÃƒÂ§ÃƒÂ£o de comparaÃƒÂ§ÃƒÂ£o que aceita tipo string, array ou string separada por vÃƒÂ­rgula (case insensitive)
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
      titulo: 'Ã°Å¸ÂÂ½Ã¯Â¸Â Jantar',
      descricao: 'Nenhum perfil de refeiÃƒÂ§ÃƒÂ£o selecionado.',
      horarioSugerido: '19:00',
      tipo: 'jantar',
    });
    return atividades;
  }

  // Ã°Å¸â€Â¹ Converte regiao para a regiÃƒÂ£o de show (Fogos...), se for um parque da Universal
  let regiaoNormalizada = '';
  if (regiao) {
    const regiaoLower = regiao.toLowerCase().trim();
    regiaoNormalizada = mapaShowParaJantar[regiaoLower] || regiao;
  }

  // 1Ã¯Â¸ÂÃ¢Æ’Â£ Busca por coordenadas (se latitude e longitude forem fornecidas)
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

  // 2Ã¯Â¸ÂÃ¢Æ’Â£ Busca por nome da regiÃƒÂ£o (usando regiÃƒÂ£o de fogos, se aplicÃƒÂ¡vel)
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

  // 3Ã¯Â¸ÂÃ¢Æ’Â£ Busca por qualquer jantar com o tipo (fallback)
  const jantarQualquer = jantaresUniversal.find(j => tipoInclui(j.tipo, perfilSelecionado));
  if (jantarQualquer) {
    atividades.push(formatarJantarUniversal(jantarQualquer));
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
function formatarJantarUniversal(jantar: any): AtividadeDia {
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
