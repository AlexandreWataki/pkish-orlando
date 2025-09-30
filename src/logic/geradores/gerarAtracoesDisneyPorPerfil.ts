import { AtividadeDia } from '@/logic/types/atividade';
import { AtracaoParque } from '@/logic/types/atracao';
import { atracoesDisney } from './todasAtracoesDisney';

// Blocos por perfil
import { blocosDisneyRadicais } from './Perfis/blocosDisneyRadicais';
import { blocosDisneyTematicas } from './Perfis/blocosDisneyTematicas';
import { blocosDisneyFamiliares } from './Perfis/blocosDisneyFamiliares';
import { blocosDisneyImersivas } from './Perfis/blocosDisneyImersivas';
import { blocosDisneyInterativas } from './Perfis/blocosDisneyInterativas';

export function gerarAtracoesDisneyPorPerfil(
  turno: 'manha' | 'tarde' | 'noite',
  parque: string,
  perfil: string
): AtividadeDia[] {
  const blocos = {
    radicais: blocosDisneyRadicais,
    tematicas: blocosDisneyTematicas,
    familiares: blocosDisneyFamiliares,
    imersivas: blocosDisneyImersivas,
    interativas: blocosDisneyInterativas,
  }[perfil] ?? blocosDisneyTematicas;

  const blocoParque = blocos.find((b) => b.parque === parque);
  if (!blocoParque) return [];

  const turnoAtual = blocoParque.turnos.find((t) => t.periodo === turno);
  if (!turnoAtual) return [];

  const areas = turnoAtual.areas;

  return atracoesDisney
    .filter((atracao: AtracaoParque) =>
      atracao.parque === parque &&
      areas.includes(atracao.regiao ?? '') &&
      // VERIFICA APENAS O PRIMEIRO PERFIL
      (Array.isArray(atracao.tipoPerfil)
        ? atracao.tipoPerfil[0] === perfil
        : atracao.tipoPerfil === perfil)
    )
    .map((atracao) => ({
      id: atracao.id ?? `${atracao.titulo}-${turno}`,
      tipo: 'atracao',
      titulo: atracao.titulo ?? 'Sem título',
      descricao: atracao.descricao ?? '',
      subtitulo: atracao.subtitulo ?? atracao.area ?? atracao.regiao ?? '',
      regiao: atracao.regiao,
      latitude: atracao.latitude,
      longitude: atracao.longitude,
    }));
}
