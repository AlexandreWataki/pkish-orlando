// CelestialPark.ts — enxuto (apenas filas + show principal)
export const CelestialPark = {
  parque: "Universal's Epic Universe",
  regiao: "Celestial Park",
  latitude: 28.4719,
  longitude: -81.4719,
  descricao:
    "Coração do Epic Universe com jardins, lagos e fontes coreografadas, conectando todos os mundos por portais.",
  imagem: "celestial-park.png",
  atracoes: [
    {
      id: "starfall-racers",
      titulo: "Starfall Racers",
      subtitulo: "Celestial Park",
      tipo: "Montanha-russa lançada (dueling)",
      tipoPerfil: ["radicais", "imersivas", "tematicas"],
      alturaMinima: 122, // 48"
      filaExpress: true, // Express/LL quando disponível
      tempoMedioFila: 90,
      filaAceitavel: 60,
      idadeRecomendada: "7+",
      atracaoSemFila: false,
      turnoRecomendado: "noite",
      descricao:
        "Dueling coaster de alta velocidade com o elemento Celestial Spin. À noite, os trens iluminados ficam incríveis.",
      icone: "✨",
      imagem: "starfall-racers.jpg",
      regiao: "Celestial Park",
      parque: "Universal's Epic Universe",
      latitude: 28.4722,
      longitude: -81.4716
    },
    {
      id: "constellation-carousel",
      titulo: "Constellation Carousel",
      subtitulo: "Celestial Park",
      tipo: "Carrossel 360°",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // fila comum
      tempoMedioFila: 15,
      filaAceitavel: 10,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Criaturas celestiais giram 360°; ótimo para fotos ao pôr do sol.",
      icone: "🪐",
      imagem: "constellation-carousel.jpg",
      regiao: "Celestial Park",
      parque: "Universal's Epic Universe",
      latitude: 28.4717,
      longitude: -81.4721
    },

    // SHOW PRINCIPAL DA ÁREA
    {
      id: "neptunes-pool",
      titulo: "Neptune’s Pool & Fountains",
      subtitulo: "Celestial Park",
      tipo: "Show de fontes e luzes",
      tipoPerfil: ["tematicas", "imersivas", "familiares"],
      alturaMinima: 0,
      filaExpress: false, // entrada por sessão / livre
      tempoMedioFila: 0,
      filaAceitavel: 10,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "noite",
      descricao:
        "Fontes coreografadas com iluminação e trilha — sequência especial à noite.",
      icone: "🌊",
      imagem: "neptunes-pool.jpg",
      regiao: "Celestial Park",
      parque: "Universal's Epic Universe",
      latitude: 28.4720,
      longitude: -81.4718
    }
  ]
};
