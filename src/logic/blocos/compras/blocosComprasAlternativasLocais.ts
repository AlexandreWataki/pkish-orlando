// src/logic/blocos/compras/blocosComprasAlternativasLocais.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosComprasAlternativasLocais: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Downtown Orlando â€“ Church Street',
    descricaoRegiao:
      'Durante a manhÃ£: Downtown Orlando, especialmente a Church Street, Ã© ideal para um inÃ­cio calmo, com construÃ§Ãµes histÃ³ricas e ruas arborizadas.\n' +
      'Lojas: Pequenos mercadinhos, lojas conceito e butiques alternativas oferecem produtos artesanais, retrÃ´ e exclusivos.\n' +
      'AlimentaÃ§Ã£o e descanso: CafÃ©s com mesas externas e opÃ§Ãµes artesanais sÃ£o perfeitos para uma pausa.\n' +
      'Dica: VÃ¡ cedo ao "The Lovely Boutique Market" para garantir peÃ§as sustentÃ¡veis e vintage antes que acabem.',
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
          'Caminhe por mercadinhos e lojas conceito da Church Street. Encontre butiques locais e peÃ§as vintage. Dica: Visite cedo o "The Lovely Boutique Market" para achar produtos Ãºnicos.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Colonial Plaza Mall',
    descricaoRegiao:
      'Durante a tarde: East Colonial recebe mais movimento, mas mantÃ©m Ã¡reas abertas e bem distribuÃ­das.\n' +
      'Lojas: Colonial Plaza Mall com Ross, Marshalls, Hobby Lobby e Five Below, ideais para economia e variedade.\n' +
      'AlimentaÃ§Ã£o e descanso: Restaurantes casuais, cafÃ©s e food trucks prÃ³ximos Ã s lojas.\n' +
      'Dica: Entre na Ross pelas entradas laterais e vÃ¡ direto Ã  seÃ§Ã£o de utensÃ­lios domÃ©sticos antes das 16h.',
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
          'Explore o Colonial Plaza Mall, com lojas acessÃ­veis como Ross e Marshalls. Dica: Na Ross, vÃ¡ primeiro aos utensÃ­lios domÃ©sticos.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Artegon Marketplace',
    descricaoRegiao:
      'Durante a noite: A International Drive fica movimentada com feirinhas, lojinhas criativas e atraÃ§Ãµes culturais.\n' +
      'Lojas: Pequenos comÃ©rcios independentes vendem arte local, camisetas criativas e suvenires exclusivos.\n' +
      'AlimentaÃ§Ã£o e descanso: Food trucks, bares e cafÃ©s funcionam atÃ© tarde, com Ã¡reas iluminadas para relaxar.\n' +
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
          'Visite feiras e lojinhas na antiga Ã¡rea do Artegon Marketplace. Dica: Personalize camisetas e chaveiros com artistas locais.',
      },
    ],
  },
];
