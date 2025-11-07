export const SunsetBoulevard = {
  parque: "Hollywood Studios",
  regiao: "Sunset Boulevard",
  latitude: 28.3554,
  longitude: -81.5618,
  descricao:
    "Avenida com visual de cinema clássico que leva a atrações radicais e grandes espetáculos. Fica ainda mais bonita ao pôr do sol, com letreiros iluminados.",
  imagem: "sunsetboulevard.png",
  atracoes: [
    {
      id: "tower-of-terror",
      titulo: "The Twilight Zone Tower of Terror",
      subtitulo: "Sunset Boulevard",
      tipo: "Queda livre temática",
      tipoPerfil: ["radicais", "tematicas", "imersivas"],
      alturaMinima: 102, // 40"
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 55,
      filaAceitavel: 35,
      idadeRecomendada: "8+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Hotel mal-assombrado com elevadores desgovernados, quedas imprevisíveis e atmosfera de suspense. Sente-se próximo às janelas para vistas incríveis de Hollywood Studios.",
      icone: "🏨⚡",
      imagem: "tower-of-terror.jpg",
      regiao: "Sunset Boulevard",
      parque: "Hollywood Studios",
      latitude: 28.3557,
      longitude: -81.5619
    },
    {
      id: "rockn-roller-coaster",
      titulo: "Rock ‘n’ Roller Coaster Starring Aerosmith",
      subtitulo: "Sunset Boulevard",
      tipo: "Montanha-russa no escuro",
      tipoPerfil: ["radicais", "imersivas", "tematicas"],
      alturaMinima: 122, // 48"
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 50,
      filaAceitavel: 35,
      idadeRecomendada: "9+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Montanha-russa acelerada ao som de Aerosmith, com loopings e curvas no escuro. Guarde os objetos antes da largada e sente-se nos primeiros carros para mais emoção.",
      icone: "🎸",
      imagem: "rockn-roller.jpg",
      regiao: "Sunset Boulevard",
      parque: "Hollywood Studios",
      latitude: 28.3561,
      longitude: -81.5614
    },
    // SHOW PRINCIPAL DA ÁREA
    {
      id: "beauty-and-the-beast",
      titulo: "Beauty and the Beast – Live on Stage",
      subtitulo: "Sunset Boulevard",
      tipo: "Show musical ao vivo",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // entrada por sessão
      tempoMedioFila: 15, // chegada antecipada recomendada
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Musical encantador que recria a história de Bela e a Fera com figurinos, danças e canções clássicas. Chegue 20 minutos antes para escolher bons lugares.",
      icone: "🌹🎶",
      imagem: "beauty-and-the-beast.jpg",
      regiao: "Sunset Boulevard",
      parque: "Hollywood Studios",
      latitude: 28.3550,
      longitude: -81.5620
    }
  ]
};
