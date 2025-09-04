// src/screens/inicio/TelaAeroportoHotel.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { regioesHospedagem } from '@/logic/types/regioesHospedagem';
import SelectBox from '@/components/card/SelectBox';
import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const horariosVoo = [
  { label: 'Madrugada', value: 'madrugada' },
  { label: 'Manhã', value: 'manha' },
  { label: 'Tarde', value: 'tarde' },
  { label: 'Noite', value: 'noite' },
];

const sugestoesChegada: Record<string, string[]> = {
  madrugada: [
    'Chegada durante a madrugada: siga para o hotel com transporte agendado, faça o check-in e descanse. Se disponível, aproveite um jantar leve ou room service para relaxar após a viagem.',
  ],
  manha: [
    'Chegada pela manhã: vá até o hotel para deixar as malas, depois aproveite para visitar a Disney Springs e retirar ingressos. Finalize o dia com compras rápidas no Walmart para abastecer o quarto.',
  ],
  tarde: [
    'Chegada à tarde: faça o check-in no hotel com tranquilidade, dê um passeio leve em Disney Springs ou em um outlet próximo e encerre o dia com um jantar agradável em restaurante da região.',
  ],
  noite: [
    'Chegada à noite: dirija-se diretamente ao hotel para o check-in. Descanse bem para aproveitar ao máximo o dia seguinte.',
  ],
};

const sugestoesSaida: Record<string, string[]> = {
  madrugada: [
    'Saída durante a madrugada: organize as malas na noite anterior e descanse cedo. Programe o check-out noturno e garanta o transporte antecipado até o aeroporto.',
  ],
  manha: [
    'Saída pela manhã: arrume as malas na noite anterior para um check-out sem pressa. Garanta o transporte com antecedência até o aeroporto.',
  ],
  tarde: [
    'Saída à tarde: aproveite um café da manhã tranquilo, faça as últimas compras ou um passeio leve próximo ao hotel. Realize o check-out até o meio-dia e siga para o aeroporto.',
  ],
  noite: [
    'Saída à noite: aproveite a manhã e o início da tarde para atividades leves. Após o check-out no horário, faça um almoço especial de despedida e vá para o aeroporto no fim da tarde.',
  ],
};

