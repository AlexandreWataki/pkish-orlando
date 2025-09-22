// src/logic/blocos/descanso/blocosOrlandoPremiumOutlets.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosOrlandoPremiumOutlets: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Vineland Premium Outlets',
    descricaoRegiao:
      'Durante a manhÃ£: Vineland Ã© ideal para compras tranquilas, clima ameno e pouco movimento.\n' +
      'Lojas: Prada, Lacoste, Ralph Lauren, Michael Kors e Adidas com ofertas para os primeiros clientes.\n' +
      'AlimentaÃ§Ã£o e descanso: Ãreas cobertas com sombra, bancos e ventiladores para pausas rÃ¡pidas.\n' +
      'Dica: VÃ¡ direto Ã  Adidas pela manhÃ£, pois costuma ter liquidaÃ§Ãµes na seÃ§Ã£o de calÃ§ados.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Grifes com desconto no Vineland',
        descricao:
          'Explore Prada, Lacoste, Ralph Lauren e Michael Kors com preÃ§os reduzidos. Passe na Adidas logo cedo para pegar as melhores ofertas.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
      {
        tipo: 'descanso',
        titulo: 'Ãrea coberta com bancos',
        descricao:
          'EspaÃ§os cobertos com bancos e ventiladores para sentar, hidratar e organizar compras. PrÃ³ximo Ã  Nike hÃ¡ sombra e banheiros.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Vineland Premium Outlets',
    descricaoRegiao:
      'Durante a tarde: Mais movimento, mas boas oportunidades surgem apÃ³s as 15h.\n' +
      'Lojas: Disney Outlet, Leviâ€™s, Calvin Klein, GAP e Carterâ€™s com promoÃ§Ãµes e menos filas.\n' +
      'AlimentaÃ§Ã£o e descanso: PraÃ§a central com ar-condicionado, bancos e barracas de smoothies.\n' +
      'Dica: Prove o smoothie de manga com hortelÃ£ na barraca central.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Disney Outlet e infantis',
        descricao:
          'Produtos oficiais em promoÃ§Ã£o na Disney Outlet. Veja tambÃ©m Carterâ€™s e The Childrenâ€™s Place. Confira prateleiras centrais para liquidaÃ§Ãµes.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
      {
        tipo: 'descanso',
        titulo: 'PraÃ§a de alimentaÃ§Ã£o (AC)',
        descricao:
          'Mesas internas e ar-condicionado para pausa do calor. Ã“timo para famÃ­lias. Prove o smoothie natural no centro da praÃ§a.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Vineland Premium Outlets',
    descricaoRegiao:
      'Durante a noite: Ambiente calmo e iluminado, ideal para Ãºltimas compras e caminhadas leves.\n' +
      'Lojas: Leviâ€™s, Nike e Coach com ofertas e queimas-relÃ¢mpago.\n' +
      'AlimentaÃ§Ã£o e descanso: Bancos iluminados e mÃºsica ambiente.\n' +
      'Dica: Na entrada lateral da Leviâ€™s hÃ¡ bancos confortÃ¡veis e Wi-Fi forte para chamar Uber.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Compras finais e ofertas',
        descricao:
          'Aproveite liquidaÃ§Ãµes do fim do dia. Revisitar lojas como Leviâ€™s pode render Ã³timos achados.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
      {
        tipo: 'descanso',
        titulo: 'Ãrea externa iluminada',
        descricao:
          'Caminhada leve com luzes e mÃºsica suave. Bancos estratÃ©gicos para relaxar e fechar o dia.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
    ],
  },
];

// Metadados para exibiÃ§Ã£o na seleÃ§Ã£o de perfil
export const perfilOrlandoPremiumOutlets = {
  icone: 'ðŸ›ï¸',
  nome: 'Orlando Premium Outlets',
  descricao:
    'Para quem busca marcas grandes com desconto: Nike, Adidas, Coach, Michael Kors e Leviâ€™s. Chegue cedo para evitar filas e pegar as melhores ofertas.',
};
