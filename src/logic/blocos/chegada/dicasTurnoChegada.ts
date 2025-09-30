const dicasTurnoChegada: Record<string, { titulo: string; descricao: string }> = {
  madrugada: {
    titulo: '🌙 Chegada de Madrugada – Modo Zumbi',
    descricao: [
      'Imigração: Rápida e com aeroporto silencioso.',
      'Transporte: Uber e Lyft funcionam mesmo de madrugada mas podem demorar então confira placa e nome.',
      'Chegada: Vá direto descansar e evite desfazer as malas.',
      'Cuidados: Beba bastante água ao acordar.',
      'Atividades: Evite parques e prefira mercados ou locais leves como Disney Springs ou ICON Park.',
      'Apps úteis: Uber, Lyft, Google Maps, Wise, My Disney Experience.',
      'Preparação: Deixe prontos roupas, ingressos, mochila e carregadores para o dia seguinte.'
    ].join('\n'),
  },

  manha: {
    titulo: '🌅 Chegada pela Manhã – Comece com leveza',
    descricao: [
      'Check-in: Faça logo que chegar e saia com apenas o necessário.',
      'Atividades: Evite parques nesse primeiro dia e foque em se organizar.',
      'Compras: Vá ao mercado ou farmácia buscar o que falta como snacks, água, adaptadores e protetor solar.',
      'Ingressos: Pegue físicos se necessário em pontos de retirada.',
      'Mochila: Organize com documentos, ingresso, boné e eletrônicos.',
      'Apps recomendados: Uber, Walmart, Disney App, iFood.',
      'Organização: Use Notion ou Google Keep para planejar os próximos dias.'
    ].join('\n'),
  },

  tarde: {
    titulo: '☀️ Chegada à Tarde – Ainda dá tempo',
    descricao: [
      'Imigração: Pode estar cheia então mantenha paciência.',
      'Hotel: Pegue só o essencial como roupa leve e carregadores.',
      'Compras rápidas: Se puder, passe em mercado ou farmácia.',
      'Alimentação: Peça comida por delivery se preferir algo prático.',
      'Passeio leve: Se estiver disposto, vá até Disney Springs ou caminhe pela região do hotel.',
      'Apps: Uber, Eats, Disney App, Calm.',
      'Descanso: Programe um alarme suave para o dia seguinte com SleepCycle.'
    ].join('\n'),
  },

  noite: {
    titulo: '🌆 Chegada à Noite – Tudo certo, descanso merecido',
    descricao: [
      'Descanso: Vá direto repousar e recarregar as energias.',
      'Essenciais: Separe pijama, documentos e roupa para amanhã.',
      'Fome: Peça algo leve no iFood ou Uber Eats.',
      'Organização: Prepare mochila com itens importantes como boné, ingresso e carregador.',
      'Atividades: Evite parques e prefira locais calmos como mercados ou ICON Park.',
      'Apps: Uber, Calm, Wise, Tradutor, Disney App.',
      'Dica extra: Use Parkify para lembrar onde estacionou.'
    ].join('\n'),
  },
};

export default dicasTurnoChegada;
