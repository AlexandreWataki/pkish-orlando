// src/screens/inicio/CardDiaRoteiro.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { DiaGerado } from '@/IA/gerarComIA';

type Props = { dia: DiaGerado | (DiaGerado & { atividades?: string[] }) };

// Helpers
const strip = (s: any) =>
  (typeof s === 'string' ? s : '')
    .trim();

const asStrArray = (v: any): string[] =>
  Array.isArray(v) ? v.map(strip).filter(Boolean) : typeof v === 'string' ? [strip(v)] : [];

const norm = (s: string) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // tira acentos

const CANN = {
  manha: ['manha', 'manhã', 'morning', 'am'],
  tarde: ['tarde', 'afternoon', 'pm'],
  noite: ['noite', 'night', 'evening'],
} as const;

function labelPt(key: 'manha' | 'tarde' | 'noite') {
  return key === 'manha' ? 'Manhã' : key === 'tarde' ? 'Tarde' : 'Noite';
}

function canonicalFromText(t: string): 'manha' | 'tarde' | 'noite' | null {
  const n = norm(t);
  if (CANN.manha.some(k => n.includes(k))) return 'manha';
  if (CANN.tarde.some(k => n.includes(k))) return 'tarde';
  if (CANN.noite.some(k => n.includes(k))) return 'noite';
  return null;
}

// 🔧 Normaliza qualquer formato de "turnos" (objeto/array/sinônimos) em array fixo: Manhã/Tarde/Noite
function normalizarTurnos(dia: Props['dia']): { turno: string; atividades: string[] }[] {
  const t = (dia as any)?.turnos;

  // 1) Se vier como ARRAY [{ turno, atividades }]
  if (Array.isArray(t)) {
    const buckets = { manha: [] as string[], tarde: [] as string[], noite: [] as string[] };
    for (const item of t) {
      const alvo = canonicalFromText(item?.turno ?? '') ?? 'tarde';
      buckets[alvo].push(...asStrArray(item?.atividades));
    }
    return [
      { turno: 'Manhã', atividades: buckets.manha },
      { turno: 'Tarde', atividades: buckets.tarde },
      { turno: 'Noite', atividades: buckets.noite },
    ];
  }

  // 2) Se vier como OBJETO { manha:[], tarde:[], noite:[] } (com variações de chave)
  if (t && typeof t === 'object') {
    // encontra a melhor chave para cada período
    const keys = Object.keys(t);
    const pick = (cands: readonly string[]) =>
      keys.find(k => cands.includes(norm(k))) ?? null;

    const kManha = pick(CANN.manha);
    const kTarde = pick(CANN.tarde);
    const kNoite = pick(CANN.noite);

    return [
      { turno: 'Manhã', atividades: asStrArray(kManha ? t[kManha] : []) },
      { turno: 'Tarde', atividades: asStrArray(kTarde ? t[kTarde] : []) },
      { turno: 'Noite', atividades: asStrArray(kNoite ? t[kNoite] : []) },
    ];
  }

  // 3) Formato legado: "atividades" flat -> joga em "Tarde" para não perder nada
  const atividades = asStrArray((dia as any).atividades);
  return [
    { turno: 'Manhã', atividades: [] },
    { turno: 'Tarde', atividades },
    { turno: 'Noite', atividades: [] },
  ];
}

function iconeDoTurno(nome: string): any {
  const c = canonicalFromText(nome);
  if (c === 'manha') return 'sunny-outline';
  if (c === 'tarde') return 'partly-sunny-outline';
  if (c === 'noite') return 'moon-outline';
  return 'list-outline';
}

export default function CardDiaRoteiro({ dia }: Props) {
  const turnos = normalizarTurnos(dia);

  return (
    <View style={styles.card}>
      {/* Cabeçalho */}
      <View style={[styles.row, { marginBottom: 8 }]}>
        <Ionicons name="calendar-outline" size={20} color="#00FFFF" />
        <Text style={styles.headerText}>
          {strip(dia.data)}{dia.parque ? ` – ${strip(dia.parque)}` : ''}
        </Text>
      </View>

      {/* Turnos */}
      {turnos.map((t, idx) => (
        <View key={`${t.turno}-${idx}`} style={styles.section}>
          <View style={styles.row}>
            <Ionicons name={iconeDoTurno(t.turno)} size={18} color="#00FFFF" />
            <Text style={styles.sectionTitle}>{t.turno}</Text>
          </View>

          {t.atividades?.length ? (
            t.atividades.map((item, i) => (
              <Text key={i} style={styles.item}>• {item}</Text>
            ))
          ) : (
            <Text style={[styles.item, { opacity: 0.7 }]}>(sem atividades)</Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#041022',
    borderRadius: 16,
    padding: 12,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#00FFFF',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 14,
    elevation: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headerText: { marginLeft: 8, color: '#00FFFF', fontWeight: 'bold', fontSize: 18 },
  section: { marginTop: 6 },
  sectionTitle: { marginLeft: 6, color: '#00FFFF', fontWeight: 'bold', fontSize: 15 },
  item: { marginLeft: 24, color: '#e8f1ff', fontSize: 14, marginTop: 2 },
});
