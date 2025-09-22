ï»¿// src/logic/blocos/saida/dicasTurnoSaida.ts

const dicasTurnoSaida: Record<string, { titulo: string; descricao: string }> = {
  madrugada: {
    titulo: 'Ã°Å¸Å’â„¢ SaÃƒÂ­da de Madrugada Ã¢â‚¬â€œ Preparar e partir no escuro',
    descricao: [
      'Acorde com antecedÃƒÂªncia, especialmente se usar transporte agendado como Uber ou transfer.',
      'Check-out com malas prontas, documentos em mÃƒÂ£os e pagamento resolvido.',
      'Confirme horÃƒÂ¡rio do transporte e atenÃƒÂ§ÃƒÂ£o ÃƒÂ  seguranÃƒÂ§a.',
      'Se nÃƒÂ£o tomar cafÃƒÂ© no hotel, leve snacks e ÃƒÂ¡gua.',
      'Checklist digital: passagem, passaporte, visto, check-in feito, transporte confirmado.'
    ].join('\n'),
  },
  manha: {
    titulo: 'Ã°Å¸Å’â€¦ SaÃƒÂ­da pela ManhÃƒÂ£ Ã¢â‚¬â€œ ÃƒÅ¡ltimos detalhes antes do embarque',
    descricao: [
      'Aproveite o cafÃƒÂ© da manhÃƒÂ£ do hotel se houver tempo, sem atrasos.',
      'Check-out e conferÃƒÂªncia do quarto para nÃƒÂ£o esquecer nada.',
      'Confirme horÃƒÂ¡rio e terminal do voo e trajeto atÃƒÂ© o aeroporto.',
      'Verifique status do voo e tenha documentos em mÃƒÂ£os.',
      'Mantenha celular carregado e carregador portÃƒÂ¡til acessÃƒÂ­vel.'
    ].join('\n'),
  },
  tarde: {
    titulo: 'Ã¢Ëœâ‚¬Ã¯Â¸Â SaÃƒÂ­da ÃƒÂ  Tarde Ã¢â‚¬â€œ OrganizaÃƒÂ§ÃƒÂ£o e tempo de sobra',
    descricao: [
      'Deixe malas prontas pela manhÃƒÂ£ e, se possÃƒÂ­vel, faÃƒÂ§a uma ÃƒÂºltima volta rÃƒÂ¡pida.',
      'Se sair, mantenha roupa de viagem separada e volte cedo ao hotel.',
      'Check-out no horÃƒÂ¡rio e transporte confirmado para o aeroporto.',
      'Separe documentos: passaporte, check-in, comprovante de bagagem e alfÃƒÂ¢ndega (se necessÃƒÂ¡rio).',
      'No aeroporto, relaxe, carregue eletrÃƒÂ´nicos e prepare-se para o voo.'
    ].join('\n'),
  },
  noite: {
    titulo: 'Ã°Å¸Å’â€  SaÃƒÂ­da ÃƒÂ  Noite Ã¢â‚¬â€œ Encerrando com tranquilidade',
    descricao: [
      'Aproveite o dia com calma, mas malas devem estar prontas antes do check-out.',
      'Revise documentos e transporte atÃƒÂ© o aeroporto.',
      'FaÃƒÂ§a refeiÃƒÂ§ÃƒÂ£o leve e evite atrasos no trajeto.',
      'Chegue ao aeroporto com 3 horas de antecedÃƒÂªncia.',
      'Checklist: documentos, power bank, ÃƒÂ¡gua e itens de conforto.'
    ].join('\n'),
  },
};

export default dicasTurnoSaida;
