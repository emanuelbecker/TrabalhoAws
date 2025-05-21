import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Agendamento, HorarioDisponivel } from '../tipos';
import { gerarHorariosDisponiveis } from '../dados/dadosMock';
import { formatarData } from '../utils/dataUtils';

interface ContextoAgendamentoProps {
  agendamentos: Agendamento[];
  agendamentosFiltrados: Agendamento[];
  dataSelecionada: string;
  termoBusca: string;
  horariosDisponiveis: HorarioDisponivel[];
  setDataSelecionada: (data: string) => void;
  setTermoBusca: (termo: string) => void;
  confirmarAgendamento: (id: number) => void;
  recusarAgendamento: (id: number) => void;
  setBarbeiroSelecionadoId: (id: string) => void;
  barbeiroSelecionadoId: string;
}

const AgendamentoContexto = createContext<ContextoAgendamentoProps | undefined>(undefined);

export const ProvedorAgendamento: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<string>(formatarData(new Date(), 'yyyy-MM-dd'));
  const [termoBusca, setTermoBusca] = useState<string>('');
  const [barbeiroSelecionadoId, setBarbeiroSelecionadoId] = useState<string>('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<HorarioDisponivel[]>([]);

  useEffect(() => {
    const buscarAgendamentos = async () => {
      try {
        const resposta = await axios.get('http://localhost:3000/api/agendamentos');
        setAgendamentos(resposta.data);
      } catch (erro) {
        console.error('Erro ao buscar agendamentos:', erro);
      }
    };

    buscarAgendamentos();
  }, []);

  const agendamentosFiltrados = agendamentos.filter(agendamento => {
    const dataFormatada = formatarData(new Date(agendamento.data), 'yyyy-MM-dd');
    const correspondeData = dataFormatada === dataSelecionada;
    const correspondeBarbeiro = agendamento.barbeiro_nome === barbeiroSelecionadoId;
    const correspondeBusca = termoBusca === '' || 
      agendamento.cliente_nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      agendamento.servico_nome.toLowerCase().includes(termoBusca.toLowerCase());

    return correspondeData && correspondeBarbeiro && correspondeBusca;
  });

  useEffect(() => {
    if (barbeiroSelecionadoId && dataSelecionada) {
      const horarios = gerarHorariosDisponiveis(barbeiroSelecionadoId, dataSelecionada);
      setHorariosDisponiveis(horarios);
    }
  }, [barbeiroSelecionadoId, dataSelecionada, agendamentos]);

  const confirmarAgendamento = async (id: number) => {
    try {
      await axios.patch(`http://localhost:3000/api/agendamentos/${id}`, { confirmado: 1 });
      setAgendamentos(prev =>
        prev.map(ag => ag.id === id ? { ...ag, confirmado: 1 } : ag)
      );
    } catch (erro) {
      console.error('Erro ao confirmar agendamento:', erro);
    }
  };

  const recusarAgendamento = async (id: number) => {
    try {
      await axios.patch(`http://localhost:3000/api/agendamentos/${id}`, { confirmado: 0 });
      setAgendamentos(prev =>
        prev.map(ag => ag.id === id ? { ...ag, confirmado: 0 } : ag)
      );
    } catch (erro) {
      console.error('Erro ao recusar agendamento:', erro);
    }
  };

  return (
    <AgendamentoContexto.Provider
      value={{
        agendamentos,
        agendamentosFiltrados,
        dataSelecionada,
        termoBusca,
        horariosDisponiveis,
        setDataSelecionada,
        setTermoBusca,
        confirmarAgendamento,
        recusarAgendamento,
        setBarbeiroSelecionadoId,
        barbeiroSelecionadoId
      }}
    >
      {children}
    </AgendamentoContexto.Provider>
  );
};

export const useAgendamentos = () => {
  const contexto = useContext(AgendamentoContexto);
  if (contexto === undefined) {
    throw new Error('useAgendamentos deve ser usado dentro de um ProvedorAgendamento');
  }
  return contexto;
};
