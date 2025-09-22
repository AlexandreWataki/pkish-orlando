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
        areas: ['Fantasyland', 'Liberty Square'],
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['Adventureland', 'Main Street, U.S.A.'],
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: ['Tomorrowland'],
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
        areas: ['World Nature'],
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['World Showcase'],
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: ['World Celebration'],
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
        areas: ['Animation Courtyard', 'Echo Lake'],
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['Toy Story Land'],
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: ['Hollywood Boulevard'],
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
        areas: ['Oasis', 'Discovery Island'],
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['DinoLand U.S.A.', 'Africa'],
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: ['Pandora â€“ The World of Avatar'],
      },
    ],
  },
];
