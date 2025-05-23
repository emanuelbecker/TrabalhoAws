import React from 'react';
import { Barbeiro } from '../types/tipos';
import { Scissors } from 'lucide-react';

type BarbeiroCardProps = {
  barbeiro: Barbeiro;
  onClick: () => void;
};

const BarbeiroCard: React.FC<BarbeiroCardProps> = ({ barbeiro, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="h-56 overflow-hidden relative">
        {barbeiro.imagemUrl ? (
          <img 
            src={barbeiro.imagemUrl} 
            alt={`Foto de ${barbeiro.nome}`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200">
            <Scissors size={48} className="text-slate-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-slate-800">{barbeiro.nome}</h3>
        <p className="text-slate-600 mt-1">{barbeiro.especialidade}</p>
        <div className="mt-3">
          <span className="text-sm text-white bg-amber-600 py-1 px-2 rounded-full">
            {barbeiro.clientes} clientes
          </span>
        </div>
      </div>
    </div>
  );
};

export default BarbeiroCard;