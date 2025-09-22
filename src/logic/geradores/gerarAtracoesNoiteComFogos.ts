ï»¿import { AtividadeDia } from '@/logic/types/atividade';
import { gerarAtracoesDisneyPorPerfilAgrupadas } from './gerarAtracoesUniversalPorPerfilFluxo';

// Importa seus blocos especiais para fogos por parque
import { fogosMagicKingdom } from './Areas/FogosMagicKingdom';
import { fogosEPCOT } from './Areas/FogosEPCOT';
import { fogosHollywoodStudios } from './Areas/FogosHollywoodStudios';
import { experienciaPandoraNoite } from './Areas/FogosPandoraNoite';

// Mapeia as ÃƒÂ¡reas que representam o local dos fogos em cada parque
const areasComFogosPorParque: Record<string, string[]> = {
  'Magic Kingdom': ['Main Street, U.S.A.'],
  'EPCOT': ['World Showcase'],
  'Hollywood Studios': ['Hollywood Boulevard'],
  'Animal Kingdom': ['Pandora Ã¢â‚¬â€œ The World of Avatar'], // Pode usar bloco especial de Pandora
};

export function gerarAtracoesNoiteComFogos(
  parque: string,
  areasNoite: string[],
  perfilAtracao: string
): AtividadeDia[] {
  const temFogos = areasComFogosPorParque[parque]?.some(area => areasNoite.includes(area)) ?? false;

  if (!temFogos) {
    return gerarAtracoesDisneyPorPerfilAgrupadas('noite', parque, perfilAtracao);
  }

  switch (parque) {
    case 'Magic Kingdom':
      return fogosMagicKingdom;
    case 'EPCOT':
      return fogosEPCOT;
    case 'Hollywood Studios':
      return fogosHollywoodStudios;
    case 'Animal Kingdom':
      return experienciaPandoraNoite;
    default:
      return gerarAtracoesDisneyPorPerfilAgrupadas('noite', parque, perfilAtracao);
  }
}
