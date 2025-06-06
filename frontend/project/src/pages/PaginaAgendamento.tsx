import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgendamento } from '../contexts/AgendamentoContext';
import CartaoServico from '../components/CartaoServico';
import SeletorData from '../components/SeletorData';
import SeletorBarbeiro from '../components/SeletorBarbeiro';
import SeletorHorario from '../components/SeletorHorario';
import FormularioCliente from '../components/FormularioCliente';

const PaginaAgendamento: React.FC = () => {
  const { 
    servicos, 
    clienteAtual,
    servicoSelecionado,
    barbeiroSelecionado,
    dataSelecionada,
    horarioSelecionado,
    atualizarCliente,
    selecionarServico,
    selecionarBarbeiro,
    selecionarData,
    selecionarHorario,
    confirmarAgendamento,
    setAgendamentoConfirmado,
    obterHorariosDisponiveis,
    obterBarbeirosDisponiveis
  } = useAgendamento();
  
  const navigate = useNavigate();
  
  // Verificar se podemos avançar para o próximo passo
  const podeMostrarHorarios = servicoSelecionado !== null;
  const barbeirosDisponiveis = obterBarbeirosDisponiveis(dataSelecionada);
  const horariosDisponiveis = barbeiroSelecionado 
    ? obterHorariosDisponiveis(dataSelecionada, barbeiroSelecionado.id)
    : [];
  const podeMostrarFormulario = servicoSelecionado !== null && 
    barbeiroSelecionado !== null && 
    horarioSelecionado !== null;
  
  // Quando o usuário confirmar o agendamento
const handleConfirmarAgendamento = async () => {
  const data = {
    nome: clienteAtual?.nome,
    telefone: clienteAtual?.telefone,
    email: clienteAtual?.email,
    servico_id: servicoSelecionado?.id,
    barbeiro_id: barbeiroSelecionado?.id,
    data_agendada: dataSelecionada.toISOString().slice(0, 10),
    hora_agendada: horarioSelecionado
      ? (() => {
          const hora = horarioSelecionado.hora || horarioSelecionado;
          if (typeof hora === 'string') {
            return hora.length === 5 ? hora + ":00" : hora;
          }
          return '';
        })()
      : '',
    confirmado: 0
  };

  console.log("Dados enviados para o backend:", data);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/agendamentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      // Preenche o contexto com o agendamento confirmado:
      setAgendamentoConfirmado({
        id: result.id, // Se quiser manter o ID retornado pelo backend
        data: data.data_agendada,
        horario: data.hora_agendada,
        barbeiro: { nome: barbeiroSelecionado?.nome ?? '' },
        servico: { nome: servicoSelecionado?.nome ?? '', preco: servicoSelecionado?.preco ?? 0 },
        cliente: { nome: clienteAtual?.nome ?? '', telefone: clienteAtual?.telefone ?? '', email: clienteAtual?.email ?? '' },
        confirmado: true
      });
      navigate('/confirmacao');
    } else {
      alert(result.error || 'Erro ao criar agendamento.');
    }
  } catch (error) {
    alert('Erro de conexão com o servidor.');
  }
};
  
  // Scroll para o próximo passo
  useEffect(() => {
    const timer = setTimeout(() => {
      if (podeMostrarHorarios && !podeMostrarFormulario) {
        const elemento = document.getElementById('seletorData');
        elemento?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (podeMostrarFormulario) {
        const elemento = document.getElementById('formularioCliente');
        elemento?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [podeMostrarHorarios, podeMostrarFormulario]);
  
  return (
    <div className="pt-20 pb-16 bg-cinza-claro">
      <div className="container mx-auto px-4">
        {/* Título da página */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-titulo font-bold text-preto mb-4">
            Agendamento <span className="text-dourado">Online</span>
          </h1>
          <p className="font-corpo text-gray-600 max-w-2xl mx-auto">
            Reserve seu horário em nossa barbearia de forma rápida e fácil. Escolha o serviço desejado, 
            a data e o horário que melhor se encaixa na sua agenda.
          </p>
        </div>
        
        {/* Passo 1: Seleção de Serviço */}
        <section className="mb-12 animate-aparecer">
          <h2 className="text-2xl font-titulo font-semibold text-preto mb-6 text-center md:text-left">
            1. Escolha o Serviço
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((servico) => (
              <CartaoServico
                key={servico.id}
                servico={servico}
                selecionado={servicoSelecionado?.id === servico.id}
                onClick={() => selecionarServico(servico.id)}
              />
            ))}
          </div>
        </section>
        
        {/* Passo 2: Seleção de Data e Barbeiro */}
        {podeMostrarHorarios && (
          <section id="seletorData" className="mb-12 animate-aparecer">
            <h2 className="text-2xl font-titulo font-semibold text-preto mb-6 text-center md:text-left">
              2. Escolha a Data e o Barbeiro
            </h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <SeletorData 
                dataSelecionada={dataSelecionada}
                onDataSelecionada={selecionarData}
              />
              
              {barbeirosDisponiveis.length > 0 ? (
                <SeletorBarbeiro
                  barbeiros={barbeirosDisponiveis}
                  barbeiroSelecionado={barbeiroSelecionado}
                  onBarbeiroSelecionado={selecionarBarbeiro}
                />
              ) : (
                <p className="text-center text-gray-600 py-4">
                  Não há barbeiros disponíveis nesta data. Por favor, selecione outra data.
                </p>
              )}
              
              {barbeiroSelecionado && (
                <SeletorHorario 
                  horarios={horariosDisponiveis}
                  horarioSelecionado={horarioSelecionado}
                  onHorarioSelecionado={selecionarHorario}
                />
              )}
            </div>
          </section>
        )}
        
        {/* Passo 3: Formulário do Cliente */}
        {podeMostrarFormulario && (
          <section id="formularioCliente" className="mb-12 animate-aparecer">
            <h2 className="text-2xl font-titulo font-semibold text-preto mb-6 text-center md:text-left">
              3. Complete seus Dados
            </h2>
            
            <FormularioCliente 
              cliente={clienteAtual}
              onClienteAtualizado={atualizarCliente}
              onSubmit={handleConfirmarAgendamento}
            />
          </section>
        )}
      </div>
    </div>
  );
};


export default PaginaAgendamento;
