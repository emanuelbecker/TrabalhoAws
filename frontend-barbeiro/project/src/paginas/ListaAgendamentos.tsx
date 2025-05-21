import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, CalendarX, ClipboardCheck } from 'lucide-react';
import { useAgendamentos } from '../contexto/AgendamentoContexto';
import { barbeiros } from '../dados/dadosMock';
import CartaoAgendamento from '../componentes/CartaoAgendamento';
import BarraPesquisa from '../componentes/BarraPesquisa';
import FiltradorData from '../componentes/FiltradorData';
import VisualizacaoHorarios from '../componentes/VisualizacaoHorarios';

const ListaAgendamentos: React.FC = () => {
  const { barbeiroId } = useParams<{ barbeiroId: string }>();
  const navigate = useNavigate();
  
  const { 
    agendamentosFiltrados, 
    dataSelecionada, 
    setDataSelecionada, 
    termoBusca, 
    setTermoBusca, 
    confirmarAgendamento, 
    recusarAgendamento,
    horariosDisponiveis,
    agendamentos,
    setBarbeiroSelecionadoId
  } = useAgendamentos();

  useEffect(() => {
    if (barbeiroId) {
      setBarbeiroSelecionadoId(barbeiroId);
    }
  }, [barbeiroId, setBarbeiroSelecionadoId]);

  const barbeiro = barbeiros.find(b => b.id === barbeiroId);
  
  const voltar = () => {
    navigate('/');
  };

  const agendamentosPendentes = agendamentosFiltrados.filter(ag => ag.status === 'pendente').length;
  const agendamentosConfirmados = agendamentosFiltrados.filter(ag => ag.status === 'confirmado').length;
  const agendamentosRecusados = agendamentosFiltrados.filter(ag => ag.status === 'recusado').length;

  if (!barbeiro) {
    return <div>Barbeiro não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button 
            onClick={voltar}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Voltar para Barbeiros</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={barbeiro.urlImagem} 
                alt={barbeiro.nome}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{barbeiro.nome}</h1>
                <p className="text-sm text-gray-600">{barbeiro.especialidade}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                <div className="p-2 rounded-full bg-yellow-100 mb-2">
                  <ClipboardCheck className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold">{agendamentosPendentes}</span>
                <span className="text-sm text-gray-500">Pendentes</span>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                <div className="p-2 rounded-full bg-green-100 mb-2">
                  <CalendarCheck className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold">{agendamentosConfirmados}</span>
                <span className="text-sm text-gray-500">Confirmados</span>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                <div className="p-2 rounded-full bg-red-100 mb-2">
                  <CalendarX className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-2xl font-bold">{agendamentosRecusados}</span>
                <span className="text-sm text-gray-500">Recusados</span>
              </div>
            </div>
            
            <BarraPesquisa 
              valor={termoBusca} 
              aoMudar={setTermoBusca} 
              placeholder="Pesquisar por cliente..."
            />
            
            <FiltradorData 
              dataSelecionada={dataSelecionada} 
              aoMudarData={setDataSelecionada} 
            />
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Agendamentos</h2>
              
              {agendamentosFiltrados.length > 0 ? (
                <div className="space-y-4">
                  {agendamentosFiltrados.map(agendamento => (
                    <CartaoAgendamento
                      key={agendamento.id}
                      agendamento={agendamento}
                      aoConfirmar={confirmarAgendamento}
                      aoRecusar={recusarAgendamento}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <CalendarX className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum agendamento encontrado</h3>
                  <p className="text-gray-500">Não há agendamentos para esta data ou critério de busca.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <VisualizacaoHorarios 
              horariosDisponiveis={horariosDisponiveis} 
              agendamentos={agendamentos} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListaAgendamentos;