import React, { useState, useEffect, useCallback } from 'react';
import { Barbeiro, Horario as HorarioType } from '../types/tipos';
import { CalendarDays, User } from 'lucide-react';

type AgendaDoBarbeiroProps = {
  barbeiro: Barbeiro;
};

const AgendaDoBarbeiro: React.FC<AgendaDoBarbeiroProps> = ({ barbeiro }) => {
  const [dataSelecionada, setDataSelecionada] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [horarios, setHorarios] = useState<HorarioType[]>([]);
  const [diasDaSemana, setDiasDaSemana] = useState<{ data: string; nome: string }[]>([]);

  const gerarHorariosIntervalo = (): string[] => {
    const horarios: string[] = [];
    const inicioManha = new Date();
    inicioManha.setHours(8, 30, 0, 0);
    const fimManha = new Date();
    fimManha.setHours(12, 0, 0, 0);
    const inicioTarde = new Date();
    inicioTarde.setHours(14, 0, 0, 0);
    const fimDia = new Date();
    fimDia.setHours(19, 0, 0, 0);

    let atual = new Date(inicioManha);
    while (atual <= fimManha) {
      horarios.push(atual.toTimeString().slice(0, 5) + ':00');
      atual = new Date(atual.getTime() + 50 * 60 * 1000);
    }

    atual = new Date(inicioTarde);
    while (atual <= fimDia) {
      horarios.push(atual.toTimeString().slice(0, 5) + ':00');
      atual = new Date(atual.getTime() + 50 * 60 * 1000);
    }

    return horarios;
  };

  // Força a data no formato YYYY-MM-DD no timezone local (Brasil)
  function dataLocalISO(dataISO: string): string {
    const d = new Date(dataISO);
    // Aqui você pode usar getFullYear() se backend e frontend estiverem no mesmo timezone
    // Ou getUTCFullYear() se quiser comparar sempre UTC
    // Para garantir o Brasil, use getFullYear/getMonth/getDate:
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  const fetchHorarios = useCallback(async (barbeiroId: number, data: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/agendamentos/?barbeiro=${barbeiroId}&data=${encodeURIComponent(data)}`
      );
      if (!response.ok) throw new Error('Erro ao buscar horários');

      const agendamentosData = await response.json();
      const agendamentos = Array.isArray(agendamentosData)
        ? agendamentosData
        : agendamentosData ? [agendamentosData] : [];

      const agendamentosDoDia = agendamentos.filter((a: any) => {
        // Ajuste: sempre compare dataLocalISO(a.data) === dataLocalISO(data)
        // O data selecionada já vem no formato YYYY-MM-DD, mas pra garantir:
        return dataLocalISO(a.data) === dataLocalISO(data);
      });

      const horariosFixos = gerarHorariosIntervalo();

      const horariosDoDia: HorarioType[] = horariosFixos.map((horaStr, index) => {
        const agendamentoParaHora = agendamentosDoDia.find(
          (a: any) => a.hora_agendada?.slice(0, 5) === horaStr.slice(0, 5)
        );

        return {
          id: agendamentoParaHora?.id || index + 1000,
          barbeiroId,
          data,
          hora: horaStr,
          ocupado: !!agendamentoParaHora,
          cliente: agendamentoParaHora?.cliente_nome,
          servico: agendamentoParaHora?.servico_nome,
          servico_id: agendamentoParaHora?.servico_id,
          aceito: agendamentoParaHora?.confirmado === 1,
          disponivel: !agendamentoParaHora,
        };
      });

      setHorarios(horariosDoDia);
    } catch (err: any) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchHorarios(barbeiro.id, dataSelecionada);
  }, [barbeiro.id, dataSelecionada, fetchHorarios]);

  const handleAceitarPedido = async (horarioId: number) => {
    const horario = horarios.find(h => h.id === horarioId);

    if (!horario || !horario.servico_id) {
      console.warn('Horário inválido ou sem servico_id:', horario);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/agendamentos/${horarioId}/confirmar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data_agendada: horario.data,
          hora_agendada: horario.hora,
          servico_id: horario.servico_id,
        }),
      });

      if (response.ok) {
        setHorarios(prev =>
          prev.map(h =>
            h.id === horarioId ? { ...h, aceito: true, ocupado: true, disponivel: false } : h
          )
        );
      } else {
        const errData = await response.json();
        console.error('Erro no update:', errData);
      }
    } catch (err) {
      console.error('Erro ao confirmar agendamento:', err);
    }
  };

  const gerarDiasDaSemana = (): { data: string; nome: string }[] => {
    const dias = [];
    const nomesDias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    for (let i = 1; i <= 7; i++) {
      const data = new Date();
      data.setDate(data.getDate() + i);

      const diaFormatado = data.toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
      const diaDaSemana = new Date(diaFormatado).getDay();

      dias.push({
        data: diaFormatado,
        nome: i === 1 ? 'Hoje' : i === 2 ? 'Amanhã' : nomesDias[diaDaSemana],
      });
    }

    return dias;
  };

  useEffect(() => {
    setDiasDaSemana(gerarDiasDaSemana());
  }, []);

  const horariosDisponiveis = horarios.filter(h => h.disponivel && !h.ocupado);
  const solicitacoes = horarios.filter(h => h.ocupado && !h.aceito);
  const agendadosConfirmados = horarios.filter(h => h.ocupado && h.aceito);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-amber-500">
          {barbeiro.imagemUrl ? (
            <img src={barbeiro.imagemUrl} alt={`Foto de ${barbeiro.nome}`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-200">
              <User size={32} className="text-slate-400" />
            </div>
          )}
        </div>
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-slate-800">{barbeiro.nome}</h2>
          <p className="text-slate-600">{barbeiro.especialidade}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <CalendarDays size={20} className="mr-2 text-slate-700" />
          <h3 className="text-lg font-semibold">Selecionar Data</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
          {diasDaSemana.map((dia) => (
            <button
              key={dia.data}
              onClick={() => setDataSelecionada(dia.data)}
              className={`p-2 rounded-md text-center transition-colors duration-200 ${
                dataSelecionada === dia.data ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <div className="text-sm font-semibold">{dia.nome}</div>
              <div className="text-xs">
                {new Date(dia.data).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                })}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-600 mb-3">Horários Disponíveis</h3>
        {horariosDisponiveis.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {horariosDisponiveis.map((h) => (
              <div key={h.id} className="bg-gray-300 text-gray-700 rounded-md px-3 py-2 text-center min-w-[75px]">
                {h.hora.slice(0, 5)}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 italic">Nenhum horário disponível.</p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-amber-600 mb-3">Solicitações de Agendamento</h3>
        {solicitacoes.length > 0 ? (
          <ul className="space-y-2">
            {solicitacoes.map((h) => (
              <li key={h.id} className="flex justify-between items-center bg-yellow-50 p-3 rounded shadow-sm">
                <div>
                  <span className="font-semibold">{h.hora.slice(0, 5)}</span> - <span>{h.cliente}</span>
                </div>
                <button
                  onClick={() => handleAceitarPedido(h.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Confirmar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 italic">Nenhuma solicitação pendente.</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-green-600 mb-3">Agendamentos Confirmados</h3>
        {agendadosConfirmados.length > 0 ? (
          <ul className="space-y-2">
            {agendadosConfirmados.map((h) => (
              <li key={h.id} className="flex justify-between items-center bg-green-50 p-3 rounded shadow-sm">
                <div>
                  <span className="font-semibold">{h.hora.slice(0, 5)}</span> - <span>{h.cliente}</span>
                </div>
                <span className="text-green-700 font-semibold">Confirmado</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 italic">Nenhum agendamento confirmado.</p>
        )}
      </div>
    </div>
  );
};

export default AgendaDoBarbeiro;
