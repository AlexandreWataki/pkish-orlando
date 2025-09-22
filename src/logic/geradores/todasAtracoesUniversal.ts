ï»¿// src/logic/geradores/todasAtracoesUniversal.ts

import { AtracaoParque } from '@/logic/types/atracao';

// Ã¢â‚¬â€ Universal Studios Florida
import { Hollywood } from './AreasUniversal/Hollywood';
// Ã¢Â¬â€¡Ã¯Â¸Â Se o arquivo WorldExpo.ts exporta WorldExpoSpringfield, use alias:
import { WorldExpo } from './AreasUniversal/WorldExpo';
import { MinionsLand } from './AreasUniversal/MinionsLand';
import { ProductionCentral } from './AreasUniversal/ProductionCentral';
import { SanFrancisco } from './AreasUniversal/SanFrancisco';
import { NewYork } from './AreasUniversal/NewYork';
import { TheWizardingWorld } from './AreasUniversal/TheWizardingWorld';
import { TheWizardingWorldDiagonAlley } from './AreasUniversal/TheWizardingWorldDiagonAlley';

// Ã¢â‚¬â€ Islands of Adventure
import { MarvelSuperHeroIsland } from './AreasUniversal/MarvelSuperHeroIsland';
import { ToonLagoon } from './AreasUniversal/ToonLagoon';
import { SeussLanding } from './AreasUniversal/SeussLanding';
import { JurassicPark } from './AreasUniversal/JurassicPark';
import { LostContinent } from './AreasUniversal/LostContinent';
import { TheWizardingWorldHogsmeade } from './AreasUniversal/TheWizardingWorldHogsmeade';
import { SkullIsland } from './AreasUniversal/SkullIsland'; // Ã¢Å“â€¦ NOVO

// Ã¢â‚¬â€ Epic Universe
import { UniversalMonsters } from './AreasUniversal/UniversalMonsters';
import { SuperNintendoWorld } from './AreasUniversal/SuperNintendoWorld';
import { HowToTrainYourDragon } from './AreasUniversal/HowToTrainYourDragon';
import { MinistryOfMagic } from './AreasUniversal/MinistryOfMagic';
import { CelestialPark } from './AreasUniversal/CelestialPark'; // Ã¢Å“â€¦ NOVO

// Ã¢ÂÅ’ removido: TheWitcher
// import { TheWitcher } from './AreasUniversal/TheWitcher';

export const atracoesUniversal: Partial<AtracaoParque>[] = [
  // Ã¢â‚¬â€ Universal Studios Florida
  ...Hollywood.atracoes.map((a) => ({
    ...a,
    regiao: 'Hollywood',
    parque: Hollywood.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...WorldExpo.atracoes.map((a) => ({
    ...a,
    regiao: 'World Expo',
    parque: WorldExpo.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...MinionsLand.atracoes.map((a) => ({
    ...a,
    regiao: 'Minions Land',
    parque: MinionsLand.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...ProductionCentral.atracoes.map((a) => ({
    ...a,
    regiao: 'Production Central',
    parque: ProductionCentral.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...SanFrancisco.atracoes.map((a) => ({
    ...a,
    regiao: 'San Francisco',
    parque: SanFrancisco.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...NewYork.atracoes.map((a) => ({
    ...a,
    regiao: 'New York',
    parque: NewYork.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...TheWizardingWorld.atracoes.map((a) => ({
    ...a,
    regiao: 'The Wizarding World',
    parque: TheWizardingWorld.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...TheWizardingWorldDiagonAlley.atracoes.map((a) => ({
    ...a,
    regiao: 'The Wizarding World Ã¢â‚¬â€œ Diagon Alley',
    parque: TheWizardingWorldDiagonAlley.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),

  // Ã¢â‚¬â€ Islands of Adventure
  ...MarvelSuperHeroIsland.atracoes.map((a) => ({
    ...a,
    regiao: 'Marvel Super Hero Island',
    parque: MarvelSuperHeroIsland.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...ToonLagoon.atracoes.map((a) => ({
    ...a,
    regiao: 'Toon Lagoon',
    parque: ToonLagoon.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...SeussLanding.atracoes.map((a) => ({
    ...a,
    regiao: 'Seuss Landing',
    parque: SeussLanding.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...JurassicPark.atracoes.map((a) => ({
    ...a,
    regiao: 'Jurassic Park',
    parque: JurassicPark.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...SkullIsland.atracoes.map((a) => ({
    ...a,
    regiao: 'Skull Island',
    parque: SkullIsland.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })), // Ã¢Å“â€¦ NOVO
  ...TheWizardingWorldHogsmeade.atracoes.map((a) => ({
    ...a,
    regiao: 'The Wizarding World Ã¢â‚¬â€œ Hogsmeade',
    parque: TheWizardingWorldHogsmeade.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...LostContinent.atracoes.map((a) => ({
    ...a,
    regiao: 'Lost Continent',
    parque: LostContinent.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),

  // Ã¢â‚¬â€ Epic Universe
  ...UniversalMonsters.atracoes.map((a) => ({
    ...a,
    regiao: 'Universal Monsters',
    parque: UniversalMonsters.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...SuperNintendoWorld.atracoes.map((a) => ({
    ...a,
    regiao: 'Super Nintendo World',
    parque: SuperNintendoWorld.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...HowToTrainYourDragon.atracoes.map((a) => ({
    ...a,
    regiao: 'How to Train Your Dragon',
    parque: HowToTrainYourDragon.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...MinistryOfMagic.atracoes.map((a) => ({
    ...a,
    regiao: 'Ministry of Magic',
    parque: MinistryOfMagic.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })),
  ...CelestialPark.atracoes.map((a) => ({
    ...a,
    regiao: 'Celestial Park',
    parque: CelestialPark.parque,
    atracaoSemFila: a.atracaoSemFila ?? false,
  })), // Ã¢Å“â€¦ NOVO
];
