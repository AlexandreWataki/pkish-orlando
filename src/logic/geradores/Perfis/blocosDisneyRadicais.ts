ï»¿// src/logic/blocos/parques/Perfis/blocosDisneyRadicais.ts

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
        // A ÃƒÂºltima ÃƒÂ¡rea do turno da tarde ÃƒÂ© a ÃƒÂ¡rea dos fogos que serÃƒÂ¡ destacada ÃƒÂ  noite
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
        areas: ['World Showcase'], // ÃƒÅ¡ltima ÃƒÂ¡rea para fogos ÃƒÂ  noite
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
        areas: ['Sunset Boulevard', 'Star Wars: GalaxyÃ¢â‚¬â„¢s Edge'],
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['Toy Story Land', 'Echo Lake'], // ÃƒÅ¡ltimas ÃƒÂ¡reas antes dos fogos
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
        areas: ['Pandora Ã¢â‚¬â€œ The World of Avatar'],
      },
      {
        periodo: 'tarde',
        horarioInicio: '13:00',
        horarioFim: '19:00',
        areas: ['Africa', 'Asia'], // ÃƒÅ¡ltimas ÃƒÂ¡reas antes da noite
      },
      {
        periodo: 'noite',
        horarioInicio: '20:00',
        horarioFim: '23:59',
        areas: [], // Noite para experiÃƒÂªncia noturna de Pandora
      },
    ],
  },
];
