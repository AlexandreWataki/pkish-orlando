// src/logic/geradores/AreasUniversal/SkullIsland.ts
export const SkullIsland = {
  parque: "Islands of Adventure",
  regiao: "Skull Island",
  latitude: 28.4718,
  longitude: -81.4745,
  descricao:
    "Área sombria inspirada em King Kong, com selvas densas, sons misteriosos e criaturas gigantes. Toda a ambientação leva à grande atração Skull Island: Reign of Kong, uma das experiências mais intensas do parque.",
  imagem: "skull-island.png",
  atracoes: [
    {
      id: "skull-island-reign-of-kong",
      titulo: "Skull Island: Reign of Kong",
      subtitulo: "Skull Island",
      tipo: "Dark ride com simulador 3D",
      tipoPerfil: ["radicais", "tematicas", "imersivas"],
      alturaMinima: 92, // 36"
      filaExpress: true,
      tempoMedioFila: 60,
      filaAceitavel: 40,
      idadeRecomendada: "8+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Aventura intensa por selvas e ruínas antigas em veículos enormes. Enfrente criaturas pré-históricas e tenha um encontro impressionante com King Kong. Dica: sente-se nas pontas do caminhão para sentir mais os efeitos e ter visão completa das telas laterais.",
      icone: "🦍",
      imagem: "reign-of-kong.jpg",
      regiao: "Skull Island",
      parque: "Islands of Adventure",
      latitude: 28.4719,
      longitude: -81.4746
    }
  ]
};
