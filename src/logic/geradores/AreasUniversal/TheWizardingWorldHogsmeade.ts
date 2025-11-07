export const TheWizardingWorldHogsmeade = {
  parque: "Islands of Adventure",
  regiao: "The Wizarding World of Harry Potter – Hogsmeade",
  descricao:
    "Vila nevada com o Castelo de Hogwarts ao fundo, misturando dark rides, montanhas-russas, shows e lojas icônicas. Imersão completa no universo bruxo — de cerveja amanteigada a varinhas interativas.",
  imagem: "hogsmeade.png",
  latitude: 28.4714,
  longitude: -81.4736,
  atracoes: [
    {
      id: "harry-potter-and-the-forbidden-journey",
      titulo: "Harry Potter and the Forbidden Journey",
      subtitulo: "Hogsmeade",
      tipo: "Dark ride com braço robótico (sem 3D)",
      tipoPerfil: ["radicais", "imersivas", "tematicas"],
      alturaMinima: 122, // 48"
      filaExpress: true,
      tempoMedioFila: 70,
      filaAceitavel: 50,
      idadeRecomendada: "10+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Voe por Hogwarts e pela Floresta Proibida em assentos articulados ligados a um braço robótico, combinando telas e cenários reais. Dica: fileiras centrais equilibram melhor os efeitos e reduzem enjoo.",
      icone: "⚡",
      imagem: "harry-potter-forbidden-journey.jpg",
      regiao: "Hogsmeade",
      parque: "Islands of Adventure",
      latitude: 28.4715,
      longitude: -81.4738
    },
    {
      id: "hagrids-magical-creatures-motorbike-adventure",
      titulo: "Hagrid’s Magical Creatures Motorbike Adventure",
      subtitulo: "Hogsmeade",
      tipo: "Montanha-russa temática",
      tipoPerfil: ["radicais", "tematicas", "imersivas"],
      alturaMinima: 122, // 48"
      filaExpress: true, // Express disponível atualmente
      tempoMedioFila: 80,
      filaAceitavel: 60,
      idadeRecomendada: "12+",
      atracaoSemFila: false,
      turnoRecomendado: "noite",
      descricao:
        "Coaster veloz com múltiplos lançamentos, reverso e surpresas na Floresta Proibida. Assento ‘moto’ é mais intenso; o sidecar é levemente mais suave.",
      icone: "🏍️",
      imagem: "hagrid-motorbike-adventure.jpg",
      regiao: "Hogsmeade",
      parque: "Islands of Adventure",
      latitude: 28.4721,
      longitude: -81.4742
    },
    {
      id: "flight-of-the-hippogriff",
      titulo: "Flight of the Hippogriff",
      subtitulo: "Hogsmeade",
      tipo: "Montanha-russa infantil",
      tipoPerfil: ["familiares", "tematicas", "interativas"],
      alturaMinima: 91, // 36"
      filaExpress: true,
      tempoMedioFila: 25,
      filaAceitavel: 20,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Coaster suave passando pela cabana do Hagrid e pelo ninho do Hipogrifo. Dica: vá cedo; o ciclo é curto e a fila anda rápido.",
      icone: "🦅",
      imagem: "flight-of-the-hippogriff.jpg",
      regiao: "Hogsmeade",
      parque: "Islands of Adventure",
      latitude: 28.4717,
      longitude: -81.4739
    },
    {
      id: "hogwarts-express-hogsmeade-station",
      titulo: "Hogwarts Express – Hogsmeade Station",
      subtitulo: "Hogsmeade",
      tipo: "Passeio de trem",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 0,
      filaExpress: true, // Universal Express válido
      tempoMedioFila: 30,
      filaAceitavel: 20,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Jornada imersiva até King’s Cross (USF) com janelas ‘mágicas’ e surpresas no corredor. Faça ida e volta — o conteúdo muda em cada sentido.",
      icone: "🚂",
      imagem: "hogwarts-express.jpg",
      regiao: "Hogsmeade",
      parque: "Islands of Adventure",
      latitude: 28.4719,
      longitude: -81.4740
    },
    {
      id: "ollivanders-hogsmeade",
      titulo: "Ollivanders – Hogsmeade",
      subtitulo: "Hogsmeade",
      tipo: "Experiência de varinhas e loja",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 25,
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Assista à varinha escolher o bruxo e depois compre uma varinha interativa para lançar feitiços pelas vitrines de Hogsmeade.",
      icone: "🪄",
      imagem: "olivanders-wand-shop.jpg",
      regiao: "Hogsmeade",
      parque: "Islands of Adventure",
      latitude: 28.4720,
      longitude: -81.4741
    },

    // Shows de Hogsmeade (sem fila)
    {
      id: "frog-choir",
      titulo: "Hogwarts Frog Choir",
      subtitulo: "Hogsmeade",
      tipo: "Show musical ao vivo",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 0,
      filaAceitavel: 0,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: true,
      turnoRecomendado: "tarde",
      descricao:
        "Coral de alunos com sapos gigantes cantores. Verifique os horários do dia e chegue alguns minutos antes para ficar em sombra.",
      icone: "🎼",
      imagem: "frog-choir.jpg",
      regiao: "Hogsmeade",
      parque: "Islands of Adventure",
      latitude: 28.4716,
      longitude: -81.4737
    },
    {
      id: "triwizard-spirit-rally",
      titulo: "Triwizard Spirit Rally",
      subtitulo: "Hogsmeade",
      tipo: "Apresentação temática",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 0,
      filaAceitavel: 0,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: true,
      turnoRecomendado: "tarde",
      descricao:
        "Exibição ao ar livre com estudantes de Beauxbatons e Durmstrang. Ótimo para fotos com o castelo ao fundo.",
      icone: "🏆",
      imagem: "triwizard-spirit-rally.jpg",
      regiao: "Hogsmeade",
      parque: "Islands of Adventure",
      latitude: 28.47155,
      longitude: -81.47375
    }
  ]
};
