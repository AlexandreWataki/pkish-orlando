ï»¿import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';
import { cafesUniversal } from './CafeUniversal'; // Importa opÃƒÂ§ÃƒÂµes de cafÃƒÂ© para a Universal

// FunÃƒÂ§ÃƒÂ£o de comparaÃƒÂ§ÃƒÂ£o que aceita tipo string ou array (case insensitive)
function tipoInclui(tipo: string | string[], perfil: string) {
  if (!tipo) return false;
  if (Array.isArray(tipo)) {
    return tipo.map(t => t.toLowerCase().trim()).includes(perfil.toLowerCase().trim());
  }
  // Caso tipo venha como string separada por vÃƒÂ­rgulas, tambÃƒÂ©m separa
  if (typeof tipo === 'string' && tipo.includes(',')) {
    return tipo
      .split(',')
      .map(t => t.toLowerCase().trim())
      .includes(perfil.toLowerCase().trim());
  }
  return tipo.toLowerCase().trim() === perfil.toLowerCase().trim();
}

export const gerarUniversalCafe = (
  parkisheiro: Parkisheiro,
  regiao?: string,
  latitude?: number,
  longitude?: number
): AtividadeDia[] => {
  const atividades: AtividadeDia[] = [];

  const perfilSelecionado = parkisheiro.perfis?.refeicoes?.perfil;
  if (!perfilSelecionado) {
    atividades.push({
      titulo: 'Ã¢Ëœâ€¢ CafÃƒÂ© da ManhÃƒÂ£',
      descricao: 'Nenhum perfil de refeiÃƒÂ§ÃƒÂ£o selecionado.',
      horarioSugerido: '07:00',
      tipo: 'cafe',
    });
    return atividades;
  }

  const nomeRegiaoNorm = regiao?.trim().toLowerCase();

  // 1Ã¯Â¸ÂÃ¢Æ’Â£ Busca por coordenadas + priorizaÃƒÂ§ÃƒÂ£o da mesma regiÃƒÂ£o
  if (latitude != null && longitude != null && nomeRegiaoNorm) {
    const cafesFiltrados = cafesUniversal
      .filter(c => tipoInclui(c.tipo, perfilSelecionado))
      .sort((a, b) => {
        const aReg = a.regiao.trim().toLowerCase();
        const bReg = b.regiao.trim().toLowerCase();

        const aSame = aReg === nomeRegiaoNorm ? -1 : 1;
        const bSame = bReg === nomeRegiaoNorm ? -1 : 1;
        if (aSame !== bSame) return aSame - bSame;

        const distA = Math.pow(latitude - a.latitude, 2) + Math.pow(longitude - a.longitude, 2);
        const distB = Math.pow(latitude - b.latitude, 2) + Math.pow(longitude - b.longitude, 2);
        return distA - distB;
      });

    const cafeMaisProximo = cafesFiltrados[0];
    if (cafeMaisProximo) {
      atividades.push(formatarCafeUniversal(cafeMaisProximo));
      return atividades;
    }
  }

  // 2Ã¯Â¸ÂÃ¢Æ’Â£ Busca por nome da regiÃƒÂ£o (quando nÃƒÂ£o hÃƒÂ¡ coordenadas)
  const nomeRegiao = regiao ?? parkisheiro.regiaoHospedagem?.nome;
  if (nomeRegiao) {
    const nomeRegiaoNorm2 = nomeRegiao.trim().toLowerCase();
    const cafeRegiao = cafesUniversal.find(
      c => tipoInclui(c.tipo, perfilSelecionado) && c.regiao.trim().toLowerCase() === nomeRegiaoNorm2
    );
    if (cafeRegiao) {
      atividades.push(formatarCafeUniversal(cafeRegiao));
      return atividades;
    }
  }

  // 3Ã¯Â¸ÂÃ¢Æ’Â£ Busca genÃƒÂ©rica por qualquer cafÃƒÂ© do perfil
  const cafeQualquer = cafesUniversal.find(c => tipoInclui(c.tipo, perfilSelecionado));
  if (cafeQualquer) {
    atividades.push(formatarCafeUniversal(cafeQualquer));
    return atividades;
  }

  // 4Ã¯Â¸ÂÃ¢Æ’Â£ Nenhum cafÃƒÂ© encontrado
  atividades.push({
    titulo: 'Ã¢Ëœâ€¢ CafÃƒÂ© da ManhÃƒÂ£',
    descricao: 'Nenhuma sugestÃƒÂ£o encontrada com seu perfil nesta regiÃƒÂ£o.',
    horarioSugerido: '07:00',
    tipo: 'cafe',
  });

  return atividades;
};

// Ã°Å¸â€Â§ FunÃƒÂ§ÃƒÂ£o auxiliar
function formatarCafeUniversal(cafe: any): AtividadeDia {
  return {
    titulo: `Ã¢Ëœâ€¢ ${cafe.nome} Ã¢â‚¬â€œ CafÃƒÂ© da ManhÃƒÂ£`,
    descricao:
      `Tipo: ${Array.isArray(cafe.tipo) ? cafe.tipo.join(', ') : cafe.tipo}\n` +
      `PreÃƒÂ§o mÃƒÂ©dio: $${cafe.precoMedio}` +
      (cafe.acesso ? `\nAcesso: ${cafe.acesso}` : '') +
      (cafe.destaque ? `\nDestaque: ${cafe.destaque}` : ''),
    horarioSugerido: '07:00',
    tipo: 'cafe',
    regiao: cafe.regiao,
    acesso: cafe.acesso,
    destaque: cafe.destaque,
    latitude: cafe.latitude,
    longitude: cafe.longitude,
    precoMedio: cafe.precoMedio,
  };
}
