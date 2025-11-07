// /src/logic/geradores/AreasUniversal/TheWizardingWorld.ts
export const TheWizardingWorld = {
  parque: "Universal Studios Florida",
  regiao: "The Wizarding World of Harry Potter – London / King’s Cross",
  latitude: 28.4742,
  longitude: -81.4679,
  descricao:
    "Área temática que recria as ruas de Londres e a King’s Cross Station, servindo como entrada para o Beco Diagonal. Possui o icônico Knight Bus e o embarque do Hogwarts Express, conectando ao Hogsmeade no Islands of Adventure.",
  imagem: "the-wizarding-world.png",
  atracoes: [
    {
      id: "hogwarts-express-kings-cross",
      titulo: "Hogwarts Express – King’s Cross Station",
      subtitulo: "The Wizarding World",
      tipo: "Passeio de trem temático",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 0,
      filaExpress: true,
      tempoMedioFila: 30,
      filaAceitavel: 20,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Embarque em King’s Cross rumo a Hogsmeade no Hogwarts Express. As janelas mostram cenas mágicas durante o trajeto, que muda conforme o sentido da viagem. É necessário ingresso Park-to-Park para utilizar esta atração.",
      icone: "🚂",
      imagem: "hogwarts-express-kings-cross.jpg",
      regiao: "The Wizarding World",
      parque: "Universal Studios Florida",
      latitude: 28.4744,
      longitude: -81.4687
    },
    {
      id: "knight-bus-photo-op",
      titulo: "Knight Bus – Photo Op",
      subtitulo: "The Wizarding World",
      tipo: "Ponto de foto e interação",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 0,
      filaAceitavel: 0,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: true,
      turnoRecomendado: "manha",
      descricao:
        "Foto e conversa divertida com o condutor e a cabeça encolhida no icônico ônibus roxo de três andares. Melhor visitado pela manhã, quando há menos filas para fotos.",
      icone: "🚌",
      imagem: "knight-bus.jpg",
      regiao: "The Wizarding World",
      parque: "Universal Studios Florida",
      latitude: 28.4746,
      longitude: -81.4684
    }
  ]
};
