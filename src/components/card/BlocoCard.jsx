ï»¿// src/components/BlocoCard.tsx
import { Card } from 'primereact/card';

/**
 * Componente visual reutilizÃƒÂ¡vel que exibe um bloco com tÃƒÂ­tulo, conteÃƒÂºdo e ÃƒÂ­cones.
 * Props:
 * - title (string): tÃƒÂ­tulo principal do bloco
 * - emoji (string): opcional, emoji antes do tÃƒÂ­tulo
 * - content (string ou array): corpo do texto; pode ser string com quebras ou array de strings
 * - extra (JSX): opcional, aÃƒÂ§ÃƒÂµes ou conteÃƒÂºdo complementar abaixo
 * - children (JSX): opcional, conteÃƒÂºdo genÃƒÂ©rico adicional
 * - tipo (string): opcional, usado para mudar a cor de fundo (ex: 'disney', 'universal', 'compras')
 */
const BlocoCard = ({ title, emoji = null, content = '', children, extra = null, tipo = '' }) => {
  // Garante que o conteÃƒÂºdo seja um array de strings
  const lines = Array.isArray(content)
    ? content
    : content
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);

  // Cores por tipo
  const coresPorTipo = {
    disney:     { fundo: 'rgba(0, 119, 200, 0.9)', borda: '#FFD700' },
    universal:  { fundo: 'rgba(85, 0, 170, 0.9)', borda: '#FF69B4' },
    compras:    { fundo: 'rgba(0, 150, 100, 0.9)', borda: '#FFA500' },
    saida:      { fundo: 'rgba(160, 0, 0, 0.9)',     borda: '#FF8C00' },
    chegada:    { fundo: 'rgba(0, 102, 204, 0.9)',  borda: '#FFD700' },
    default:    { fundo: 'rgba(0, 119, 200, 0.9)', borda: '#FFD700' },
  };

  const { fundo, borda } = coresPorTipo[tipo?.toLowerCase()] || coresPorTipo.default;

  return (
    <Card
      className="shadow-4 w-full"
      style={{
        backgroundColor: fundo,
        color: '#ffffff',
        borderRadius: '1rem',
        border: `3px solid ${borda}`,
        marginBottom: '1.5rem',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
      }}
    >
      {/* TÃƒÂ­tulo com emoji */}
      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
        {emoji && <span>{emoji}</span>}
        <span>{title}</span>
      </h3>

      {/* ConteÃƒÂºdo (string ÃƒÂºnica ou lista) */}
      {lines.length > 0 &&
        (lines.length === 1 ? (
          <p className="text-base leading-relaxed whitespace-pre-wrap">{lines[0]}</p>
        ) : (
          <ul className="list-disc pl-5 text-base leading-relaxed">
            {lines.map((line, index) => (
              <li key={index} className="mb-1 whitespace-pre-wrap">
                {line}
              </li>
            ))}
          </ul>
        ))}

      {/* Extra e children */}
      {extra && <div className="mt-3">{extra}</div>}
      {children && <div className="mt-3">{children}</div>}
    </Card>
  );
};

export default BlocoCard;
