export const WorldShowcase = {
  parque: "EPCOT",
  regiao: "World Showcase",
  latitude: 28.3691,
  longitude: -81.5485,
  descricao:
    "Área com pavilhões de 11 países, reunindo culinária, cultura e algumas das filas mais queridas do EPCOT.",
  imagem: "worldshowcase.png",
  atracoes: [
    {
      id: "frozen-ever-after",
      titulo: "Frozen Ever After",
      subtitulo: "World Showcase",
      tipo: "Passeio de barco temático",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 65,
      filaAceitavel: 40,
      idadeRecomendada: "Todas as idades",
      turnoRecomendado: "manha",
      atracaoSemFila: false,
      descricao:
        "Barcos por Arendelle com animatrônicos e músicas do filme. Leves quedas e clima gelado — ótimo para fãs de Frozen.",
      icone: "❄️",
      imagem: "frozen.jpg",
      regiao: "World Showcase",
      parque: "EPCOT",
      latitude: 28.3725,
      longitude: -81.5476
    },
    {
      id: "remys-ratatouille-adventure",
      titulo: "Remy’s Ratatouille Adventure",
      subtitulo: "Pavilhão da França",
      tipo: "Dark ride 3D",
      tipoPerfil: ["familiares", "imersivas", "tematicas"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 45,
      filaAceitavel: 35,
      idadeRecomendada: "Todas as idades",
      turnoRecomendado: "tarde",
      atracaoSemFila: false,
      descricao:
        "Você encolhe ao tamanho de um rato e corre pela cozinha do Gusteau. Efeitos de cheiro, água e calor deixam tudo mais imersivo.",
      icone: "🐭",
      imagem: "ratatouille.jpg",
      regiao: "World Showcase",
      parque: "EPCOT",
      latitude: 28.3711,
      longitude: -81.5497
    },
    {
      id: "gran-fiesta-tour",
      titulo: "Gran Fiesta Tour Starring The Three Caballeros",
      subtitulo: "Pavilhão do México",
      tipo: "Passeio de barco",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // fila comum
      tempoMedioFila: 20,
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      turnoRecomendado: "manha",
      atracaoSemFila: false,
      descricao:
        "Barco leve e colorido com Donald e os Três Caballeros pelo México. Ótimo para dar uma pausa nas filas longas.",
      icone: "🛶",
      imagem: "gran-fiesta-tour.jpg",
      regiao: "World Showcase",
      parque: "EPCOT",
      latitude: 28.3681,
      longitude: -81.5502
    },

    // SHOW PRINCIPAL DO WORLD SHOWCASE
    {
      id: "the-american-adventure",
      titulo: "The American Adventure",
      subtitulo: "Pavilhão dos EUA",
      tipo: "Show com animatrônicos",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // entrada por sessão
      tempoMedioFila: 10,
      filaAceitavel: 10,
      idadeRecomendada: "Todas as idades",
      turnoRecomendado: "noite",
      atracaoSemFila: false,
      descricao:
        "Grande espetáculo com animatrônicos e trilha épica contando a história dos EUA. Sente-se no centro para a melhor visão do palco.",
      icone: "🗽",
      imagem: "american-adventure.jpg",
      regiao: "World Showcase",
      parque: "EPCOT",
      latitude: 28.3699,
      longitude: -81.5487
    }
  ]
};
