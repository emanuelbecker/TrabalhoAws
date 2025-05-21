import React from 'react';
import { Search, X } from 'lucide-react';

interface BarraPesquisaProps {
  valor: string;
  aoMudar: (valor: string) => void;
  placeholder?: string;
}

const BarraPesquisa: React.FC<BarraPesquisaProps> = ({ 
  valor, 
  aoMudar, 
  placeholder = 'Pesquisar clientes ou serviços...' 
}) => {
  const limpar = () => {
    aoMudar('');
  };

  return (
    <div className="relative w-full mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      
      <input
        type="text"
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 shadow-sm"
        placeholder={placeholder}
      />
      
      {valor && (
        <button
          onClick={limpar}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default BarraPesquisa;