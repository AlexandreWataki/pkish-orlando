ï»¿// src/logic/blocos/compras/blocosFloridaMall.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosFloridaMall: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Entrada principal do Florida Mall',
    descricaoRegiao:
      'Durante a manhÃƒÂ£: Mall mais calmo e fresco, ideal para explorar com tranquilidade.\n' +
      'Lojas: Apple, Zara, H&M, MacyÃ¢â‚¬â„¢s, Best Buy Mobile e loja da M&MÃ¢â‚¬â„¢s logo na entrada.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Cafeterias e ÃƒÂ¡reas internas com sofÃƒÂ¡s e Wi-Fi.\n' +
      'Dica: Visite a M&MÃ¢â‚¬â„¢s no inÃƒÂ­cio para fotos e lembranÃƒÂ§as coloridas.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'EletrÃƒÂ´nicos e moda',
        descricao:
          'Apple, Best Buy Mobile, Zara, H&M e MacyÃ¢â‚¬â„¢s logo cedo. Passe na M&MÃ¢â‚¬â„¢s para fotos e souvenirs.',
        local: '8001 S Orange Blossom Trail, Orlando, FL',
        regiao: 'Florida Mall',
        area: 'Florida Mall',
        latitude: 28.4486,
        longitude: -81.3998,
      },
      {
        tipo: 'descanso',
        titulo: 'ÃƒÂrea de descanso interna',
        descricao:
          'SofÃƒÂ¡s e Wi-Fi gratuito para relaxar e reorganizar compras. EstaÃƒÂ§ÃƒÂµes de recarga prÃƒÂ³ximas ÃƒÂ  MacyÃ¢â‚¬â„¢s.',
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
    referencia: 'Entrada sul Ã¢â‚¬â€œ The Dining Pavilion',
    descricaoRegiao:
      'Durante a tarde: Mais movimento, mas espaÃƒÂ§o amplo mantÃƒÂ©m conforto.\n' +
      'Lojas: American Girl, Crayola Experience, The ChildrenÃ¢â‚¬â„¢s Place.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: PraÃƒÂ§a de alimentaÃƒÂ§ÃƒÂ£o prÃƒÂ³xima ÃƒÂ  fonte central.\n' +
      'Dica: VÃƒÂ¡ ÃƒÂ  Crayola apÃƒÂ³s o almoÃƒÂ§o para evitar filas e aproveitar as oficinas.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Lado infantil e criativo',
        descricao:
          'American Girl, Crayola Store e The ChildrenÃ¢â‚¬â„¢s Place. Fonte central iluminada e souvenirs criativos.',
        local: '8001 S Orange Blossom Trail, Orlando, FL',
        regiao: 'Florida Mall',
        area: 'Florida Mall',
        latitude: 28.4482,
        longitude: -81.399,
      },
      {
        tipo: 'descanso',
        titulo: 'PraÃƒÂ§a de alimentaÃƒÂ§ÃƒÂ£o',
        descricao:
          'Mesas tranquilas com vista para a fonte. OpÃƒÂ§ÃƒÂµes leves e sucos frescos no NatureÃ¢â‚¬â„¢s Table.',
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
    referencia: 'RegiÃƒÂ£o do The Florida Hotel',
    descricaoRegiao:
      'Durante a noite: Movimento reduzido e clima calmo.\n' +
      'Lojas: Algumas externas abertas atÃƒÂ© tarde, como Ross.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Lobby do hotel climatizado e confortÃƒÂ¡vel.\n' +
      'Dica: Termine o dia no bar do hotel revisando as compras.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Lobby do The Florida Hotel',
        descricao:
          'Poltronas confortÃƒÂ¡veis, ar-condicionado e bar interno para relaxar.',
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
          'Passeio leve pelas vitrines externas. Garimpe descontos na Ross atÃƒÂ© mais tarde.',
        local: 'Florida Mall Ã¢â‚¬â€œ Entrada lateral sul',
        regiao: 'Florida Mall',
        area: 'Florida Mall',
        latitude: 28.4476,
        longitude: -81.4,
      },
    ],
  },
];
