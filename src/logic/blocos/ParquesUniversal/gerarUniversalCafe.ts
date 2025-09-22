ï»¿import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';
import { cafesDisney } from './CafeDisney';

// FunÃƒÂ§ÃƒÂ£o de comparaÃƒÂ§ÃƒÂ£o que aceita tipo string ou array (case insensitive)
function tipoInclui(tipo: string | string[], perfil: string) {
  if (!tipo) return false;
  if (Array.isArray(tipo)) {
    return tipo.map(t => t.toLowerCase().trim()).includes(perfil.toLowerCase().trim());
  }
  // Se tipo veio como 'classico,americano', separa por vÃƒÂ­rgula tambÃƒÂ©m
  if (typeof tipo === 'string' && tipo.includes(',')) {
    return tipo.split(',').map(t => t.toLowerCase().trim()).includes(perfil.toLowerCase().trim());
  }
  return tipo.toLowerCase().trim() === perfil.toLowerCase().trim();
}

export const gerarDisneyCafe = (
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
    const cafesFiltrados = cafesDisney
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
      atividades.push(formatarCafeDisney(cafeMaisProximo));
      return atividades;
    }
  }

  // 2Ã¯Â¸ÂÃ¢Æ’Â£ Busca por nome da regiÃƒÂ£o (caso coordenadas nÃƒÂ£o funcionem)
  const nomeRegiao = regiao ?? parkisheiro.regiaoHospedagem?.nome;
  if (nomeRegiao) {
    const nomeRegiaoNorm2 = nomeRegiao.trim().toLowerCase();
    const cafeRegiao = cafesDisney.find(
      c => tipoInclui(c.tipo, perfilSelecionado) && c.regiao.trim().toLowerCase() === nomeRegiaoNorm2
    );
    if (cafeRegiao) {
      atividades.push(formatarCafeDisney(cafeRegiao));
      return atividades;
    }
  }

  // 3Ã¯Â¸ÂÃ¢Æ’Â£ Busca por qualquer cafÃƒÂ© com o tipo
  const cafeQualquer = cafesDisney.find(c => tipoInclui(c.tipo, perfilSelecionado));
  if (cafeQualquer) {
    atividades.push(formatarCafeDisney(cafeQualquer));
    return atividades;
  }

  // 4Ã¯Â¸ÂÃ¢Æ’Â£ Nada encontrado
  atividades.push({
    titulo: 'Ã¢Ëœâ€¢ CafÃƒÂ© da ManhÃƒÂ£',
    descricao: 'Nenhuma sugestÃƒÂ£o encontrada com seu perfil nesta regiÃƒÂ£o.',
    horarioSugerido: '07:00',
    tipo: 'cafe',
  });

  return atividades;
};

// Ã°Å¸â€Â§ FunÃƒÂ§ÃƒÂ£o auxiliar
function formatarCafeDisney(cafe: any): AtividadeDia {
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
