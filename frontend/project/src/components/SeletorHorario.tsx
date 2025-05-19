import React from 'react';
import { Horario } from '../contexts/AgendamentoContext';

interface SeletorHorarioProps {
  horarios: Horario[];
  horarioSelecionado: Horario | null;
  onHorarioSelecionado: (id: string) => void;
}

const SeletorHorario: React.FC<SeletorHorarioProps> = ({ 
  horarios, 
  horarioSelecionado,
  onHorarioSelecionado 
}) => {
  return (
    <div className="mb-6">
      <h3 className="font-titulo text-xl mb-4 text-preto">Selecione o Horário</h3>
      
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {horarios.map((horario) => (
          <button
            key={horario.id}
            className={`
              py-2 px-3 rounded-lg transition-all text-center 
              ${!horario.disponivel 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : horarioSelecionado?.id === horario.id
                  ? 'bg-dourado text-preto shadow-md' 
                  : 'bg-white hover:bg-dourado-claro/50 text-preto border border-gray-200'}
            `}
            disabled={!horario.disponivel}
            onClick={() => horario.disponivel && onHorarioSelecionado(horario.id)}
            aria-label={`Horário ${horario.hora} ${horario.disponivel ? 'disponível' : 'indisponível'}`}
          >
            <span className="font-corpo">{horario.hora}</span>
          </button>
        ))}
      </div>
      
      <div className="flex items-center mt-4 text-sm text-gray-500">
        <span className="inline-block w-3 h-3 bg-gray-200 rounded-full mr-2"></span>
        <span className="mr-4">Indisponível</span>
        
        <span className="inline-block w-3 h-3 bg-dourado rounded-full mr-2"></span>
        <span>Selecionado</span>
      </div>
    </div>
  );
};

export default SeletorHorario;