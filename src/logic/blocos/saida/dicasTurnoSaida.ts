// src/logic/blocos/saida/dicasTurnoSaida.ts

const dicasTurnoSaida: Record<string, { titulo: string; descricao: string }> = {
  madrugada: {
    titulo: '🌙 Saída de Madrugada – Preparar e partir no escuro',
    descricao: [
      'Acorde com antecedência, especialmente se usar transporte agendado como Uber ou transfer.',
      'Check-out com malas prontas, documentos em mãos e pagamento resolvido.',
      'Confirme horário do transporte e atenção à segurança.',
      'Se não tomar café no hotel, leve snacks e água.',
      'Checklist digital: passagem, passaporte, visto, check-in feito, transporte confirmado.'
    ].join('\n'),
  },
  manha: {
    titulo: '🌅 Saída pela Manhã – Últimos detalhes antes do embarque',
    descricao: [
      'Aproveite o café da manhã do hotel se houver tempo, sem atrasos.',
      'Check-out e conferência do quarto para não esquecer nada.',
      'Confirme horário e terminal do voo e trajeto até o aeroporto.',
      'Verifique status do voo e tenha documentos em mãos.',
      'Mantenha celular carregado e carregador portátil acessível.'
    ].join('\n'),
  },
  tarde: {
    titulo: '☀️ Saída à Tarde – Organização e tempo de sobra',
    descricao: [
      'Deixe malas prontas pela manhã e, se possível, faça uma última volta rápida.',
      'Se sair, mantenha roupa de viagem separada e volte cedo ao hotel.',
      'Check-out no horário e transporte confirmado para o aeroporto.',
      'Separe documentos: passaporte, check-in, comprovante de bagagem e alfândega (se necessário).',
      'No aeroporto, relaxe, carregue eletrônicos e prepare-se para o voo.'
    ].join('\n'),
  },
  noite: {
    titulo: '🌆 Saída à Noite – Encerrando com tranquilidade',
    descricao: [
      'Aproveite o dia com calma, mas malas devem estar prontas antes do check-out.',
      'Revise documentos e transporte até o aeroporto.',
      'Faça refeição leve e evite atrasos no trajeto.',
      'Chegue ao aeroporto com 3 horas de antecedência.',
      'Checklist: documentos, power bank, água e itens de conforto.'
    ].join('\n'),
  },
};

export default dicasTurnoSaida;
