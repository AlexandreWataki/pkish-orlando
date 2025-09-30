// src/logic/blocos/compras/blocosComprasAlternativasLocais.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosComprasAlternativasLocais: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Downtown Orlando – Church Street',
    descricaoRegiao:
      'Durante a manhã: Downtown Orlando, especialmente a Church Street, é ideal para um início calmo, com construções históricas e ruas arborizadas.\n' +
      'Lojas: Pequenos mercadinhos, lojas conceito e butiques alternativas oferecem produtos artesanais, retrô e exclusivos.\n' +
      'Alimentação e descanso: Cafés com mesas externas e opções artesanais são perfeitos para uma pausa.\n' +
      'Dica: Vá cedo ao "The Lovely Boutique Market" para garantir peças sustentáveis e vintage antes que acabem.',
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
          'Caminhe por mercadinhos e lojas conceito da Church Street. Encontre butiques locais e peças vintage. Dica: Visite cedo o "The Lovely Boutique Market" para achar produtos únicos.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Colonial Plaza Mall',
    descricaoRegiao:
      'Durante a tarde: East Colonial recebe mais movimento, mas mantém áreas abertas e bem distribuídas.\n' +
      'Lojas: Colonial Plaza Mall com Ross, Marshalls, Hobby Lobby e Five Below, ideais para economia e variedade.\n' +
      'Alimentação e descanso: Restaurantes casuais, cafés e food trucks próximos às lojas.\n' +
      'Dica: Entre na Ross pelas entradas laterais e vá direto à seção de utensílios domésticos antes das 16h.',
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
          'Explore o Colonial Plaza Mall, com lojas acessíveis como Ross e Marshalls. Dica: Na Ross, vá primeiro aos utensílios domésticos.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Artegon Marketplace',
    descricaoRegiao:
      'Durante a noite: A International Drive fica movimentada com feirinhas, lojinhas criativas e atrações culturais.\n' +
      'Lojas: Pequenos comércios independentes vendem arte local, camisetas criativas e suvenires exclusivos.\n' +
      'Alimentação e descanso: Food trucks, bares e cafés funcionam até tarde, com áreas iluminadas para relaxar.\n' +
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
          'Visite feiras e lojinhas na antiga área do Artegon Marketplace. Dica: Personalize camisetas e chaveiros com artistas locais.',
      },
    ],
  },
];
