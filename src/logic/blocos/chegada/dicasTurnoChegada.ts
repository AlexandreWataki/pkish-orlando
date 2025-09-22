ï»¿const dicasTurnoChegada: Record<string, { titulo: string; descricao: string }> = {
  madrugada: {
    titulo: 'Ã°Å¸Å’â„¢ Chegada de Madrugada Ã¢â‚¬â€œ Modo Zumbi',
    descricao: [
      'ImigraÃƒÂ§ÃƒÂ£o: RÃƒÂ¡pida e com aeroporto silencioso.',
      'Transporte: Uber e Lyft funcionam mesmo de madrugada mas podem demorar entÃƒÂ£o confira placa e nome.',
      'Chegada: VÃƒÂ¡ direto descansar e evite desfazer as malas.',
      'Cuidados: Beba bastante ÃƒÂ¡gua ao acordar.',
      'Atividades: Evite parques e prefira mercados ou locais leves como Disney Springs ou ICON Park.',
      'Apps ÃƒÂºteis: Uber, Lyft, Google Maps, Wise, My Disney Experience.',
      'PreparaÃƒÂ§ÃƒÂ£o: Deixe prontos roupas, ingressos, mochila e carregadores para o dia seguinte.'
    ].join('\n'),
  },

  manha: {
    titulo: 'Ã°Å¸Å’â€¦ Chegada pela ManhÃƒÂ£ Ã¢â‚¬â€œ Comece com leveza',
    descricao: [
      'Check-in: FaÃƒÂ§a logo que chegar e saia com apenas o necessÃƒÂ¡rio.',
      'Atividades: Evite parques nesse primeiro dia e foque em se organizar.',
      'Compras: VÃƒÂ¡ ao mercado ou farmÃƒÂ¡cia buscar o que falta como snacks, ÃƒÂ¡gua, adaptadores e protetor solar.',
      'Ingressos: Pegue fÃƒÂ­sicos se necessÃƒÂ¡rio em pontos de retirada.',
      'Mochila: Organize com documentos, ingresso, bonÃƒÂ© e eletrÃƒÂ´nicos.',
      'Apps recomendados: Uber, Walmart, Disney App, iFood.',
      'OrganizaÃƒÂ§ÃƒÂ£o: Use Notion ou Google Keep para planejar os prÃƒÂ³ximos dias.'
    ].join('\n'),
  },

  tarde: {
    titulo: 'Ã¢Ëœâ‚¬Ã¯Â¸Â Chegada ÃƒÂ  Tarde Ã¢â‚¬â€œ Ainda dÃƒÂ¡ tempo',
    descricao: [
      'ImigraÃƒÂ§ÃƒÂ£o: Pode estar cheia entÃƒÂ£o mantenha paciÃƒÂªncia.',
      'Hotel: Pegue sÃƒÂ³ o essencial como roupa leve e carregadores.',
      'Compras rÃƒÂ¡pidas: Se puder, passe em mercado ou farmÃƒÂ¡cia.',
      'AlimentaÃƒÂ§ÃƒÂ£o: PeÃƒÂ§a comida por delivery se preferir algo prÃƒÂ¡tico.',
      'Passeio leve: Se estiver disposto, vÃƒÂ¡ atÃƒÂ© Disney Springs ou caminhe pela regiÃƒÂ£o do hotel.',
      'Apps: Uber, Eats, Disney App, Calm.',
      'Descanso: Programe um alarme suave para o dia seguinte com SleepCycle.'
    ].join('\n'),
  },

  noite: {
    titulo: 'Ã°Å¸Å’â€  Chegada ÃƒÂ  Noite Ã¢â‚¬â€œ Tudo certo, descanso merecido',
    descricao: [
      'Descanso: VÃƒÂ¡ direto repousar e recarregar as energias.',
      'Essenciais: Separe pijama, documentos e roupa para amanhÃƒÂ£.',
      'Fome: PeÃƒÂ§a algo leve no iFood ou Uber Eats.',
      'OrganizaÃƒÂ§ÃƒÂ£o: Prepare mochila com itens importantes como bonÃƒÂ©, ingresso e carregador.',
      'Atividades: Evite parques e prefira locais calmos como mercados ou ICON Park.',
      'Apps: Uber, Calm, Wise, Tradutor, Disney App.',
      'Dica extra: Use Parkify para lembrar onde estacionou.'
    ].join('\n'),
  },
};

export default dicasTurnoChegada;
