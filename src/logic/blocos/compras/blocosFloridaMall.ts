// src/logic/blocos/compras/blocosFloridaMall.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosFloridaMall: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Entrada principal do Florida Mall',
    descricaoRegiao:
      'Durante a manhÃ£: Mall mais calmo e fresco, ideal para explorar com tranquilidade.\n' +
      'Lojas: Apple, Zara, H&M, Macyâ€™s, Best Buy Mobile e loja da M&Mâ€™s logo na entrada.\n' +
      'AlimentaÃ§Ã£o e descanso: Cafeterias e Ã¡reas internas com sofÃ¡s e Wi-Fi.\n' +
      'Dica: Visite a M&Mâ€™s no inÃ­cio para fotos e lembranÃ§as coloridas.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'EletrÃ´nicos e moda',
        descricao:
          'Apple, Best Buy Mobile, Zara, H&M e Macyâ€™s logo cedo. Passe na M&Mâ€™s para fotos e souvenirs.',
        local: '8001 S Orange Blossom Trail, Orlando, FL',
        regiao: 'Florida Mall',
        area: 'Florida Mall',
        latitude: 28.4486,
        longitude: -81.3998,
      },
      {
        tipo: 'descanso',
        titulo: 'Ãrea de descanso interna',
        descricao:
          'SofÃ¡s e Wi-Fi gratuito para relaxar e reorganizar compras. EstaÃ§Ãµes de recarga prÃ³ximas Ã  Macyâ€™s.',
        local: '8001 S Orange Blossom Trail, Orlando, FL',
        regiao: 'Florida Mall',
        area: 'Florida Mall',
        latitude: 28.4486,
        longitude: -81.3998,
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Entrada sul â€“ The Dining Pavilion',
    descricaoRegiao:
      'Durante a tarde: Mais movimento, mas espaÃ§o amplo mantÃ©m conforto.\n' +
      'Lojas: American Girl, Crayola Experience, The Childrenâ€™s Place.\n' +
      'AlimentaÃ§Ã£o e descanso: PraÃ§a de alimentaÃ§Ã£o prÃ³xima Ã  fonte central.\n' +
      'Dica: VÃ¡ Ã  Crayola apÃ³s o almoÃ§o para evitar filas e aproveitar as oficinas.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Lado infantil e criativo',
        descricao:
          'American Girl, Crayola Store e The Childrenâ€™s Place. Fonte central iluminada e souvenirs criativos.',
        local: '8001 S Orange Blossom Trail, Orlando, FL',
        regiao: 'Florida Mall',
        area: 'Florida Mall',
        latitude: 28.4482,
        longitude: -81.399,
      },
      {
        tipo: 'descanso',
        titulo: 'PraÃ§a de alimentaÃ§Ã£o',
        descricao:
          'Mesas tranquilas com vista para a fonte. OpÃ§Ãµes leves e sucos frescos no Natureâ€™s Table.',
        local: 'Florida Mall Dining Pavilion',
        regiao: 'Florida Mall',
        area: 'Florida Mall',
        latitude: 28.448,
        longitude: -81.3987,
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'RegiÃ£o do The Florida Hotel',
    descricaoRegiao:
      'Durante a noite: Movimento reduzido e clima calmo.\n' +
      'Lojas: Algumas externas abertas atÃ© tarde, como Ross.\n' +
      'AlimentaÃ§Ã£o e descanso: Lobby do hotel climatizado e confortÃ¡vel.\n' +
      'Dica: Termine o dia no bar do hotel revisando as compras.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Lobby do The Florida Hotel',
        descricao:
          'Poltronas confortÃ¡veis, ar-condicionado e bar interno para relaxar.',
        local: '1500 Sand Lake Rd, Orlando, FL',
        regiao: 'Florida Mall',
        area: 'Florida Mall',
        latitude: 28.4489,
        longitude: -81.4002,
      },
      {
        tipo: 'compras',
        titulo: 'Compras noturnas no entorno',
        descricao:
          'Passeio leve pelas vitrines externas. Garimpe descontos na Ross atÃ© mais tarde.',
        local: 'Florida Mall â€“ Entrada lateral sul',
        regiao: 'Florida Mall',
        area: 'Florida Mall',
        latitude: 28.4476,
        longitude: -81.4,
      },
    ],
  },
];