export default function TelaAeroportoHotel() {
  const navigation = useNavigation<any>();
  const {
    parkisheiroAtual,
    setHorarioVoo,
    regiaoHospedagem,
    setRegiaoHospedagem,
    markVisited,
  } = useParkisheiro();

  const [clima, setClima] = useState<any>(null);
  useEffect(() => { buscarClima('Orlando').then(setClima); }, []);
  useEffect(() => { markVisited('TelaAeroportoHotel'); }, []);

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  const dias = parkisheiroAtual.roteiroFinal || parkisheiroAtual.diasDistribuidosManuais || [];
  const horarioChegada = parkisheiroAtual.vooChegada?.horario;
  const horarioSaida = parkisheiroAtual.vooSaida?.horario;
  const tipos = dias.map((d: any) => d.tipo);

  const temChegada = tipos.includes('chegada');
  const temSaida = tipos.includes('saida');
  const temCompras = tipos.includes('compras');
  const temDescanso = tipos.includes('descanso');
  const temAtracoes = tipos.includes('disney') || tipos.includes('universal');

  const [visivel, setVisivel] = useState({ regiao: false, chegada: false, saida: false });

  function renderDescricaoRegiao(obj: any) {
    if (!obj) return null;
    const tempoTexto = `A ${obj.tempoAteDisney} minutos dos parques da Disney, ${obj.tempoAteUniversal} da Universal e ${obj.tempoAteAeroportoMCO} minutos do aeroporto de Orlando.`;
    return (
      <View style={styles.descricaoBoxTexto}>
        <Text style={styles.textoResumoEscolha}>
          <Text style={{ fontWeight: 'bold' }}>{obj.nome}:</Text> {obj.descricao} {tempoTexto}
        </Text>
      </View>
    );
  }

  function renderTextoVoo(tipo: 'chegada' | 'saida', horario: string | undefined) {
    if (!horario) return null;
    const fonte = tipo === 'chegada' ? sugestoesChegada : sugestoesSaida;
    const sugestao = fonte[horario];
    if (!sugestao) return null;

    return (
      <View style={styles.descricaoBoxTexto}>
        <Text style={styles.textoResumoEscolha}>
          <Text style={{ fontWeight: 'bold' }}>
            {horario.charAt(0).toUpperCase() + horario.slice(1)}:
          </Text> {sugestao.join(' ')}
        </Text>
      </View>
    );
  }

  function renderCampo(
    label: string,
    isVisivel: boolean,
    toggle: () => void,
    children: React.ReactNode,
    completo: boolean,
    extra?: React.ReactNode
  ) {
    return (
      <View style={styles.card}>
  <TouchableOpacity
    onPress={toggle}
    style={[
      styles.botaoEstiloFixado,
      {
        backgroundColor: completo ? '#004b87' : 'rgba(255,255,255,0.5)', // 40% branco
        borderWidth: 0, // sem borda
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
      },
    ]}
  >

         <Text
  style={[
    styles.textoFixado,
    { color: completo ? 'white' : '#004b87' }
  ]}
>
  {label}
</Text>
{completo && (
  <Ionicons
    name="checkmark"
    size={18}
    color="#fff"
    style={{ marginLeft: 6 }}
  />
)}
</TouchableOpacity>


        {isVisivel && <View style={styles.conteudoAbaixo}>{children}</View>}
        {extra && <View style={styles.conteudoAbaixo}>{extra}</View>}
      </View>
    );
  }

  const handleAvancar = () => {
    if (temCompras) navigation.replace('PerfilComprasPorDiaScreen');
    else if (temDescanso) navigation.replace('PerfilDescansoPorDiaScreen');
    else if (temAtracoes) navigation.replace('PerfilAtracoes');
    else navigation.replace('PerfilRefeicoes');
  };

  const podeAvancar =
    regiaoHospedagem &&
    (!temChegada || !!horarioChegada) &&
    (!temSaida || !!horarioSaida);

  return (
    <LinearGradient colors={['#0077cc', '#00bfff', '#add8e6']} style={{ flex: 1 }}>
      <View style={{ marginTop: 40 }}>
        <CabecalhoDia
          titulo=""
          data={dataFormatada}
          diaSemana={diaSemana}
          clima={clima?.condicao || 'Parcialmente nublado'}
          temperatura={clima ? `${clima.temp}°C` : '28°C'}
          iconeClima={clima?.icone}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {renderCampo(
          'Selecione sua região ou a mais próxima',
          visivel.regiao,
          () => setVisivel(v => ({ ...v, regiao: !v.regiao })),
          <SelectBox
            label=""
            value={regiaoHospedagem?.nome ?? '__nenhuma__'}
            options={regioesHospedagem
              .slice()
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map(r => ({ label: r.nome, value: r.nome }))}
            onChange={(nome) => {
              const selecionada = regioesHospedagem.find((r) => r.nome === nome);
              setRegiaoHospedagem(selecionada || null);
              setVisivel(v => ({ ...v, regiao: false }));
            }}
          />,
          !!regiaoHospedagem && regiaoHospedagem.nome !== 'Nenhuma área de hospedagem',
          regiaoHospedagem ? renderDescricaoRegiao(regiaoHospedagem) : null
        )}

        {temChegada && renderCampo(
          'Horário do Voo de Chegada',
          visivel.chegada,
          () => setVisivel(v => ({ ...v, chegada: !v.chegada })),
          <SelectBox
            label=""
            value={horarioChegada || ''}
            options={horariosVoo}
            onChange={(valor) => {
              setHorarioVoo('chegada', valor);
              setVisivel(v => ({ ...v, chegada: false }));
            }}
          />,
          !!horarioChegada,
          renderTextoVoo('chegada', horarioChegada)
        )}

        {temSaida && renderCampo(
          'Horário do Voo de Saída',
          visivel.saida,
          () => setVisivel(v => ({ ...v, saida: !v.saida })),
          <SelectBox
            label=""
            value={horarioSaida || ''}
            options={horariosVoo}
            onChange={(valor) => {
              setHorarioVoo('saida', valor);
              setVisivel(v => ({ ...v, saida: false }));
            }}
          />,
          !!horarioSaida,
          renderTextoVoo('saida', horarioSaida)
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      <TouchableOpacity style={styles.floatingBackButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={48} color="#004b87" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleAvancar}
        disabled={!podeAvancar}
      >
        <Ionicons name="arrow-forward-circle" size={48} color="#004b87" style={{ opacity: podeAvancar ? 1 : 0.3 }} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 180,
    minHeight: 600,
    width: '100%',
  },
  card: {
    width: '92%',
    alignSelf: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
  },
  botaoEstiloFixado: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  textoFixado: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  descricaoBoxTexto: { marginTop: 6, marginBottom: 0 },
  textoResumoEscolha: {
    color: '#003366',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'justify',
  },
  conteudoAbaixo: { marginTop: 2 },
  floatingButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  floatingBackButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
});
