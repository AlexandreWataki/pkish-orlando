// src/logic/blocos/parques/Perfis/blocosDisneyInterativas.ts

import { BlocoPerfilParque } from '@/logic/types/turno';

export const blocosDisneyInterativas: BlocoPerfilParque[] = [
  {
    parque: 'Magic Kingdom',
    turnos: [
      {
        periodo: 'manha',
        horarioInicio: '08:00',
        horarioFim: '12:00',
        areas: ['Tomorrowland'],
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['Fantasyland'],
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: ['Adventureland'],
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
        areas: ['World Discovery'],
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['World Celebration'],
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: ['World Showcase'],
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
        areas: ['Animation Courtyard'],
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
        areas: ['Echo Lake'],
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
        areas: ['DinoLand U.S.A.'],
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['Discovery Island'],
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: ['Africa'],
      },
    ],
  },
];
