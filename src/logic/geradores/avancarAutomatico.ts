type Navegador = {
  navigate: (tela: string, params?: any) => void;
};

type DiaRoteiro = { id: string };

type DadosAvanco = {
  dias: { tipo: string }[];
  roteiroFinal: DiaRoteiro[];
  navigation: Navegador;
};

export function avancarAutomatico({ dias, roteiroFinal, navigation }: DadosAvanco) {
  const primeiroDia = roteiroFinal?.[0];
  if (!primeiroDia) return;

  const todosTipos = dias.map((d) => d.tipo);

  // Filtra tipos que geram perfis (ignora chegada e saÃ­da)
  const tipos = todosTipos.filter((t) => t !== 'chegada' && t !== 'saida');

  const tem = (tipo: string) => tipos.includes(tipo);
  const temParque = tipos.includes('disney') || tipos.includes('universal');
  const temPerfil = tipos.includes('compras') || tipos.includes('descanso') || temParque;
  const apenasChegadaSaida = tipos.length === 0;

  // Monta sequÃªncia
  const sequencia: { nome: string; tela: string }[] = [];

  // Sempre comeÃ§a com refeiÃ§Ã£o
  sequencia.push({ nome: 'refeicao', tela: 'PerfilRefeicoes' });

  if (!apenasChegadaSaida) {
    // Ordem fixa: Compras â†’ Descanso â†’ AtraÃ§Ãµes
    if (tem('compras')) {
      sequencia.push({ nome: 'compras', tela: 'PerfilComprasPorDiaScreen' });
    }
    if (tem('descanso')) {
      sequencia.push({ nome: 'descanso', tela: 'PerfilDescansoPorDiaScreen' });
    }
    if (temParque) {
      sequencia.push({ nome: 'atracoes', tela: 'PerfilAtracoes' });
    }
  }

  // Sempre termina no DiaCompleto
  sequencia.push({ nome: 'final', tela: 'DiaCompleto' });

  // Executa sequÃªncia encadeada
  const proximo = (index: number) => {
    if (index >= sequencia.length) return;
    const etapa = sequencia[index];

    if (etapa.tela === 'DiaCompleto') {
      navigation.navigate('DiaCompleto', { diaId: primeiroDia.id });
    } else {
      navigation.navigate(etapa.tela, {
        proximo: { diaId: primeiroDia.id },
        callback: () => proximo(index + 1),
      });
    }
  };

  proximo(0);
}
