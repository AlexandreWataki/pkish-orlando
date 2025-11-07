export const WorldDiscovery = {
  parque: "EPCOT",
  regiao: "World Discovery",
  latitude: 28.3742,
  longitude: -81.5472,
  descricao:
    "Área dedicada à ciência, espaço e inovação, reunindo algumas das atrações mais radicais e tecnológicas do EPCOT. Ideal para quem busca velocidade, imersão e experiências futuristas.",
  imagem: "worlddiscovery.png",
  atracoes: [
    {
      id: "guardians-of-the-galaxy-cosmic-rewind",
      titulo: "Guardians of the Galaxy: Cosmic Rewind",
      subtitulo: "World Discovery",
      tipo: "Montanha-russa indoor com rotação",
      tipoPerfil: ["radicais", "imersivas", "tematicas"],
      alturaMinima: 107, // 42"
      filaExpress: true, // Lightning Lane individual / Virtual Queue
      tempoMedioFila: 75,
      filaAceitavel: 45,
      idadeRecomendada: "7+",
      turnoRecomendado: "tarde",
      atracaoSemFila: false,
      descricao:
        "Montanha-russa inovadora com rotação dos veículos e trilha dos Guardiões da Galáxia. Alta velocidade, giros suaves e diferentes músicas em cada passeio.",
      icone: "🌌",
      imagem: "cosmic-rewind.jpg",
      regiao: "World Discovery",
      parque: "EPCOT",
      latitude: 28.3743,
      longitude: -81.5468
    },
    {
      id: "test-track",
      titulo: "Test Track",
      subtitulo: "World Discovery",
      tipo: "Simulador de carro de alta velocidade",
      tipoPerfil: ["radicais", "interativas", "familiares"],
      alturaMinima: 102, // 40"
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 60,
      filaAceitavel: 40,
      idadeRecomendada: "6+",
      turnoRecomendado: "manha",
      atracaoSemFila: false,
      descricao:
        "Projete seu carro e teste aceleração, curvas e frenagens em uma pista real. O trecho final ao ar livre chega a 100 km/h — sente-se nas laterais para mais vento.",
      icone: "🏎️",
      imagem: "test-track.jpg",
      regiao: "World Discovery",
      parque: "EPCOT",
      latitude: 28.3735,
      longitude: -81.5477
    },
    {
      id: "mission-space",
      titulo: "Mission: SPACE",
      subtitulo: "World Discovery",
      tipo: "Simulador espacial com força G",
      tipoPerfil: ["imersivas", "radicais", "tematicas"],
      alturaMinima: 102, // 40"
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 35,
      filaAceitavel: 30,
      idadeRecomendada: "8+",
      turnoRecomendado: "tarde",
      atracaoSemFila: false,
      descricao:
        "Simulação de lançamento ao espaço com duas intensidades: Verde (leve) e Laranja (intensa, com força G real). Escolha conforme seu nível de coragem.",
      icone: "🚀",
      imagem: "mission-space.jpg",
      regiao: "World Discovery",
      parque: "EPCOT",
      latitude: 28.3742,
      longitude: -81.5473
    }
  ]
};
