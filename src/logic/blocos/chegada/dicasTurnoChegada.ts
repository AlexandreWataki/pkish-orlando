const dicasTurnoChegada: Record<string, { titulo: string; descricao: string }> = {
  madrugada: {
    titulo: 'ðŸŒ™ Chegada de Madrugada â€“ Modo Zumbi',
    descricao: [
      'ImigraÃ§Ã£o: RÃ¡pida e com aeroporto silencioso.',
      'Transporte: Uber e Lyft funcionam mesmo de madrugada mas podem demorar entÃ£o confira placa e nome.',
      'Chegada: VÃ¡ direto descansar e evite desfazer as malas.',
      'Cuidados: Beba bastante Ã¡gua ao acordar.',
      'Atividades: Evite parques e prefira mercados ou locais leves como Disney Springs ou ICON Park.',
      'Apps Ãºteis: Uber, Lyft, Google Maps, Wise, My Disney Experience.',
      'PreparaÃ§Ã£o: Deixe prontos roupas, ingressos, mochila e carregadores para o dia seguinte.'
    ].join('\n'),
  },

  manha: {
    titulo: 'ðŸŒ… Chegada pela ManhÃ£ â€“ Comece com leveza',
    descricao: [
      'Check-in: FaÃ§a logo que chegar e saia com apenas o necessÃ¡rio.',
      'Atividades: Evite parques nesse primeiro dia e foque em se organizar.',
      'Compras: VÃ¡ ao mercado ou farmÃ¡cia buscar o que falta como snacks, Ã¡gua, adaptadores e protetor solar.',
      'Ingressos: Pegue fÃ­sicos se necessÃ¡rio em pontos de retirada.',
      'Mochila: Organize com documentos, ingresso, bonÃ© e eletrÃ´nicos.',
      'Apps recomendados: Uber, Walmart, Disney App, iFood.',
      'OrganizaÃ§Ã£o: Use Notion ou Google Keep para planejar os prÃ³ximos dias.'
    ].join('\n'),
  },

  tarde: {
    titulo: 'â˜€ï¸ Chegada Ã  Tarde â€“ Ainda dÃ¡ tempo',
    descricao: [
      'ImigraÃ§Ã£o: Pode estar cheia entÃ£o mantenha paciÃªncia.',
      'Hotel: Pegue sÃ³ o essencial como roupa leve e carregadores.',
      'Compras rÃ¡pidas: Se puder, passe em mercado ou farmÃ¡cia.',
      'AlimentaÃ§Ã£o: PeÃ§a comida por delivery se preferir algo prÃ¡tico.',
      'Passeio leve: Se estiver disposto, vÃ¡ atÃ© Disney Springs ou caminhe pela regiÃ£o do hotel.',
      'Apps: Uber, Eats, Disney App, Calm.',
      'Descanso: Programe um alarme suave para o dia seguinte com SleepCycle.'
    ].join('\n'),
  },

  noite: {
    titulo: 'ðŸŒ† Chegada Ã  Noite â€“ Tudo certo, descanso merecido',
    descricao: [
      'Descanso: VÃ¡ direto repousar e recarregar as energias.',
      'Essenciais: Separe pijama, documentos e roupa para amanhÃ£.',
      'Fome: PeÃ§a algo leve no iFood ou Uber Eats.',
      'OrganizaÃ§Ã£o: Prepare mochila com itens importantes como bonÃ©, ingresso e carregador.',
      'Atividades: Evite parques e prefira locais calmos como mercados ou ICON Park.',
      'Apps: Uber, Calm, Wise, Tradutor, Disney App.',
      'Dica extra: Use Parkify para lembrar onde estacionou.'
    ].join('\n'),
  },
};

export default dicasTurnoChegada;
