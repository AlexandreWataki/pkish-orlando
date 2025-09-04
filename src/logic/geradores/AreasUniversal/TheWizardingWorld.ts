// /src/logic/geradores/AreasUniversal/TheWizardingWorld.ts
export const TheWizardingWorld = {
  parque: "Universal Studios Florida",
  descricao: "Área externa de Londres/Kings Cross no Universal Studios Florida, com acesso ao Hogwarts Express e elementos icônicos do mundo bruxo fora do Beco Diagonal.",
  imagem: "the-wizarding-world.png",
  latitude: 28.4742,
  longitude: -81.4679,
  atracoes: [
    {
      id: "hogwarts-express-kings-cross",
      titulo: "Hogwarts Express – King’s Cross Station",
      subtitulo: "The Wizarding World",
      tipo: "Passeio de trem",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 0,
      filaExpress: true,
      tempoMedioFila: 30,
      filaAceitavel: 20,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao: "Embarque no trem em King’s Cross (lado USF) rumo a Hogsmeade, com janelas mágicas e surpresas durante o trajeto.",
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
      tipo: "Ponto de foto",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 0,
      filaAceitavel: 0,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: true,
      turnoRecomendado: "tarde",
      descricao: "Foto e interação com o condutor e a cabeça encolhida no ônibus roxo de três andares, mais divertido no fim da tarde com menos movimento.",
      icone: "🚌",
      imagem: "knight-bus.jpg",
      regiao: "The Wizarding World",
      parque: "Universal Studios Florida",
      latitude: 28.4746,
      longitude: -81.4684
    }
  ]
};
