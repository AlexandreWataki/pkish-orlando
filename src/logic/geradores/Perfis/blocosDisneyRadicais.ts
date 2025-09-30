// src/logic/blocos/parques/Perfis/blocosDisneyRadicais.ts

import { BlocoPerfilParque } from '@/logic/types/turno';

export const blocosDisneyRadicais: BlocoPerfilParque[] = [
  {
    parque: 'Magic Kingdom',
    turnos: [
      {
        periodo: 'manha',
        horarioInicio: '08:00',
        horarioFim: '12:00',
        areas: ['Tomorrowland', 'Frontierland'],
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        // A última área do turno da tarde é a área dos fogos que será destacada à noite
        areas: ['Adventureland', 'Fantasyland', 'Main Street, U.S.A.'],
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: [], // Noite para fotos/fogos em Main Street, tratada em bloco especial
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
        areas: ['World Showcase'], // Última área para fogos à noite
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: [], // Noite reservada para fogos
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
        areas: ['Sunset Boulevard', 'Star Wars: Galaxy’s Edge'],
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['Toy Story Land', 'Echo Lake'], // Últimas áreas antes dos fogos
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: [], // Noite reservada para fogos Fantasmic
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
        areas: ['Pandora – The World of Avatar'],
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['Africa', 'Asia'], // Últimas áreas antes da noite
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: [], // Noite para experiência noturna de Pandora
      },
    ],
  },
];
