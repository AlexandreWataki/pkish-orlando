import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Promocao } from './promocao';

const AZUL_NEON = '#00FFFF';
const AZUL_BORDA = '#00BFFF';
const AZUL_ESCURO = '#001F3F';

type Props = {
  item: Promocao;
  onPress?: (p: Promocao) => void;
};

function money(v?: number) {
  return typeof v === 'number' ? `US$ ${v.toFixed(2)}` : null;
}

const PromoCard = ({ item, onPress }: Props) => {
  const precoDe = money(item.precoOriginal);
  const precoPor = money(item.precoComDesconto);
  const badge = item.porcentagem ? `-${item.porcentagem}%` : undefined;

  const cta = useMemo(() => {
    switch (item.categoria) {
      case 'parques': return '🎢 Garanta já seu ingresso com desconto!';
      case 'restaurantes': return '🍽️ Oferta ativa no cardápio — confira agora!';
      case 'hoteis': return '🏨 Tarifas promocionais — reserve e economize!';
      case 'compras': return '🛍️ Cupons e deals imperdíveis — clique e aplique!';
      case 'transporte': return '🚌 Economize no traslado/aluguel — veja como!';
      default: return '✨ Clique e confira esta promoção exclusiva!';
    }
  }, [item.categoria]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onPress?.(item)}
    >
      {/* Ícone principal de promoção (megafone) */}
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          <Ionicons name="megaphone-outline" size={34} color={AZUL_NEON} />
        </View>
      </View>

      {/* Conteúdo */}
      <View style={styles.right}>
        <View style={styles.headerRow}>
          <Text numberOfLines={2} style={styles.title}>{item.titulo}</Text>
          {!!badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>

        {item.parceiro ? <Text style={styles.parceiro}>{item.parceiro}</Text> : null}
        <Text numberOfLines={3} style={styles.desc}>{item.descricao}</Text>

        <View style={styles.priceRow}>
          {precoPor ? <Text style={styles.priceNow}>{precoPor}</Text> : null}
          {precoDe ? <Text style={styles.priceOld}>{precoDe}</Text> : null}
        </View>

        {item.validade ? (
          <Text style={styles.validade}>Validade: {item.validade}</Text>
        ) : null}

        {/* CTA chamativo */}
        <Text style={styles.cta}>👉 {cta}</Text>
      </View>

      {/* Ícone de expandir no canto do card */}
      <View style={styles.expandIcon}>
        <Ionicons name="open-outline" size={18} color="#001A2A" />
      </View>
    </TouchableOpacity>
  );
};

export default memo(PromoCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '92%',
    alignSelf: 'center',
    backgroundColor: AZUL_ESCURO,
    borderRadius: 20,
    padding: 12,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: AZUL_BORDA,
    shadowColor: AZUL_NEON,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
    position: 'relative',
  },
  left: { width: 92, height: 92, marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: AZUL_NEON,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#032a3a',
  },
  right: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { flex: 1, color: '#fff', fontWeight: '700', fontSize: 16 },
  badge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AZUL_NEON,
    backgroundColor: '#032a3a',
  },
  badgeText: { color: AZUL_NEON, fontWeight: '800', fontSize: 12 },
  parceiro: { color: '#bfefff', fontSize: 12, marginTop: 2 },
  desc: { color: '#e6f7ff', fontSize: 13, marginTop: 6 },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginTop: 10 },
  priceNow: { color: '#00ffea', fontWeight: '800', fontSize: 16 },
  priceOld: { color: '#a9cce3', textDecorationLine: 'line-through', fontSize: 13 },
  validade: { color: '#cce6ff', fontSize: 12, marginTop: 6 },
  cta: {
    marginTop: 10,
    color: AZUL_NEON,
    fontSize: 13,
    fontWeight: '700',
  },
  expandIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: AZUL_NEON,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: AZUL_NEON,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
});
