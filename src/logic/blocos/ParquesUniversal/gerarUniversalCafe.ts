import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';
import { cafesDisney } from './CafeDisney';

// Função de comparação que aceita tipo string ou array (case insensitive)
function tipoInclui(tipo: string | string[], perfil: string) {
  if (!tipo) return false;
  if (Array.isArray(tipo)) {
    return tipo.map(t => t.toLowerCase().trim()).includes(perfil.toLowerCase().trim());
  }
  // Se tipo veio como 'classico,americano', separa por vírgula também
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
      titulo: '☕ Café da Manhã',
      descricao: 'Nenhum perfil de refeição selecionado.',
      horarioSugerido: '07:00',
      tipo: 'cafe',
    });
    return atividades;
  }

  const nomeRegiaoNorm = regiao?.trim().toLowerCase();

  // 1️⃣ Busca por coordenadas + priorização da mesma região
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

  // 2️⃣ Busca por nome da região (caso coordenadas não funcionem)
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

  // 3️⃣ Busca por qualquer café com o tipo
  const cafeQualquer = cafesDisney.find(c => tipoInclui(c.tipo, perfilSelecionado));
  if (cafeQualquer) {
    atividades.push(formatarCafeDisney(cafeQualquer));
    return atividades;
  }

  // 4️⃣ Nada encontrado
  atividades.push({
    titulo: '☕ Café da Manhã',
    descricao: 'Nenhuma sugestão encontrada com seu perfil nesta região.',
    horarioSugerido: '07:00',
    tipo: 'cafe',
  });

  return atividades;
};

// 🔧 Função auxiliar
function formatarCafeDisney(cafe: any): AtividadeDia {
  return {
    titulo: `☕ ${cafe.nome} – Café da Manhã`,
    descricao:
      `Tipo: ${Array.isArray(cafe.tipo) ? cafe.tipo.join(', ') : cafe.tipo}\n` +
      `Preço médio: $${cafe.precoMedio}` +
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
