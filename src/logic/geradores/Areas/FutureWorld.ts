export const FutureWorld = {
  parque: "Epcot",
  regiao: "Future World",
  latitude: 28.3747,
  longitude: -81.5494,
  descricao:
    "Antiga área principal do Epcot dedicada à ciência, tecnologia e inovação. Hoje abriga atrações clássicas que mantêm o espírito futurista em experiências educativas e imersivas.",
  imagem: "futureworld.png",
  atracoes: [
    {
      id: "spaceship-earth",
      titulo: "Spaceship Earth",
      subtitulo: "Future World",
      tipo: "Dark ride educativa",
      tipoPerfil: ["tematicas", "imersivas", "familiares"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 30,
      filaAceitavel: 25,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Viagem pelo tempo dentro do ícone do Epcot, mostrando a evolução da comunicação humana. Passeio calmo, climatizado e cheio de detalhes históricos.",
      icone: "🌐",
      imagem: "spaceship-earth.jpg",
      regiao: "Future World",
      parque: "Epcot",
      latitude: 28.3745,
      longitude: -81.5496
    },
    {
      id: "journey-into-imagination",
      titulo: "Journey Into Imagination with Figment",
      subtitulo: "Future World",
      tipo: "Dark ride criativa",
      tipoPerfil: ["interativas", "familiares", "tematicas"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 20,
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Passeio divertido com Figment explorando os sentidos e a imaginação. Colorido, leve e repleto de surpresas visuais e sonoras.",
      icone: "🎨",
      imagem: "journey-into-imagination.jpg",
      regiao: "Future World",
      parque: "Epcot",
      latitude: 28.3742,
      longitude: -81.5498
    }
  ]
};
