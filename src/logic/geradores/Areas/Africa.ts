export const Africa = {
  parque: "Animal Kingdom",
  descricao:
    "Inspirada na vila fictícia de Harambe, mistura cultura africana, música, gastronomia e experiências imersivas, incluindo um safári realista com animais em ambientes naturais.",
  imagem: "africa.png",
  latitude: 28.3585,
  longitude: -81.5970,
  atracoes: [
    {
      id: "kilimanjaro-safaris",
      titulo: "Kilimanjaro Safaris",
      subtitulo: "Africa",
      tipo: "Safári ao ar livre",
      tipoPerfil: [
        "familiares",
        "radicais",
        "tematicas",
        "imersivas",
        "interativas"
      ],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 45,
      filaAceitavel: 35,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Passeio em veículo aberto por savanas com girafas, leões, elefantes e outros animais. Trilha tranquila, mas pode balançar um pouco. Vá cedo para ver mais bichos e luz bonita nas fotos.",
      icone: "🦒",
      imagem: "kilimanjaro-safaris.jpg",
      regiao: "Africa",
      parque: "Animal Kingdom",
      latitude: 28.3588,
      longitude: -81.5965
    },
    // SHOW PRINCIPAL DA ÁREA (mantido mesmo sem Lightning Lane)
    {
      id: "festival-of-the-lion-king",
      titulo: "Festival of the Lion King",
      subtitulo: "Africa",
      tipo: "Show musical ao vivo",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // sem Lightning Lane, mas com entrada controlada
      tempoMedioFila: 15, // tempo médio até o próximo show
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Espetáculo vibrante com acrobacias, canto e personagens do Rei Leão. Um dos shows mais queridos do parque — chegue 20 minutos antes para um bom assento central.",
      icone: "🦁🎶",
      imagem: "festival-of-the-lion-king.jpg",
      regiao: "Africa",
      parque: "Animal Kingdom",
      latitude: 28.3580,
      longitude: -81.5971
    }
  ]
};
