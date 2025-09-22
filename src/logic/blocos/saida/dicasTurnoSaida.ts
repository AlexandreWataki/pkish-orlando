﻿// src/logic/blocos/saida/dicasTurnoSaida.ts

const dicasTurnoSaida: Record<string, { titulo: string; descricao: string }> = {
  madrugada: {
    titulo: 'ðŸŒ™ SaÃ­da de Madrugada â€“ Preparar e partir no escuro',
    descricao: [
      'Acorde com antecedÃªncia, especialmente se usar transporte agendado como Uber ou transfer.',
      'Check-out com malas prontas, documentos em mÃ£os e pagamento resolvido.',
      'Confirme horÃ¡rio do transporte e atenÃ§Ã£o Ã  seguranÃ§a.',
      'Se nÃ£o tomar cafÃ© no hotel, leve snacks e Ã¡gua.',
      'Checklist digital: passagem, passaporte, visto, check-in feito, transporte confirmado.'
    ].join('\n'),
  },
  manha: {
    titulo: 'ðŸŒ… SaÃ­da pela ManhÃ£ â€“ Ãšltimos detalhes antes do embarque',
    descricao: [
      'Aproveite o cafÃ© da manhÃ£ do hotel se houver tempo, sem atrasos.',
      'Check-out e conferÃªncia do quarto para nÃ£o esquecer nada.',
      'Confirme horÃ¡rio e terminal do voo e trajeto atÃ© o aeroporto.',
      'Verifique status do voo e tenha documentos em mÃ£os.',
      'Mantenha celular carregado e carregador portÃ¡til acessÃ­vel.'
    ].join('\n'),
  },
  tarde: {
    titulo: 'â˜€ï¸ SaÃ­da Ã  Tarde â€“ OrganizaÃ§Ã£o e tempo de sobra',
    descricao: [
      'Deixe malas prontas pela manhÃ£ e, se possÃ­vel, faÃ§a uma Ãºltima volta rÃ¡pida.',
      'Se sair, mantenha roupa de viagem separada e volte cedo ao hotel.',
      'Check-out no horÃ¡rio e transporte confirmado para o aeroporto.',
      'Separe documentos: passaporte, check-in, comprovante de bagagem e alfÃ¢ndega (se necessÃ¡rio).',
      'No aeroporto, relaxe, carregue eletrÃ´nicos e prepare-se para o voo.'
    ].join('\n'),
  },
  noite: {
    titulo: 'ðŸŒ† SaÃ­da Ã  Noite â€“ Encerrando com tranquilidade',
    descricao: [
      'Aproveite o dia com calma, mas malas devem estar prontas antes do check-out.',
      'Revise documentos e transporte atÃ© o aeroporto.',
      'FaÃ§a refeiÃ§Ã£o leve e evite atrasos no trajeto.',
      'Chegue ao aeroporto com 3 horas de antecedÃªncia.',
      'Checklist: documentos, power bank, Ã¡gua e itens de conforto.'
    ].join('\n'),
  },
};

export default dicasTurnoSaida;
