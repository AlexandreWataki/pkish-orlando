// src/logic/blocos/compras/blocosFloridaMall.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosFloridaMall: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Entrada principal do Florida Mall',
    descricaoRegiao:
      'Durante a manhã: Mall mais calmo e fresco, ideal para explorar com tranquilidade.\n' +
      'Lojas: Apple, Zara, H&M, Macy’s, Best Buy Mobile e loja da M&M’s logo na entrada.\n' +
      'Alimentação e descanso: Cafeterias e áreas internas com sofás e Wi-Fi.\n' +
      'Dica: Visite a M&M’s no início para fotos e lembranças coloridas.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Eletrônicos e moda',
        descricao:
          'Apple, Best Buy Mobile, Zara, H&M e Macy’s logo cedo. Passe na M&M’s para fotos e souvenirs.',
        local: '8001 S Orange Blossom Trail, Orlando, FL',
        regiao: 'Florida Mall',
        area: 'Florida Mall',
        latitude: 28.4486,
        longitude: -81.3998,
      },
      {
        tipo: 'descanso',
        titulo: 'Área de descanso interna',
        descricao:
          'Sofás e Wi-Fi gratuito para relaxar e reorganizar compras. Estações de recarga próximas à Macy’s.',
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
    referencia: 'Entrada sul – The Dining Pavilion',
    descricaoRegiao:
      'Durante a tarde: Mais movimento, mas espaço amplo mantém conforto.\n' +
      'Lojas: American Girl, Crayola Experience, The Children’s Place.\n' +
      'Alimentação e descanso: Praça de alimentação próxima à fonte central.\n' +
      'Dica: Vá à Crayola após o almoço para evitar filas e aproveitar as oficinas.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Lado infantil e criativo',
        descricao:
          'American Girl, Crayola Store e The Children’s Place. Fonte central iluminada e souvenirs criativos.',
        local: '8001 S Orange Blossom Trail, Orlando, FL',
        regiao: 'Florida Mall',
        area: 'Florida Mall',
        latitude: 28.4482,
        longitude: -81.399,
      },
      {
        tipo: 'descanso',
        titulo: 'Praça de alimentação',
        descricao:
          'Mesas tranquilas com vista para a fonte. Opções leves e sucos frescos no Nature’s Table.',
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
    referencia: 'Região do The Florida Hotel',
    descricaoRegiao:
      'Durante a noite: Movimento reduzido e clima calmo.\n' +
      'Lojas: Algumas externas abertas até tarde, como Ross.\n' +
      'Alimentação e descanso: Lobby do hotel climatizado e confortável.\n' +
      'Dica: Termine o dia no bar do hotel revisando as compras.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Lobby do The Florida Hotel',
        descricao:
          'Poltronas confortáveis, ar-condicionado e bar interno para relaxar.',
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
          'Passeio leve pelas vitrines externas. Garimpe descontos na Ross até mais tarde.',
        local: 'Florida Mall – Entrada lateral sul',
        regiao: 'Florida Mall',
        area: 'Florida Mall',
        latitude: 28.4476,
        longitude: -81.4,
      },
    ],
  },
];
