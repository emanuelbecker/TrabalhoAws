import React from 'react';
import { Agendamento } from '../tipos';
import { formatarHorario } from '../utils/dataUtils';

interface VisualizacaoHorariosProps {
  agendamentos: Agendamento[];
}

const VisualizacaoHorarios: React.FC<VisualizacaoHorariosProps> = ({ agendamentos }) => {
  // Filtrar apenas os agendamentos confirmados
  const agendamentosConfirmados = agendamentos.filter(ag => ag.confirmado === 1);

  // Agrupar os agendamentos confirmados por hora (ex: '08', '09', etc.)
  const agendamentosAgrupados: Record<string, Agendamento[]> = {};
  agendamentosConfirmados.forEach(agendamento => {
    const horaAgendada = typeof agendamento.hora_agendada === 'function'
      ? agendamento.hora_agendada(agendamento)
      : agendamento.hora_agendada;
    const hora = typeof horaAgendada === 'string'
      ? horaAgendada.split(':')[0]
      : '';
    if (!agendamentosAgrupados[hora]) {
      agendamentosAgrupados[hora] = [];
    }
    agendamentosAgrupados[hora].push(agendamento);
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Horários Confirmados do Dia</h2>

      <div className="space-y-4">
        {Object.entries(agendamentosAgrupados).map(([hora, ags]) => (
          <div key={hora} className="flex">
            <div className="w-16 flex-shrink-0 text-right pr-4 font-medium text-gray-500">
              {formatarHorario(`${hora}:00`)}
            </div>

            <div className="flex-grow border-l border-gray-200 pl-4 space-y-2">
              {ags.map(ag => (
                <div
                  key={ag.id}
                  className="py-1 px-2 rounded text-sm bg-green-100 border-l-2 border-green-500"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {(() => {
                        const hora =
                          typeof ag.hora_agendada === 'function'
                            ? ag.hora_agendada(ag)
                            : ag.hora_agendada;
                        return typeof hora === 'string'
                          ? formatarHorario(hora)
                          : <span className="text-red-500">Horário inválido</span>;
                      })()}
                    </span>
                    <span className="truncate max-w-[150px]">{ag.cliente_nome}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 truncate">
                    {ag.servico_nome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {agendamentosConfirmados.length === 0 && (
          <p className="text-gray-500 text-sm text-center">Nenhum horário confirmado encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default VisualizacaoHorarios;
