import React from 'react';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'lucide-react';

interface FiltradorDataProps {
  dataSelecionada: string;
  aoMudarData: (data: string) => void;
}

const abreviarDiaSemana = (data: Date) => {
  const dia = format(data, 'EEEE', { locale: ptBR }); // dia da semana completo
  return dia.charAt(0).toUpperCase() + dia.slice(1, 3); // 3 primeiras letras com a primeira maiúscula
};

const FiltradorData: React.FC<FiltradorDataProps> = ({ dataSelecionada, aoMudarData }) => {
  const hoje = new Date();
  const opcoesData = Array.from({ length: 7 }, (_, i) => {
    const data = addDays(hoje, i);
    return {
      valor: format(data, 'yyyy-MM-dd'),
      rotulo:
        i === 0
          ? 'Hoje'
          : i === 1
          ? 'Amanhã'
          : `${abreviarDiaSemana(data)}, ${format(data, 'dd/MM')}`,
      data
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center mb-3">
        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-md font-semibold text-gray-800">Filtrar por Data</h3>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {opcoesData.map((opcao) => (
          <button
            key={opcao.valor}
            onClick={() => aoMudarData(opcao.valor)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              dataSelecionada === opcao.valor
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {opcao.rotulo}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FiltradorData;
