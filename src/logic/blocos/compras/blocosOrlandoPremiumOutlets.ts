ï»¿// src/logic/blocos/descanso/blocosOrlandoPremiumOutlets.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosOrlandoPremiumOutlets: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Vineland Premium Outlets',
    descricaoRegiao:
      'Durante a manhÃƒÂ£: Vineland ÃƒÂ© ideal para compras tranquilas, clima ameno e pouco movimento.\n' +
      'Lojas: Prada, Lacoste, Ralph Lauren, Michael Kors e Adidas com ofertas para os primeiros clientes.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: ÃƒÂreas cobertas com sombra, bancos e ventiladores para pausas rÃƒÂ¡pidas.\n' +
      'Dica: VÃƒÂ¡ direto ÃƒÂ  Adidas pela manhÃƒÂ£, pois costuma ter liquidaÃƒÂ§ÃƒÂµes na seÃƒÂ§ÃƒÂ£o de calÃƒÂ§ados.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Grifes com desconto no Vineland',
        descricao:
          'Explore Prada, Lacoste, Ralph Lauren e Michael Kors com preÃƒÂ§os reduzidos. Passe na Adidas logo cedo para pegar as melhores ofertas.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
      {
        tipo: 'descanso',
        titulo: 'ÃƒÂrea coberta com bancos',
        descricao:
          'EspaÃƒÂ§os cobertos com bancos e ventiladores para sentar, hidratar e organizar compras. PrÃƒÂ³ximo ÃƒÂ  Nike hÃƒÂ¡ sombra e banheiros.',
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
      'Durante a tarde: Mais movimento, mas boas oportunidades surgem apÃƒÂ³s as 15h.\n' +
      'Lojas: Disney Outlet, LeviÃ¢â‚¬â„¢s, Calvin Klein, GAP e CarterÃ¢â‚¬â„¢s com promoÃƒÂ§ÃƒÂµes e menos filas.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: PraÃƒÂ§a central com ar-condicionado, bancos e barracas de smoothies.\n' +
      'Dica: Prove o smoothie de manga com hortelÃƒÂ£ na barraca central.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Disney Outlet e infantis',
        descricao:
          'Produtos oficiais em promoÃƒÂ§ÃƒÂ£o na Disney Outlet. Veja tambÃƒÂ©m CarterÃ¢â‚¬â„¢s e The ChildrenÃ¢â‚¬â„¢s Place. Confira prateleiras centrais para liquidaÃƒÂ§ÃƒÂµes.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
      {
        tipo: 'descanso',
        titulo: 'PraÃƒÂ§a de alimentaÃƒÂ§ÃƒÂ£o (AC)',
        descricao:
          'Mesas internas e ar-condicionado para pausa do calor. Ãƒâ€œtimo para famÃƒÂ­lias. Prove o smoothie natural no centro da praÃƒÂ§a.',
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
      'Durante a noite: Ambiente calmo e iluminado, ideal para ÃƒÂºltimas compras e caminhadas leves.\n' +
      'Lojas: LeviÃ¢â‚¬â„¢s, Nike e Coach com ofertas e queimas-relÃƒÂ¢mpago.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Bancos iluminados e mÃƒÂºsica ambiente.\n' +
      'Dica: Na entrada lateral da LeviÃ¢â‚¬â„¢s hÃƒÂ¡ bancos confortÃƒÂ¡veis e Wi-Fi forte para chamar Uber.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Compras finais e ofertas',
        descricao:
          'Aproveite liquidaÃƒÂ§ÃƒÂµes do fim do dia. Revisitar lojas como LeviÃ¢â‚¬â„¢s pode render ÃƒÂ³timos achados.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
      {
        tipo: 'descanso',
        titulo: 'ÃƒÂrea externa iluminada',
        descricao:
          'Caminhada leve com luzes e mÃƒÂºsica suave. Bancos estratÃƒÂ©gicos para relaxar e fechar o dia.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
    ],
  },
];

// Metadados para exibiÃƒÂ§ÃƒÂ£o na seleÃƒÂ§ÃƒÂ£o de perfil
export const perfilOrlandoPremiumOutlets = {
  icone: 'Ã°Å¸â€ºÂÃ¯Â¸Â',
  nome: 'Orlando Premium Outlets',
  descricao:
    'Para quem busca marcas grandes com desconto: Nike, Adidas, Coach, Michael Kors e LeviÃ¢â‚¬â„¢s. Chegue cedo para evitar filas e pegar as melhores ofertas.',
};
