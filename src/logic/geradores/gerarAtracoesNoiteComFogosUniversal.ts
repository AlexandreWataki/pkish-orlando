import { AtividadeDia } from '@/logic/types/atividade';
import { gerarAtracoesUniversalPorPerfilFluxo } from './gerarAtracoesUniversalPorPerfilFluxo';

// ExperiÃªncias noturnas dos parques da Universal
import { experienciaEpicoUniverseNoite } from './AreasUniversal/FogosEpicoUniverse';
import { experienciaIslandsOfAdventureNoite } from './AreasUniversal/FogosIslandsOfAdventure';
import { experienciaUniversalStudiosNoite } from './AreasUniversal/FogosUniversalStudios';

// Ãreas que representam as experiÃªncias noturnas em cada parque da Universal
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

  // Verifica se o parque tem experiÃªncias noturnas fixas
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

  // Retorna as experiÃªncias fixas + atraÃ§Ãµes extras da noite
  return [...experienciasNoturnas, ...atracoesNoite];
}
