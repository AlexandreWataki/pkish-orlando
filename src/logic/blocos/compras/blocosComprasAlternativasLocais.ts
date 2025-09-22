ï»¿// src/logic/blocos/compras/blocosComprasAlternativasLocais.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosComprasAlternativasLocais: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Downtown Orlando Ã¢â‚¬â€œ Church Street',
    descricaoRegiao:
      'Durante a manhÃƒÂ£: Downtown Orlando, especialmente a Church Street, ÃƒÂ© ideal para um inÃƒÂ­cio calmo, com construÃƒÂ§ÃƒÂµes histÃƒÂ³ricas e ruas arborizadas.\n' +
      'Lojas: Pequenos mercadinhos, lojas conceito e butiques alternativas oferecem produtos artesanais, retrÃƒÂ´ e exclusivos.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: CafÃƒÂ©s com mesas externas e opÃƒÂ§ÃƒÂµes artesanais sÃƒÂ£o perfeitos para uma pausa.\n' +
      'Dica: VÃƒÂ¡ cedo ao "The Lovely Boutique Market" para garantir peÃƒÂ§as sustentÃƒÂ¡veis e vintage antes que acabem.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Mercadinho e lojas conceito na Church Street',
        regiao: 'Downtown Orlando',
        area: 'Downtown Orlando',
        latitude: 28.5402,
        longitude: -81.3803,
        local: 'Church Street Station, Orlando, FL',
        descricao:
          'Caminhe por mercadinhos e lojas conceito da Church Street. Encontre butiques locais e peÃƒÂ§as vintage. Dica: Visite cedo o "The Lovely Boutique Market" para achar produtos ÃƒÂºnicos.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Colonial Plaza Mall',
    descricaoRegiao:
      'Durante a tarde: East Colonial recebe mais movimento, mas mantÃƒÂ©m ÃƒÂ¡reas abertas e bem distribuÃƒÂ­das.\n' +
      'Lojas: Colonial Plaza Mall com Ross, Marshalls, Hobby Lobby e Five Below, ideais para economia e variedade.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Restaurantes casuais, cafÃƒÂ©s e food trucks prÃƒÂ³ximos ÃƒÂ s lojas.\n' +
      'Dica: Entre na Ross pelas entradas laterais e vÃƒÂ¡ direto ÃƒÂ  seÃƒÂ§ÃƒÂ£o de utensÃƒÂ­lios domÃƒÂ©sticos antes das 16h.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Colonial Plaza Mall',
        regiao: 'East Colonial',
        area: 'East Colonial',
        latitude: 28.5548,
        longitude: -81.3517,
        local: '601 N Bumby Ave, Orlando, FL',
        descricao:
          'Explore o Colonial Plaza Mall, com lojas acessÃƒÂ­veis como Ross e Marshalls. Dica: Na Ross, vÃƒÂ¡ primeiro aos utensÃƒÂ­lios domÃƒÂ©sticos.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Artegon Marketplace',
    descricaoRegiao:
      'Durante a noite: A International Drive fica movimentada com feirinhas, lojinhas criativas e atraÃƒÂ§ÃƒÂµes culturais.\n' +
      'Lojas: Pequenos comÃƒÂ©rcios independentes vendem arte local, camisetas criativas e suvenires exclusivos.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Food trucks, bares e cafÃƒÂ©s funcionam atÃƒÂ© tarde, com ÃƒÂ¡reas iluminadas para relaxar.\n' +
      'Dica: Procure vendedores que fazem camisetas e chaveiros personalizados na hora.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Artegon Marketplace (feiras locais)',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4745,
        longitude: -81.4513,
        local: '5250 International Dr, Orlando, FL',
        descricao:
          'Visite feiras e lojinhas na antiga ÃƒÂ¡rea do Artegon Marketplace. Dica: Personalize camisetas e chaveiros com artistas locais.',
      },
    ],
  },
];
