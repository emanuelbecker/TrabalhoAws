import React from 'react';
import { Servico } from '../contexts/AgendamentoContext';
import { Check } from 'lucide-react';

interface CartaoServicoProps {
  servico: Servico;
  selecionado: boolean;
  onClick: () => void;
}

const CartaoServico: React.FC<CartaoServicoProps> = ({ servico, selecionado, onClick }) => {
  // Converte preco para número e trata valores inválidos
  const precoFormatado = (Number(servico.preco) || 0).toFixed(2).replace('.', ',');

  return (
    <div 
      className={`
        relative border-2 p-4 rounded-lg cursor-pointer transition-all hover:shadow-lg
        ${selecionado 
          ? 'border-dourado bg-dourado/10 shadow-md' 
          : 'border-gray-300 bg-white hover:border-dourado-claro'}
      `}
      onClick={onClick}
    >
      {selecionado && (
        <div className="absolute top-2 right-2 bg-dourado rounded-full p-1">
          <Check className="h-4 w-4 text-preto" />
        </div>
      )}
      
      <h3 className="font-titulo text-xl font-semibold mb-2 text-preto">{servico.nome}</h3>
      <p className="font-corpo text-sm text-gray-600 mb-3">{servico.descricao}</p>
      
      <div className="flex justify-between items-center mt-2">
        <span className="font-titulo text-2xl text-preto">
          R$ {precoFormatado}
        </span>
      </div>
    </div>
  );
};

export default CartaoServico;
