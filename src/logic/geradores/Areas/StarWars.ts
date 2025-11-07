export const StarWars = {
  parque: "Hollywood Studios",
  regiao: "Star Wars: Galaxy’s Edge",
  latitude: 28.3541,
  longitude: -81.5909,
  descricao:
    "Área imersiva que recria o planeta Batuu, com naves em escala real, lojas e personagens. À noite, luzes e sons criam uma atmosfera ainda mais intensa.",
  imagem: "starwarsgalaxyedge.png",
  atracoes: [
    {
      id: "rise-of-the-resistance",
      titulo: "Star Wars: Rise of the Resistance",
      subtitulo: "Star Wars: Galaxy’s Edge",
      tipo: "Aventura imersiva",
      tipoPerfil: ["imersivas", "tematicas", "radicais"],
      alturaMinima: 102, // 40"
      filaExpress: true, // Lightning Lane (individual)
      tempoMedioFila: 80,
      filaAceitavel: 50,
      idadeRecomendada: "7+",
      turnoRecomendado: "manha",
      atracaoSemFila: false,
      descricao:
        "Missão épica em múltiplos ambientes com efeitos e elenco da Primeira Ordem e Resistência. Chegue cedo para filas menores e repare nos detalhes dos cenários.",
      icone: "🚀",
      imagem: "rise-of-the-resistance.jpg",
      latitude: 28.3545,
      longitude: -81.5914,
      regiao: "Star Wars: Galaxy’s Edge",
      parque: "Hollywood Studios"
    },
    {
      id: "millennium-falcon-smugglers-run",
      titulo: "Millennium Falcon: Smugglers Run",
      subtitulo: "Star Wars: Galaxy’s Edge",
      tipo: "Simulador interativo",
      tipoPerfil: ["interativas", "imersivas", "tematicas"],
      alturaMinima: 97, // 38"
      filaExpress: true, // Lightning Lane (Genie+/Multi Pass)
      tempoMedioFila: 60,
      filaAceitavel: 40,
      idadeRecomendada: "6+",
      turnoRecomendado: "tarde",
      atracaoSemFila: false,
      descricao:
        "Simulador na Millennium Falcon onde cada pessoa assume um papel (piloto, atirador ou engenheiro). Peça para ser piloto para a experiência mais disputada.",
      icone: "🛸",
      imagem: "millennium-falcon.jpg",
      latitude: 28.3537,
      longitude: -81.5912,
      regiao: "Star Wars: Galaxy’s Edge",
      parque: "Hollywood Studios"
    }
  ]
};
