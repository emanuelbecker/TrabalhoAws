import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Calendar, Clock, Scissors, User } from 'lucide-react';
import { useAgendamento } from '../contexts/AgendamentoContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const PaginaConfirmacao: React.FC = () => {
  const { agendamentoConfirmado } = useAgendamento();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!agendamentoConfirmado) {
      navigate('/');
    }
  }, [agendamentoConfirmado, navigate]);
  
  if (!agendamentoConfirmado) {
    return null;
  }
  
  return (
    <div className="pt-20 pb-16 bg-cinza-claro min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cabeçalho de confirmação */}
          <div className="bg-dourado text-preto p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-dourado" />
            </div>
            <h1 className="text-3xl font-titulo font-bold mb-2">Agendamento Confirmado!</h1>
            <p className="font-corpo">Seu horário está reservado com sucesso.</p>
          </div>
          
          {/* Detalhes do agendamento */}
          <div className="p-6">
            <h2 className="text-xl font-titulo font-semibold mb-4 text-preto">Detalhes do Agendamento</h2>
            
            <div className="border-t border-gray-200 py-4">
              <div className="flex items-start mb-4">
                <div className="bg-dourado/10 p-2 rounded-full mr-4">
                  <Calendar className="h-5 w-5 text-dourado" />
                </div>
                <div>
                  <p className="font-corpo text-sm text-gray-500">Data</p>
                  <p className="font-corpo font-semibold text-preto">
                    {format(agendamentoConfirmado.data, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="bg-dourado/10 p-2 rounded-full mr-4">
                  <Clock className="h-5 w-5 text-dourado" />
                </div>
                <div>
                  <p className="font-corpo text-sm text-gray-500">Horário</p>
                  <p className="font-corpo font-semibold text-preto">{agendamentoConfirmado.horario}</p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="bg-dourado/10 p-2 rounded-full mr-4">
                  <User className="h-5 w-5 text-dourado" />
                </div>
                <div>
                  <p className="font-corpo text-sm text-gray-500">Barbeiro</p>
                  <p className="font-corpo font-semibold text-preto">{agendamentoConfirmado.barbeiro.nome}</p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="bg-dourado/10 p-2 rounded-full mr-4">
                  <Scissors className="h-5 w-5 text-dourado" />
                </div>
                <div>
                  <p className="font-corpo text-sm text-gray-500">Serviço</p>
                  <p className="font-corpo font-semibold text-preto">{agendamentoConfirmado.servico.nome}</p>
                  <p className="font-corpo text-sm text-gray-600">
                    Valor: R$ {Number(agendamentoConfirmado.servico.preco).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Informações do cliente */}
            <div className="border-t border-gray-200 py-4">
              <h3 className="font-titulo text-lg font-semibold mb-3 text-preto">Seus Dados</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-corpo text-sm text-gray-500">Nome</p>
                  <p className="font-corpo font-semibold text-preto">{agendamentoConfirmado.cliente.nome}</p>
                </div>
                
                <div>
                  <p className="font-corpo text-sm text-gray-500">Telefone</p>
                  <p className="font-corpo font-semibold text-preto">{agendamentoConfirmado.cliente.telefone}</p>
                </div>
                
                <div className="md:col-span-2">
                  <p className="font-corpo text-sm text-gray-500">E-mail</p>
                  <p className="font-corpo font-semibold text-preto">{agendamentoConfirmado.cliente.email}</p>
                </div>
              </div>
            </div>
            
            {/* Informações adicionais */}
            <div className="bg-gray-50 p-4 rounded-md mt-4">
              <p className="font-corpo text-sm text-gray-600">
                <span className="font-semibold">Importante:</span> Em caso de cancelamento ou reagendamento, 
                entre em contato conosco com pelo menos 2 horas de antecedência pelo telefone (46) 99928-0528.
              </p>
            </div>
            
            {/* Botão de volta para a página inicial */}
            <div className="text-center mt-8">
              <button 
                onClick={() => navigate('/')}
                className="bg-dourado hover:bg-dourado-claro text-preto font-semibold py-3 px-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dourado"
              >
                Voltar para a Página Inicial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaConfirmacao;
