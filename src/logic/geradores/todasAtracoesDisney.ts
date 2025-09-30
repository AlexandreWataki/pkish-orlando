import { AtracaoParque } from '@/logic/types/atracao';

import { Adventureland } from './Areas/Adventureland';
import { Fantasyland } from './Areas/Fantasyland';
import { Frontierland } from './Areas/Frontierland';
import { LibertySquare } from './Areas/LibertySquare';
import { MainStreet } from './Areas/MainStreet';
import { Tomorrowland } from './Areas/Tomorrowland';

import { WorldCelebration } from './Areas/WorldCelebration';
import { WorldDiscovery } from './Areas/WorldDiscovery';
import { WorldNature } from './Areas/WorldNature';
import { WorldShowcase } from './Areas/WorldShowcase';

import { AnimationCourtyard } from './Areas/AnimationCourtyard';
import { EchoLake } from './Areas/EchoLake';
import { GrandAvenue } from './Areas/GrandAvenue';
import { HollywoodBoulevard } from './Areas/HollywoodBoulevard';
import { StarWars } from './Areas/StarWars';
import { SunsetBoulevard } from './Areas/SunsetBoulevard';
import { ToyStoryLand } from './Areas/ToyStoryLand';

import { Africa } from './Areas/Africa';
import { Asia } from './Areas/Asia';
import { DinoLand } from './Areas/DinoLand';
import { DiscoveryIsland } from './Areas/DiscoveryIsland';
import { Oasis } from './Areas/Oasis';
import { Pandora } from './Areas/Pandora';

export const atracoesDisney: Partial<AtracaoParque>[] = [
  ...Adventureland.atracoes.map((a) => ({ ...a, regiao: 'Adventureland', parque: Adventureland.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...Fantasyland.atracoes.map((a) => ({ ...a, regiao: 'Fantasyland', parque: Fantasyland.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...Frontierland.atracoes.map((a) => ({ ...a, regiao: 'Frontierland', parque: Frontierland.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...LibertySquare.atracoes.map((a) => ({ ...a, regiao: 'Liberty Square', parque: LibertySquare.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...MainStreet.atracoes.map((a) => ({ ...a, regiao: 'Main Street, U.S.A.', parque: MainStreet.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...Tomorrowland.atracoes.map((a) => ({ ...a, regiao: 'Tomorrowland', parque: Tomorrowland.parque, atracaoSemFila: a.atracaoSemFila ?? false })),

  ...WorldCelebration.atracoes.map((a) => ({ ...a, regiao: 'World Celebration', parque: WorldCelebration.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...WorldDiscovery.atracoes.map((a) => ({ ...a, regiao: 'World Discovery', parque: WorldDiscovery.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...WorldNature.atracoes.map((a) => ({ ...a, regiao: 'World Nature', parque: WorldNature.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...WorldShowcase.atracoes.map((a) => ({ ...a, regiao: 'World Showcase', parque: WorldShowcase.parque, atracaoSemFila: a.atracaoSemFila ?? false })),

  ...AnimationCourtyard.atracoes.map((a) => ({ ...a, regiao: 'Animation Courtyard', parque: AnimationCourtyard.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...EchoLake.atracoes.map((a) => ({ ...a, regiao: 'Echo Lake', parque: EchoLake.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...GrandAvenue.atracoes.map((a) => ({ ...a, regiao: 'Grand Avenue', parque: GrandAvenue.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...HollywoodBoulevard.atracoes.map((a) => ({ ...a, regiao: 'Hollywood Boulevard', parque: HollywoodBoulevard.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...StarWars.atracoes.map((a) => ({ ...a, regiao: 'Star Wars: Galaxy’s Edge', parque: StarWars.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...SunsetBoulevard.atracoes.map((a) => ({ ...a, regiao: 'Sunset Boulevard', parque: SunsetBoulevard.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...ToyStoryLand.atracoes.map((a) => ({ ...a, regiao: 'Toy Story Land', parque: ToyStoryLand.parque, atracaoSemFila: a.atracaoSemFila ?? false })),

  ...Africa.atracoes.map((a) => ({ ...a, regiao: 'Africa', parque: Africa.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...Asia.atracoes.map((a) => ({ ...a, regiao: 'Asia', parque: Asia.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...DinoLand.atracoes.map((a) => ({ ...a, regiao: 'DinoLand U.S.A.', parque: DinoLand.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...DiscoveryIsland.atracoes.map((a) => ({ ...a, regiao: 'Discovery Island', parque: DiscoveryIsland.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...Oasis.atracoes.map((a) => ({ ...a, regiao: 'Oasis', parque: Oasis.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
  ...Pandora.atracoes.map((a) => ({ ...a, regiao: 'Pandora – The World of Avatar', parque: Pandora.parque, atracaoSemFila: a.atracaoSemFila ?? false })),
];
