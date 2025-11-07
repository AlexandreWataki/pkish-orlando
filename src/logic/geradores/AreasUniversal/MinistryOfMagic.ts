// src/logic/geradores/AreasUniversal/MinistryOfMagic.ts
export const MinistryOfMagic = {
  parque: "Universal's Epic Universe",
  regiao: "Ministry of Magic",
  latitude: 28.4730,
  longitude: -81.4695,
  descricao:
    "Área do Wizarding World inspirada no Ministério da Magia britânico, transportando visitantes à Londres mágica e aos corredores subterrâneos do poder bruxo. Contará com uma atração imersiva e um espetáculo ao vivo.",
  imagem: "ministry-of-magic.png",
  atracoes: [
    {
      id: "battle-at-the-ministry",
      titulo: "Harry Potter and the Battle at the Ministry",
      subtitulo: "Ministry of Magic",
      tipo: "Dark ride 4D imersiva",
      tipoPerfil: ["radicais", "imersivas", "tematicas"],
      alturaMinima: 107, // 42"
      filaExpress: true, // Universal Express disponível
      tempoMedioFila: 60,
      filaAceitavel: 45,
      idadeRecomendada: "8+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Aventura épica pelos corredores do Ministério da Magia com feitiços, criaturas e efeitos de última geração. As fileiras centrais oferecem melhor visão panorâmica das cenas mágicas.",
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
      tipo: "Show ao vivo temático",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 0,
      filaAceitavel: 0,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: true, // livre, sem fila
      turnoRecomendado: "noite",
      descricao:
        "Espetáculo mágico com criaturas e ilusionismo inspirado no universo de Animais Fantásticos. Chegue antes para garantir assentos próximos do palco e aproveitar todos os detalhes dos efeitos.",
      icone: "✨",
      imagem: "le-cirque-arcanus.jpg",
      regiao: "Ministry of Magic",
      parque: "Universal's Epic Universe",
      latitude: 28.4729,
      longitude: -81.4697
    }
  ]
};
