import { Parkisheiro } from '@/logic/types/parkisheiro';
import { AtividadeDia } from '@/logic/types/atividade';
import { almocosUniversal } from './AlmocoUniversal';

// Função de comparação que aceita tipo string, array ou string separada por vírgula (case insensitive)
function tipoInclui(tipo: string | string[], perfil: string) {
  if (!tipo) return false;
  if (Array.isArray(tipo)) {
    return tipo.map(t => t.toLowerCase().trim()).includes(perfil.toLowerCase().trim());
  }
  return tipo
    .toLowerCase()
    .split(',')
    .map(t => t.trim())
    .includes(perfil.toLowerCase().trim());
}

export const gerarUniversalAlmoco = (
  parkisheiro: Parkisheiro,
  regiao?: string,
  latitude?: number,
  longitude?: number
): AtividadeDia[] => {
  const atividades: AtividadeDia[] = [];

  const perfilSelecionado = parkisheiro.perfis?.refeicoes?.perfil;
  if (!perfilSelecionado) {
    atividades.push({
      titulo: '🍽️ Almoço',
      descricao: 'Nenhum perfil de refeição selecionado.',
      horarioSugerido: '12:00',
      tipo: 'almoco',
    });
    return atividades;
  }

  // 1️⃣ Busca por coordenadas
  if (latitude != null && longitude != null) {
    const almocoMaisProximo = almocosUniversal
      .filter(a => tipoInclui(a.tipo, perfilSelecionado))
      .sort((a, b) => {
        const distA = Math.pow(latitude - a.latitude, 2) + Math.pow(longitude - a.longitude, 2);
        const distB = Math.pow(latitude - b.latitude, 2) + Math.pow(longitude - b.longitude, 2);
        return distA - distB;
      })[0];

    if (almocoMaisProximo) {
      atividades.push(formatarAlmocoUniversal(almocoMaisProximo));
      return atividades;
    }
  }

  // 2️⃣ Busca por nome da região
  const nomeRegiao = regiao ?? parkisheiro.regiaoHospedagem?.nome;
  if (nomeRegiao) {
    const nomeRegiaoNorm = nomeRegiao.trim().toLowerCase();
    const almocoRegiao = almocosUniversal.find(
      a => tipoInclui(a.tipo, perfilSelecionado) && a.regiao.trim().toLowerCase() === nomeRegiaoNorm
    );
    if (almocoRegiao) {
      atividades.push(formatarAlmocoUniversal(almocoRegiao));
      return atividades;
    }
  }

  // 3️⃣ Busca por qualquer almoço com o tipo
  const almocoQualquer = almocosUniversal.find(a => tipoInclui(a.tipo, perfilSelecionado));
  if (almocoQualquer) {
    atividades.push(formatarAlmocoUniversal(almocoQualquer));
    return atividades;
  }

  // 4️⃣ Nada encontrado
  atividades.push({
    titulo: '🍽️ Almoço',
    descricao: 'Nenhuma sugestão encontrada com seu perfil nesta região.',
    horarioSugerido: '12:00',
    tipo: 'almoco',
  });

  return atividades;
};

// 🔧 Função auxiliar
function formatarAlmocoUniversal(almoco: any): AtividadeDia {
  return {
    titulo: `🍽️ ${almoco.nome} – Almoço`,
    descricao:
      `Tipo: ${Array.isArray(almoco.tipo) ? almoco.tipo.join(', ') : almoco.tipo}\n` +
      `Preço médio: $${almoco.precoMedio}` +
      (almoco.acesso ? `\nAcesso: ${almoco.acesso}` : '') +
      (almoco.destaque ? `\nDestaque: ${almoco.destaque}` : ''),
    horarioSugerido: '12:00',
    tipo: 'almoco',
    regiao: almoco.regiao,
    acesso: almoco.acesso,
    destaque: almoco.destaque,
    latitude: almoco.latitude,
    longitude: almoco.longitude,
    precoMedio: almoco.precoMedio,
  };
}
