import React from 'react';
import { HorarioDisponivel, Agendamento } from '../tipos';
import { formatarHorario } from '../utils/dataUtils';

interface VisualizacaoHorariosProps {
  horariosDisponiveis: HorarioDisponivel[];
  agendamentos: Agendamento[];
}

const VisualizacaoHorarios: React.FC<VisualizacaoHorariosProps> = ({ 
  horariosDisponiveis, 
  agendamentos 
}) => {
  const horariosAgrupados: Record<string, HorarioDisponivel[]> = {};
  
  horariosDisponiveis.forEach(horario => {
    const hora = horario.horarioInicio.split(':')[0];
    if (!horariosAgrupados[hora]) {
      horariosAgrupados[hora] = [];
    }
    horariosAgrupados[hora].push(horario);
  });

  const buscarAgendamento = (horario: HorarioDisponivel): Agendamento | undefined => {
    if (!horario.ocupado || !horario.agendamentoId) return undefined;
    return agendamentos.find(ag => ag.id === horario.agendamentoId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Horários do Dia</h2>
      
      <div className="space-y-4">
        {Object.entries(horariosAgrupados).map(([hora, horarios]) => (
          <div key={hora} className="flex">
            <div className="w-16 flex-shrink-0 text-right pr-4 font-medium text-gray-500">
              {formatarHorario(`${hora}:00`)}
            </div>
            
            <div className="flex-grow border-l border-gray-200 pl-4 space-y-2">
              {horarios.map(horario => {
                const agendamento = buscarAgendamento(horario);
                return (
                  <div 
                    key={horario.id}
                    className={`py-1 px-2 rounded text-sm ${
                      horario.ocupado 
                        ? agendamento?.status === 'confirmado'
                          ? 'bg-green-100 border-l-2 border-green-500'
                          : agendamento?.status === 'recusado'
                            ? 'bg-red-100 border-l-2 border-red-500'
                            : 'bg-yellow-100 border-l-2 border-yellow-500'
                        : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {formatarHorario(horario.horarioInicio)} - {formatarHorario(horario.horarioFim)}
                      </span>
                      {horario.ocupado && agendamento && (
                        <span className="truncate max-w-[150px]">{agendamento.nomeCliente}</span>
                      )}
                    </div>
                    {horario.ocupado && agendamento && (
                      <div className="text-xs text-gray-600 mt-1 truncate">
                        {agendamento.servico}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizacaoHorarios;