import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Barbeiro } from '../tipos';
import CartaoBarbeiro from '../componentes/CartaoBarbeiro';
import { barbeiros } from '../dados/dadosMock';
import { Scissors } from 'lucide-react';
import { useAgendamentos } from '../contexto/AgendamentoContexto';

const SelecaoBarbeiro: React.FC = () => {
  const navigate = useNavigate();
  const { setBarbeiroSelecionadoId } = useAgendamentos();

  const selecionarBarbeiro = (barbeiroId: string) => {
    setBarbeiroSelecionadoId(barbeiroId);
    navigate(`/agendamentos/${barbeiroId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Scissors className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Barbearia Corte & Estilo</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600">Selecione um barbeiro para gerenciar os agendamentos</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Barbeiros</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbeiros.map((barbeiro: Barbeiro) => (
            <CartaoBarbeiro
              key={barbeiro.id}
              barbeiro={barbeiro}
              aoClicar={selecionarBarbeiro}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SelecaoBarbeiro;