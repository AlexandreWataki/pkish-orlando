export const WorldNature = {
  parque: "EPCOT",
  regiao: "World Nature",
  latitude: 28.3730,
  longitude: -81.5510,
  descricao:
    "Área voltada para experiências sensoriais, oceanos e sustentabilidade, com atrações que misturam aprendizado e diversão para todas as idades.",
  imagem: "worldnature.png",
  atracoes: [
    {
      id: "soarin-around-the-world",
      titulo: "Soarin’ Around the World",
      subtitulo: "World Nature",
      tipo: "Simulador de voo panorâmico",
      tipoPerfil: ["imersivas", "familiares", "tematicas"],
      alturaMinima: 102, // 40"
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 50,
      filaAceitavel: 35,
      idadeRecomendada: "6+",
      turnoRecomendado: "manha",
      atracaoSemFila: false,
      descricao:
        "Simulador de voo em tela IMAX com vento e aromas sobre paisagens do mundo. Experiência suave e emocionante; sente-se na fileira central para melhor visualização.",
      icone: "🪂",
      imagem: "soarin.jpg",
      regiao: "World Nature",
      parque: "EPCOT",
      latitude: 28.3726,
      longitude: -81.5502
    },
    {
      id: "living-with-the-land",
      titulo: "Living with the Land",
      subtitulo: "World Nature",
      tipo: "Passeio educativo de barco",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 25,
      filaAceitavel: 20,
      idadeRecomendada: "Todas as idades",
      turnoRecomendado: "tarde",
      atracaoSemFila: false,
      descricao:
        "Passeio tranquilo por estufas e laboratórios de cultivo que mostram técnicas agrícolas sustentáveis. Ideal para relaxar e tirar fotos nas estufas.",
      icone: "🌿",
      imagem: "living-with-the-land.jpg",
      regiao: "World Nature",
      parque: "EPCOT",
      latitude: 28.3729,
      longitude: -81.5501
    },
    {
      id: "the-seas-nemo-friends",
      titulo: "The Seas with Nemo & Friends",
      subtitulo: "World Nature",
      tipo: "Passeio de carrinho subaquático",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 30,
      filaAceitavel: 25,
      idadeRecomendada: "Todas as idades",
      turnoRecomendado: "manha",
      atracaoSemFila: false,
      descricao:
        "Passeio leve por cenários subaquáticos com Nemo e seus amigos, terminando em um grande aquário real. Colorido e relaxante, ótimo para todas as idades.",
      icone: "🐠",
      imagem: "nemo-friends.jpg",
      regiao: "World Nature",
      parque: "EPCOT",
      latitude: 28.3750,
      longitude: -81.5508
    },
    // SHOW PRINCIPAL DA ÁREA
    {
      id: "turtle-talk-with-crush",
      titulo: "Turtle Talk with Crush",
      subtitulo: "World Nature",
      tipo: "Show interativo digital",
      tipoPerfil: ["interativas", "familiares", "tematicas"],
      alturaMinima: 0,
      filaExpress: false, // entrada por sessão (sem LL)
      tempoMedioFila: 10,
      filaAceitavel: 10,
      idadeRecomendada: "Todas as idades",
      turnoRecomendado: "tarde",
      atracaoSemFila: false,
      descricao:
        "Show digital interativo onde Crush conversa com o público. Divertido e climatizado; incentive as crianças a fazer perguntas e chegue cedo para bons assentos.",
      icone: "🐢",
      imagem: "turtle-talk.jpg",
      regiao: "World Nature",
      parque: "EPCOT",
      latitude: 28.3747,
      longitude: -81.5506
    }
  ]
};
