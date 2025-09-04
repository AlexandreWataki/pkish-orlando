// src/logic/geradores/AreasUniversal/MinistryOfMagic.ts
export const MinistryOfMagic = {
  parque: "Universal's Epic Universe",
  regiao: "Ministry of Magic",
  descricao: "Área do Wizarding World inspirada no Ministério da Magia britânico, com uma grande atração imersiva e um show ao vivo.",
  imagem: "ministry-of-magic.png",
  latitude: 28.4730,
  longitude: -81.4695,
  atracoes: [
    {
      id: "battle-at-the-ministry",
      titulo: "Battle at the Ministry",
      subtitulo: "Ministry of Magic",
      tipo: "Simulador/Dark ride 4D",
      tipoPerfil: ["radicais", "imersivas", "tematicas"],
      alturaMinima: 107,
      filaExpress: true,
      tempoMedioFila: 60,
      filaAceitavel: 45,
      idadeRecomendada: "A partir de 8 anos",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao: "Aventura intensa pelos corredores do Ministério da Magia, com feitiços, criaturas e efeitos especiais. As fileiras centrais oferecem melhor visão geral das cenas.",
      icone: "🪄",
      imagem: "battle-at-the-ministry.jpg",
      regiao: "Ministry of Magic",
      parque: "Universal's Epic Universe",
      latitude: 28.4731,
      longitude: -81.4696
    },
    {
      id: "le-cirque-arcanus",
      titulo: "Le Cirque Arcanus",
      subtitulo: "Ministry of Magic",
      tipo: "Show ao vivo",
      tipoPerfil: ["tematicas", "imersivas", "familiares"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 0,
      filaAceitavel: 0,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: true,
      turnoRecomendado: "noite",
      descricao: "Espetáculo mágico com performances e efeitos especiais que expandem o mundo bruxo. Chegue um pouco antes para pegar assentos mais próximos do palco.",
      icone: "✨",
      imagem: "le-cirque-arcanus.jpg",
      regiao: "Ministry of Magic",
      parque: "Universal's Epic Universe",
      latitude: 28.4729,
      longitude: -81.4697
    }
  ]
};
