import React from 'react';
import { Horario as HorarioType } from '../types/tipos';
import { Clock, User, Check, X } from 'lucide-react';

type HorarioProps = {
  horario: HorarioType;
  onAceitarPedido?: (horarioId: number) => void;
  onRecusarPedido?: (horarioId: number) => void;
};

const Horario: React.FC<HorarioProps> = ({ horario, onAceitarPedido, onRecusarPedido }) => {
  return (
    <div 
      className={`
        p-3 rounded-md shadow-sm flex flex-col items-center justify-center
        transition-all duration-200 transform hover:scale-105
        ${horario.ocupado 
          ? 'bg-green-50 border border-green-200' 
          : 'bg-gray-50 border border-gray-200'
        }
      `}
    >
      <div className="flex items-center mb-1">
        <Clock size={16} className={horario.ocupado ? 'text-green-500' : 'text-gray-500'} />
        <span className="ml-1 font-medium">{horario.hora}</span>
      </div>
      
      {horario.ocupado && horario.cliente && (
        <div className="text-xs text-slate-700 flex flex-col items-center gap-1">
          <div className="flex items-center">
            <User size={12} className="mr-1" />
            <span>{horario.cliente}</span>
          </div>
          <div className="text-xs text-slate-600">
            {horario.servico}
          </div>
          
          {!horario.aceito && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onAceitarPedido?.(horario.id)}
                className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600"
                title="Aceitar"
              >
                <Check size={14} />
              </button>
              <button
                onClick={() => onRecusarPedido?.(horario.id)}
                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                title="Recusar"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          {horario.aceito && (
            <span className="text-green-600 font-medium text-xs mt-1">
              Confirmado ✓
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Horario;