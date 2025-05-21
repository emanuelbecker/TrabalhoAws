import React from 'react';
import { Agendamento } from '../tipos';
import { Clock, Calendar, Scissors, MessageSquare, Check, X } from 'lucide-react';
import { formatarHorario, formatarDuracao, calcularTempoRestante } from '../utils/dataUtils';

interface CartaoAgendamentoProps {
  agendamento: Agendamento;
  aoConfirmar: (id: string) => void;
  aoRecusar: (id: string) => void;
}

const CartaoAgendamento: React.FC<CartaoAgendamentoProps> = ({ 
  agendamento, 
  aoConfirmar, 
  aoRecusar 
}) => {
  const coresStatus = {
    pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmado: 'bg-green-100 text-green-800 border-green-200',
    recusado: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500 transition-all duration-200 hover:shadow-lg mb-4">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900">{agendamento.nomeCliente}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${coresStatus[agendamento.status]}`}>
            {agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-gray-700">
            <Scissors className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm">{agendamento.servico}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm">{formatarHorario(agendamento.horario)} • {formatarDuracao(agendamento.duracao)}</span>
          </div>
          
          {agendamento.observacoes && (
            <div className="flex items-start col-span-2 text-gray-700 bg-gray-50 p-2 rounded-md">
              <MessageSquare className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{agendamento.observacoes}</span>
            </div>
          )}
        </div>
        
        {agendamento.status === 'pendente' && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-gray-400" />
              <span>Faltam {calcularTempoRestante(agendamento.horario)}</span>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => aoRecusar(agendamento.id)}
                className="px-3 py-1 bg-white border border-red-500 text-red-500 rounded-md text-sm font-medium flex items-center hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4 mr-1" />
                Recusar
              </button>
              
              <button 
                onClick={() => aoConfirmar(agendamento.id)}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-medium flex items-center hover:bg-green-600 transition-colors"
              >
                <Check className="w-4 h-4 mr-1" />
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartaoAgendamento;