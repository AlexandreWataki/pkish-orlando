// src/logic/blocos/descanso/blocosOrlandoPremiumOutlets.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosOrlandoPremiumOutlets: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Vineland Premium Outlets',
    descricaoRegiao:
      'Durante a manhã: Vineland é ideal para compras tranquilas, clima ameno e pouco movimento.\n' +
      'Lojas: Prada, Lacoste, Ralph Lauren, Michael Kors e Adidas com ofertas para os primeiros clientes.\n' +
      'Alimentação e descanso: Áreas cobertas com sombra, bancos e ventiladores para pausas rápidas.\n' +
      'Dica: Vá direto à Adidas pela manhã, pois costuma ter liquidações na seção de calçados.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Grifes com desconto no Vineland',
        descricao:
          'Explore Prada, Lacoste, Ralph Lauren e Michael Kors com preços reduzidos. Passe na Adidas logo cedo para pegar as melhores ofertas.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
      {
        tipo: 'descanso',
        titulo: 'Área coberta com bancos',
        descricao:
          'Espaços cobertos com bancos e ventiladores para sentar, hidratar e organizar compras. Próximo à Nike há sombra e banheiros.',
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
      'Durante a tarde: Mais movimento, mas boas oportunidades surgem após as 15h.\n' +
      'Lojas: Disney Outlet, Levi’s, Calvin Klein, GAP e Carter’s com promoções e menos filas.\n' +
      'Alimentação e descanso: Praça central com ar-condicionado, bancos e barracas de smoothies.\n' +
      'Dica: Prove o smoothie de manga com hortelã na barraca central.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Disney Outlet e infantis',
        descricao:
          'Produtos oficiais em promoção na Disney Outlet. Veja também Carter’s e The Children’s Place. Confira prateleiras centrais para liquidações.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
      {
        tipo: 'descanso',
        titulo: 'Praça de alimentação (AC)',
        descricao:
          'Mesas internas e ar-condicionado para pausa do calor. Ótimo para famílias. Prove o smoothie natural no centro da praça.',
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
      'Durante a noite: Ambiente calmo e iluminado, ideal para últimas compras e caminhadas leves.\n' +
      'Lojas: Levi’s, Nike e Coach com ofertas e queimas-relâmpago.\n' +
      'Alimentação e descanso: Bancos iluminados e música ambiente.\n' +
      'Dica: Na entrada lateral da Levi’s há bancos confortáveis e Wi-Fi forte para chamar Uber.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Compras finais e ofertas',
        descricao:
          'Aproveite liquidações do fim do dia. Revisitar lojas como Levi’s pode render ótimos achados.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
      {
        tipo: 'descanso',
        titulo: 'Área externa iluminada',
        descricao:
          'Caminhada leve com luzes e música suave. Bancos estratégicos para relaxar e fechar o dia.',
        local: '8200 Vineland Ave, Orlando, FL',
        regiao: 'Vineland',
        latitude: 28.3852,
        longitude: -81.4897,
      },
    ],
  },
];

// Metadados para exibição na seleção de perfil
export const perfilOrlandoPremiumOutlets = {
  icone: '🛍️',
  nome: 'Orlando Premium Outlets',
  descricao:
    'Para quem busca marcas grandes com desconto: Nike, Adidas, Coach, Michael Kors e Levi’s. Chegue cedo para evitar filas e pegar as melhores ofertas.',
};
