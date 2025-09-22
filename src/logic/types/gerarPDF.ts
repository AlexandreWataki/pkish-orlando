import { Roteiro, Dia, Turno, Atracao } from '@/types/roteiro';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function montarHTML(roteiro: Roteiro): string {
  let conteudo = `
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { text-align: center; }
        h2 { margin-top: 30px; color: #1E90FF; }
        h3 { margin-top: 15px; color: #333; }
        ul { margin-top: 5px; padding-left: 20px; }
        li { margin-bottom: 4px; }
        .horario { font-style: italic; font-size: 13px; color: #666; margin-left: 5px; }
      </style>
    </head>
    <body>
      <h1>Meu Roteiro â€“ App Orlando</h1>
  `;

  roteiro.dias.forEach((dia: Dia) => {
    const dataFormatada = dia.data
      ? format(new Date(dia.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
      : `Dia ${dia.numero}`;

    conteudo += `<h2>${dataFormatada} â€“ ${dia.tipo}</h2>`;

    const periodos = ['manha', 'tarde', 'noite'] as const;

    periodos.forEach((periodo) => {
      const turno: Turno | undefined = dia.turnos.find(t => t.periodo === periodo);

      if (turno && turno.atividades.length > 0) {
        const horario = turno.inicio && turno.fim ? ` <span class="horario">(${turno.inicio} Ã s ${turno.fim})</span>` : '';
        conteudo += `<h3>${periodo[0].toUpperCase() + periodo.slice(1)}${horario}</h3><ul>`;
        
        turno.atividades.forEach((a: Atracao) => {
          conteudo += `<li><strong>${a.nome}</strong> (${a.tipo} â€“ ${a.area})</li>`;
        });

        conteudo += `</ul>`;
      }
    });
  });

  conteudo += `</body></html>`;
  return conteudo;
}
