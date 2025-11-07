export const Tomorrowland = {
  parque: "Magic Kingdom",
  regiao: "Tomorrowland",
  latitude: 28.4196,
  longitude: -81.5773,
  descricao:
    "Área futurista com luzes vibrantes, simuladores, aventuras interativas e montanhas-russas no escuro. Fica incrível à noite com a iluminação especial.",
  imagem: "tomorrowland.png",
  atracoes: [
    {
      id: "space-mountain",
      titulo: "Space Mountain",
      subtitulo: "Tomorrowland",
      tipo: "Montanha-russa",
      tipoPerfil: ["radicais", "imersivas", "tematicas"],
      alturaMinima: 112, // 44"
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 70,
      filaAceitavel: 45,
      idadeRecomendada: "7+",
      turnoRecomendado: "manha",
      atracaoSemFila: false,
      descricao:
        "Montanha-russa no escuro com curvas fechadas e atmosfera espacial clássica. Para mais intensidade, sente-se nos primeiros carros.",
      icone: "🚀",
      imagem: "space-mountain.jpg",
      regiao: "Tomorrowland",
      parque: "Magic Kingdom",
      latitude: 28.4198,
      longitude: -81.5771
    },
    // SHOW PRINCIPAL DA ÁREA
    {
      id: "monsters-inc-laugh-floor",
      titulo: "Monsters, Inc. Laugh Floor",
      subtitulo: "Tomorrowland",
      tipo: "Show interativo de comédia",
      tipoPerfil: ["interativas", "familiares", "tematicas"],
      alturaMinima: 0,
      filaExpress: true, // pode ofertar LL por sessão
      tempoMedioFila: 20,
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      turnoRecomendado: "noite",
      atracaoSemFila: false,
      descricao:
        "Show de comédia interativo com os monstros no telão. Envie piadas pelo app para tentar aparecer durante a apresentação.",
      icone: "😂",
      imagem: "laugh-floor.jpg",
      regiao: "Tomorrowland",
      parque: "Magic Kingdom",
      latitude: 28.4190,
      longitude: -81.5773
    },
    {
      id: "buzz-lightyear",
      titulo: "Buzz Lightyear’s Space Ranger Spin",
      subtitulo: "Tomorrowland",
      tipo: "Interativa",
      tipoPerfil: ["interativas", "familiares", "tematicas"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 40,
      filaAceitavel: 30,
      idadeRecomendada: "Todas as idades",
      turnoRecomendado: "tarde",
      atracaoSemFila: false,
      descricao:
        "Dispare nos alvos para derrotar Zurg e acumular pontos. Mire nos alvos piscando para pontuação extra.",
      icone: "🔫",
      imagem: "buzz-lightyear.jpg",
      regiao: "Tomorrowland",
      parque: "Magic Kingdom",
      latitude: 28.4193,
      longitude: -81.5774
    },
    {
      id: "tron-lightcycle-run",
      titulo: "TRON Lightcycle / Run",
      subtitulo: "Tomorrowland",
      tipo: "Montanha-russa lançada",
      tipoPerfil: ["radicais", "imersivas", "tematicas"],
      alturaMinima: 122, // 48"
      filaExpress: true, // ILL / Virtual Queue quando aplicável
      tempoMedioFila: 70,
      filaAceitavel: 45,
      idadeRecomendada: "7+",
      turnoRecomendado: "noite",
      atracaoSemFila: false,
      descricao:
        "Coaster de alta velocidade com lançamento sob a canopy luminosa. Assentos tipo 'moto' (há assentos tradicionais na última fileira).",
      icone: "💡",
      imagem: "tron.jpg",
      regiao: "Tomorrowland",
      parque: "Magic Kingdom",
      latitude: 28.4201,
      longitude: -81.5766
    },
    {
      id: "tomorrowland-speedway",
      titulo: "Tomorrowland Speedway",
      subtitulo: "Tomorrowland",
      tipo: "Pista de carrinhos",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 82, // ~32"
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 30,
      filaAceitavel: 25,
      idadeRecomendada: "Todas as idades",
      turnoRecomendado: "tarde",
      atracaoSemFila: false,
      descricao:
        "Dirija carrinhos em pista temática. Crianças adoram segurar o volante — mantenha aceleração constante para evitar trancos.",
      icone: "🏁",
      imagem: "tomorrowland-speedway.jpg",
      regiao: "Tomorrowland",
      parque: "Magic Kingdom",
      latitude: 28.4186,
      longitude: -81.5765
    },
    {
      id: "astro-orbiter",
      titulo: "Astro Orbiter",
      subtitulo: "Tomorrowland",
      tipo: "Brinquedo giratório aéreo",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 83, // ~32–34"
      filaExpress: false, // apenas fila comum
      tempoMedioFila: 25,
      filaAceitavel: 20,
      idadeRecomendada: "Todas as idades",
      turnoRecomendado: "manha",
      atracaoSemFila: false,
      descricao:
        "Foguetes giratórios com vista panorâmica. Embarque por elevador na torre — fotos lindas ao amanhecer ou entardecer.",
      icone: "🪐",
      imagem: "astro-orbiter.jpg",
      regiao: "Tomorrowland",
      parque: "Magic Kingdom",
      latitude: 28.4192,
      longitude: -81.5772
    },
    {
      id: "peoplemover",
      titulo: "Tomorrowland Transit Authority PeopleMover",
      subtitulo: "Tomorrowland",
      tipo: "Passeio panorâmico elevado",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // fila comum
      tempoMedioFila: 10,
      filaAceitavel: 10,
      idadeRecomendada: "Todas as idades",
      turnoRecomendado: "tarde",
      atracaoSemFila: false,
      descricao:
        "Passeio elevado com vistas de Tomorrowland e bastidores de atrações. Ótimo para descansar e pegar uma brisa.",
      icone: "🚝",
      imagem: "peoplemover.jpg",
      regiao: "Tomorrowland",
      parque: "Magic Kingdom",
      latitude: 28.4195,
      longitude: -81.5770
    }
  ]
};
