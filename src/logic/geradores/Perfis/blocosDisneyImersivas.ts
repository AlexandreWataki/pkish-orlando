// src/logic/blocos/parques/Perfis/blocosDisneyFamiliares.ts

import { BlocoPerfilParque } from '@/logic/types/turno';

export const blocosDisneyFamiliares: BlocoPerfilParque[] = [
  {
    parque: 'Magic Kingdom',
    turnos: [
      {
        periodo: 'manha',
        horarioInicio: '08:00',
        horarioFim: '12:00',
        areas: ['Adventureland', 'Fantasyland', 'Frontierland'], // 3 Ã¡reas manhÃ£
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['Liberty Square', 'Tomorrowland', 'Main Street, U.S.A.'], // Main Street no fim da tarde, perto dos fogos
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: [], // Noite sÃ³ fogos, bloco separado
      },
    ],
  },
  {
    parque: 'EPCOT',
    turnos: [
      {
        periodo: 'manha',
        horarioInicio: '08:00',
        horarioFim: '12:00',
        areas: ['World Celebration', 'World Discovery', 'World Nature'], // 3 Ã¡reas manhÃ£
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['World Showcase'], // Ãšltima Ã¡rea tarde perto dos fogos
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: [], // Noite sÃ³ fogos
      },
    ],
  },
  {
    parque: 'Hollywood Studios',
    turnos: [
      {
        periodo: 'manha',
        horarioInicio: '08:00',
        horarioFim: '12:00',
        areas: ['Animation Courtyard', 'Echo Lake', 'Grand Avenue'], // 3 Ã¡reas manhÃ£
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['Sunset Boulevard', 'Toy Story Land', 'Star Wars: Galaxyâ€™s Edge', 'Hollywood Boulevard'], // Hollywood Blvd. perto dos fogos
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: [], // Noite sÃ³ fogos
      },
    ],
  },
  {
    parque: 'Animal Kingdom',
    turnos: [
      {
        periodo: 'manha',
        horarioInicio: '08:00',
        horarioFim: '12:00',
        areas: ['Oasis', 'Discovery Island', 'Asia'], // 3 Ã¡reas manhÃ£
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['DinoLand U.S.A.', 'Africa', 'Pandora â€“ The World of Avatar'], // Pandora no fim da tarde para noite
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: [], // Noite sÃ³ fogos / experiÃªncia noturna
      },
    ],
  },
];
