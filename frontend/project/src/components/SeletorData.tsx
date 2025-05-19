import React from 'react';
import { addDays, format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface SeletorDataProps {
  dataSelecionada: Date;
  onDataSelecionada: (data: Date) => void;
}

const SeletorData: React.FC<SeletorDataProps> = ({ dataSelecionada, onDataSelecionada }) => {
  // Gerar próximos 7 dias
  const proximosDias = Array.from({ length: 7 }, (_, i) => {
    return addDays(new Date(), i);
  });

  return (
    <div className="mb-6">
      <h3 className="font-titulo text-xl mb-4 text-preto">Selecione a Data</h3>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
        {proximosDias.map((dia) => {
          const diaSemana = format(dia, 'EEE', { locale: ptBR });
          const diaMes = format(dia, 'd', { locale: ptBR });
          const mesAbrev = format(dia, 'MMM', { locale: ptBR });
          const selecionado = isSameDay(dia, dataSelecionada);
          
          return (
            <button
              key={dia.toISOString()}
              className={`
                flex flex-col items-center p-3 rounded-lg transition-all
                ${selecionado 
                  ? 'bg-dourado text-preto shadow-md transform scale-105' 
                  : 'bg-white hover:bg-dourado-claro/50 text-preto border border-gray-200'}
              `}
              onClick={() => onDataSelecionada(dia)}
              aria-label={`Selecionar ${format(dia, 'PPPP', { locale: ptBR })}`}
            >
              <span className="text-xs font-semibold uppercase">
                {diaSemana}
              </span>
              <span className="text-lg font-bold mt-1">{diaMes}</span>
              <span className="text-xs">{mesAbrev}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SeletorData;