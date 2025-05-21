import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, CalendarX, ClipboardCheck } from 'lucide-react';
import { useAgendamentos } from '../contexto/AgendamentoContexto';
import { barbeiros } from '../dados/dadosMock';
import CartaoAgendamento from '../componentes/CartaoAgendamento';
import BarraPesquisa from '../componentes/BarraPesquisa';
import FiltradorData from '../componentes/FiltradorData';

interface Horario {
  horarioInicio: string;
  horarioFim: string;
}

// Função para gerar horários disponíveis pulando intervalo do meio-dia
const gerarHorariosDisponiveis = (): Horario[] => {
  const horarios: Horario[] = [];
  const pad = (num: number) => num.toString().padStart(2, '0');

  let hora = 8;
  let minuto = 30;

  while (true) {
    const horarioInicio = `${pad(hora)}:${pad(minuto)}`;

    let fimHora = hora;
    let fimMinuto = minuto + 20;
    if (fimMinuto >= 60) {
      fimHora += 1;
      fimMinuto -= 60;
    }
    const horarioFim = `${pad(fimHora)}:${pad(fimMinuto)}`;

    if (hora > 18 || (hora === 18 && minuto > 50)) break;

    // Pula intervalo do meio-dia das 11:50 até 13:30
    if (
      (hora > 11 || (hora === 11 && minuto >= 50)) &&
      (hora < 13 || (hora === 13 && minuto < 30))
    ) {
      hora = 13;
      minuto = 30;
      continue;
    }

    horarios.push({ horarioInicio, horarioFim });

    minuto += 20;
    if (minuto >= 60) {
      hora += 1;
      minuto -= 60;
    }
  }

  return horarios;
};

// Função auxiliar para converter "HH:mm" em minutos totais desde 00:00
const horarioParaMinutos = (horario: string): number => {
  const [h, m] = horario.split(':').map(Number);
  return h * 60 + m;
};

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
    agendamentos,
    setBarbeiroSelecionadoId
  } = useAgendamentos();

  const [horariosDisponiveis, setHorariosDisponiveis] = useState<Horario[]>([]);

  useEffect(() => {
    if (barbeiroId) {
      setBarbeiroSelecionadoId(barbeiroId);
    }
  }, [barbeiroId, setBarbeiroSelecionadoId]);

  useEffect(() => {
    const horarios = gerarHorariosDisponiveis();
    setHorariosDisponiveis(horarios);
  }, []);

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

  // Cria um Set de horários confirmados, baseado em agendamentos confirmados e indisponíveis (disponivel === false)
  // Considera o intervalo de 20 min de cada agendamento para marcar os blocos ocupados
  const horariosConfirmadosSet = new Set<string>();

  agendamentosFiltrados
    .filter(ag => ag.status === 'confirmado' && ag.disponivel === false)
    .forEach(ag => {
      const inicioMin = horarioParaMinutos(ag.horarioInicio);
      const fimMin = horarioParaMinutos(ag.horario);

      for (let t = inicioMin; t < fimMin; t += 20) {
        const hora = Math.floor(t / 60);
        const minuto = t % 60;
        const horarioFormatado = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        horariosConfirmadosSet.add(horarioFormatado);
      }
    });

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
                      aoConfirmar={(id) => confirmarAgendamento(Number(id))}
                      aoRecusar={(id) => recusarAgendamento(Number(id))}
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

          {/* Lateral com horários */}
          <div className="lg:w-1/3 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Horários Disponíveis</h2>
            <ul className="divide-y divide-gray-200 max-h-[600px] overflow-auto">
              {horariosDisponiveis.map(({ horarioInicio, horarioFim }) => {
                const ocupado = horariosConfirmadosSet.has(horarioInicio);

                return (
                  <li
                    key={horarioInicio}
                    className={`py-2 px-3 rounded mb-1 cursor-default
                      ${ocupado ? 'bg-cyan-100 text-cyan-800 font-semibold' : 'bg-white text-gray-700 border border-gray-300'}
                    `}
                  >
                    {horarioInicio} - {horarioFim}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListaAgendamentos;
