import React from 'react';
import { Barbeiro } from '../contexts/AgendamentoContext';

interface SeletorBarbeiroProps {
  barbeiros: Barbeiro[];
  barbeiroSelecionado: Barbeiro | null;
  onBarbeiroSelecionado: (id: string) => void;
}

const SeletorBarbeiro: React.FC<SeletorBarbeiroProps> = ({
  barbeiros,
  barbeiroSelecionado,
  onBarbeiroSelecionado
}) => {
  return (
    <div className="mb-6">
      <h3 className="font-titulo text-xl mb-4 text-preto">Escolha seu Barbeiro</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {barbeiros.map((barbeiro) => (
          <button
            key={barbeiro.id}
            onClick={() => onBarbeiroSelecionado(barbeiro.id)}
            className={`
              flex flex-col items-center p-4 rounded-lg transition-all
              ${barbeiroSelecionado?.id === barbeiro.id
                ? 'bg-dourado text-preto shadow-md transform scale-105'
                : 'bg-white hover:bg-dourado-claro/50 text-preto border border-gray-200'
              }
            `}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/barbeiros/${barbeiro.id}/imagem`}
                alt={`Barbeiro ${barbeiro.nome}`}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-titulo font-semibold text-lg">{barbeiro.nome}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeletorBarbeiro;
