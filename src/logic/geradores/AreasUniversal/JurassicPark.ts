export const JurassicPark = {
  parque: "Islands of Adventure",
  regiao: "Jurassic Park",
  latitude: 28.4700,
  longitude: -81.4732,
  descricao:
    "Área inspirada em Jurassic Park, com atrações aquáticas, voos panorâmicos e encontros com dinossauros em escala real.",
  imagem: "jurassic-park.png",
  atracoes: [
    {
      id: "jurassic-park-river-adventure",
      titulo: "Jurassic Park River Adventure",
      subtitulo: "Jurassic Park",
      tipo: "Passeio de barco com queda",
      tipoPerfil: ["radicais", "tematicas", "imersivas"],
      alturaMinima: 107, // 42"
      filaExpress: true, // Express Pass disponível
      tempoMedioFila: 50,
      filaAceitavel: 40,
      idadeRecomendada: "8+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Passeio de barco por cenários pré-históricos com dinossauros animatrônicos e uma grande queda final. Sente-se na frente para mais emoção (e respingos).",
      icone: "🦖",
      imagem: "jurassic-park-river-adventure.jpg",
      regiao: "Jurassic Park",
      parque: "Islands of Adventure",
      latitude: 28.4705,
      longitude: -81.4735
    },
    {
      id: "pteranodon-flyers",
      titulo: "Pteranodon Flyers",
      subtitulo: "Jurassic Park",
      tipo: "Voo panorâmico suspenso",
      tipoPerfil: ["familiares", "tematicas", "interativas"],
      alturaMinima: 91, // 36"
      filaExpress: false, // sem Express
      tempoMedioFila: 30,
      filaAceitavel: 25,
      idadeRecomendada: "Todas as idades (acompanhado por criança)",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Voo panorâmico sobre a área de Jurassic Park com movimentos suaves e vista privilegiada. Indispensável estar acompanhado de uma criança para embarcar.",
      icone: "🦅",
      imagem: "pteranodon-flyers.jpg",
      regiao: "Jurassic Park",
      parque: "Islands of Adventure",
      latitude: 28.4702,
      longitude: -81.4730
    },
    {
      id: "raptor-encounter",
      titulo: "Raptor Encounter",
      subtitulo: "Jurassic Park",
      tipo: "Encontro com dinossauro",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 0,
      filaExpress: false, // sem Express
      tempoMedioFila: 20,
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Interação realista com velociraptores animatrônicos para fotos e momentos divertidos. As reações dos dinossauros são imprevisíveis — e hilárias!",
      icone: "🦖",
      imagem: "raptor-encounter.jpg",
      regiao: "Jurassic Park",
      parque: "Islands of Adventure",
      latitude: 28.4704,
      longitude: -81.4732
    }
  ]
};
