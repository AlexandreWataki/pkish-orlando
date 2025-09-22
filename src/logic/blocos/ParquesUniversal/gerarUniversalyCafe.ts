﻿import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';
import { cafesUniversal } from './CafeUniversal'; // Importa opÃ§Ãµes de cafÃ© para a Universal

// FunÃ§Ã£o de comparaÃ§Ã£o que aceita tipo string ou array (case insensitive)
function tipoInclui(tipo: string | string[], perfil: string) {
  if (!tipo) return false;
  if (Array.isArray(tipo)) {
    return tipo.map(t => t.toLowerCase().trim()).includes(perfil.toLowerCase().trim());
  }
  // Caso tipo venha como string separada por vÃ­rgulas, tambÃ©m separa
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
      titulo: 'â˜• CafÃ© da ManhÃ£',
      descricao: 'Nenhum perfil de refeiÃ§Ã£o selecionado.',
      horarioSugerido: '07:00',
      tipo: 'cafe',
    });
    return atividades;
  }

  const nomeRegiaoNorm = regiao?.trim().toLowerCase();

  // 1ï¸âƒ£ Busca por coordenadas + priorizaÃ§Ã£o da mesma regiÃ£o
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

  // 2ï¸âƒ£ Busca por nome da regiÃ£o (quando nÃ£o hÃ¡ coordenadas)
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

  // 3ï¸âƒ£ Busca genÃ©rica por qualquer cafÃ© do perfil
  const cafeQualquer = cafesUniversal.find(c => tipoInclui(c.tipo, perfilSelecionado));
  if (cafeQualquer) {
    atividades.push(formatarCafeUniversal(cafeQualquer));
    return atividades;
  }

  // 4ï¸âƒ£ Nenhum cafÃ© encontrado
  atividades.push({
    titulo: 'â˜• CafÃ© da ManhÃ£',
    descricao: 'Nenhuma sugestÃ£o encontrada com seu perfil nesta regiÃ£o.',
    horarioSugerido: '07:00',
    tipo: 'cafe',
  });

  return atividades;
};

// ðŸ”§ FunÃ§Ã£o auxiliar
function formatarCafeUniversal(cafe: any): AtividadeDia {
  return {
    titulo: `â˜• ${cafe.nome} â€“ CafÃ© da ManhÃ£`,
    descricao:
      `Tipo: ${Array.isArray(cafe.tipo) ? cafe.tipo.join(', ') : cafe.tipo}\n` +
      `PreÃ§o mÃ©dio: $${cafe.precoMedio}` +
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
