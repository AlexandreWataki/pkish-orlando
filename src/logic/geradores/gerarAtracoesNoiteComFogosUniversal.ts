import { AtividadeDia } from '@/logic/types/atividade';
import { gerarAtracoesUniversalPorPerfilFluxo } from './gerarAtracoesUniversalPorPerfilFluxo';

// Experiências noturnas dos parques da Universal
import { experienciaEpicoUniverseNoite } from './AreasUniversal/FogosEpicoUniverse';
import { experienciaIslandsOfAdventureNoite } from './AreasUniversal/FogosIslandsOfAdventure';
import { experienciaUniversalStudiosNoite } from './AreasUniversal/FogosUniversalStudios';

// Áreas que representam as experiências noturnas em cada parque da Universal
const areasComExperienciaPorParque: Record<string, string[]> = {
  "Universal's Epic Universe": ["Universal's Epic Universe"],
  'Islands of Adventure': ['Islands of Adventure'],
  'Universal Studios Florida': ['Universal Studios Florida'],
};

export function gerarAtracoesNoiteComFogosUniversal(
  parque: string,
  areasNoite: string[],
  perfis: string[]
): AtividadeDia[] {
  const experienciasNoturnas: AtividadeDia[] = [];
  const atracoesNoite = gerarAtracoesUniversalPorPerfilFluxo('noite', parque, perfis)
    .flatMap((area) => area.atracoes);

  // Verifica se o parque tem experiências noturnas fixas
  const temExperiencia =
    areasComExperienciaPorParque[parque]?.some((area) => areasNoite.includes(area)) ?? false;

  if (temExperiencia) {
    switch (parque) {
      case "Universal's Epic Universe":
        experienciasNoturnas.push(...experienciaEpicoUniverseNoite);
        break;
      case 'Islands of Adventure':
        experienciasNoturnas.push(...experienciaIslandsOfAdventureNoite);
        break;
      case 'Universal Studios Florida':
        experienciasNoturnas.push(...experienciaUniversalStudiosNoite);
        break;
    }
  }

  // Retorna as experiências fixas + atrações extras da noite
  return [...experienciasNoturnas, ...atracoesNoite];
}
