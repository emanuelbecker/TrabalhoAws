import React from 'react';
import { Barbeiro } from '../tipos';
import { Scissors, Star, Calendar } from 'lucide-react';

interface CartaoBarbeiroProps {
  barbeiro: Barbeiro;
  aoClicar: (barbeiroId: string) => void;
}

const CartaoBarbeiro: React.FC<CartaoBarbeiroProps> = ({ barbeiro, aoClicar }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer"
      onClick={() => aoClicar(barbeiro.id)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={barbeiro.urlImagem} 
          alt={`Barbeiro ${barbeiro.nome}`}
          className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
        />
        
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{barbeiro.nome}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <Scissors className="w-4 h-4 mr-2" />
          <p className="text-sm">{barbeiro.especialidade}</p>
        </div>
      </div>
    </div>
  );
};

export default CartaoBarbeiro;