import React, { createContext, useContext, useEffect, useState } from 'react';
import { Horario } from '../types/tipos';

interface AgendamentoContextProps {
  agendamentos: Horario[];
  carregarAgendamentos: () => Promise<void>;
  confirmarAgendamento: (id: number) => void;
  cancelarAgendamento: (id: number) => void;
}
//atualizar tudo que for necessário para o contexto de agendamentos
// e adicionar o servico_id como opcional, caso não seja necessário em todos os casos
const AgendamentoContext = createContext<AgendamentoContextProps | undefined>(undefined);

export const AgendamentoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agendamentos, setAgendamentos] = useState<Horario[]>([]);

  const carregarAgendamentos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/agendamentos/');
      const data = await response.json();

      const formatados: Horario[] = data.map((item: any) => ({
        id: item.id,
        barbeiroId: item.idBarbeiro,
        data: item.data.split('T')[0],
        hora: item.hora_agendada.slice(0, 5),
        ocupado: !!item.cliente_nome,
        cliente: item.cliente_nome || undefined,
        servico: item.servico_nome || undefined,
        aceito: item.confirmado === 1,
        servico_id: item.servico_id ?? undefined,   // <-- inclui servico_id
        // Adicione outros campos necessários do backend se for utilizar, ex:
        // preco: item.preco,
        // descricao: item.descricao,
      }));

      setAgendamentos(formatados);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  };

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const confirmarAgendamento = (id: number) => {
    setAgendamentos((prev) =>
      prev.map((ag) =>
        ag.id === id ? { ...ag, aceito: true } : ag
      )
    );
  };

  const cancelarAgendamento = (id: number) => {
    setAgendamentos((prev) =>
      prev.map((ag) =>
        ag.id === id
          ? {
              ...ag,
              ocupado: false,
              aceito: false,
              cliente: undefined,
              servico: undefined,
              servico_id: undefined,
            }
          : ag
      )
    );
  };

  return (
    <AgendamentoContext.Provider
      value={{ agendamentos, carregarAgendamentos, confirmarAgendamento, cancelarAgendamento }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
};

export const useAgendamento = () => {
  const context = useContext(AgendamentoContext);
  if (!context) {
    throw new Error('useAgendamento deve ser usado dentro de um AgendamentoProvider');
  }
  return context;
};
