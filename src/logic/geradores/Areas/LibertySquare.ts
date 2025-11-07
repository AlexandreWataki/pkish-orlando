export const LibertySquare = {
  parque: "Magic Kingdom",
  regiao: "Liberty Square",
  latitude: 28.4194,
  longitude: -81.5812,
  descricao:
    "Área com tema da era colonial americana, misturando história, patriotismo e a clássica mansão assombrada do parque.",
  imagem: "libertysquare.png",
  atracoes: [
    {
      id: "haunted-mansion",
      titulo: "Haunted Mansion",
      subtitulo: "Liberty Square",
      tipo: "Dark ride",
      tipoPerfil: ["tematicas", "imersivas", "familiares"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 45,
      filaAceitavel: 30,
      idadeRecomendada: "6+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Passeio por uma mansão assombrada repleta de fantasmas e ilusões. Repare no fantasma da noiva no salão principal.",
      icone: "👻",
      imagem: "haunted-mansion.jpg",
      regiao: "Liberty Square",
      parque: "Magic Kingdom",
      latitude: 28.4200,
      longitude: -81.5815
    },
    {
      id: "liberty-square-riverboat",
      titulo: "Liberty Square Riverboat",
      subtitulo: "Liberty Square",
      tipo: "Passeio de barco a vapor",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // fila leve / horários fixos
      tempoMedioFila: 15,
      filaAceitavel: 10,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Passeio tranquilo em barco a vapor pelo Rivers of America. Suba ao último deck para uma vista panorâmica do parque.",
      icone: "🚢",
      imagem: "liberty-riverboat.jpg",
      regiao: "Liberty Square",
      parque: "Magic Kingdom",
      latitude: 28.4192,
      longitude: -81.5809
    },
    // SHOW PRINCIPAL DA ÁREA
    {
      id: "hall-of-presidents",
      titulo: "The Hall of Presidents",
      subtitulo: "Liberty Square",
      tipo: "Show com animatrônicos",
      tipoPerfil: ["tematicas", "imersivas", "familiares"],
      alturaMinima: 0,
      filaExpress: false, // entrada por sessão (sem LL)
      tempoMedioFila: 10, // espera média até a próxima sessão
      filaAceitavel: 10,
      idadeRecomendada: "10+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Espetáculo com animatrônicos de todos os presidentes dos EUA e narração sobre a história americana. Ótimo para descansar e aproveitar o ar-condicionado.",
      icone: "🗽",
      imagem: "hall-of-presidents.jpg",
      regiao: "Liberty Square",
      parque: "Magic Kingdom",
      latitude: 28.4191,
      longitude: -81.5813
    }
  ]
};
