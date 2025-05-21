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

  // Busca agendamentos da API
  useEffect(() => {
    const buscarAgendamentos = async () => {
      try {
        const resposta = await axios.get<Agendamento[]>('http://localhost:3000/api/agendamentos');
        setAgendamentos(resposta.data);
      } catch (erro) {
        console.error('Erro ao buscar agendamentos:', erro);
      }
    };
    buscarAgendamentos();
  }, []);

  // Filtra agendamentos por data, barbeiro e termo de busca
  const agendamentosFiltrados = agendamentos.filter(agendamento => {
    const dataFormatada = formatarData(new Date(agendamento.data), 'yyyy-MM-dd');
    const correspondeData = dataFormatada === dataSelecionada;
    const correspondeBarbeiro = agendamento.barbeiroId === barbeiroSelecionadoId;
    const buscaMinuscula = termoBusca.toLowerCase();
    const correspondeBusca =
      termoBusca === '' ||
      agendamento.cliente_nome.toLowerCase().includes(buscaMinuscula) ||
      agendamento.servico_nome.toLowerCase().includes(buscaMinuscula);

    return correspondeData && correspondeBarbeiro && correspondeBusca;
  });

  // Atualiza horários disponíveis, filtrando os horários já ocupados por agendamentos confirmados
  useEffect(() => {
    if (barbeiroSelecionadoId && dataSelecionada) {
      // Gera todos os horários possíveis para o barbeiro e data
      const horariosGerados = gerarHorariosDisponiveis(barbeiroSelecionadoId, dataSelecionada);

      // Filtra agendamentos confirmados daquele barbeiro e data
      const agendamentosConfirmados = agendamentos.filter(ag =>
        ag.barbeiroId === barbeiroSelecionadoId &&
        formatarData(new Date(ag.data), 'yyyy-MM-dd') === dataSelecionada &&
        ag.confirmado === 1
      );

      // Extrai as horas ocupadas (ajuste o campo de hora conforme seu modelo, ex: ag.hora)
      const horasOcupadas = agendamentosConfirmados.map(ag => ag.horario);

      // Marca indisponível os horários ocupados
      const horariosAtualizados = horariosGerados.map(horario => ({
        ...horario,
        disponivel: !horasOcupadas.includes(String(horario.horario)),
      }));

      setHorariosDisponiveis(horariosAtualizados);
    } else {
      setHorariosDisponiveis([]);
    }
  }, [barbeiroSelecionadoId, dataSelecionada, agendamentos]);

  // Confirma agendamento (atualiza campo confirmado para 1)
  const confirmarAgendamento = async (id: number) => {
    try {
      await axios.patch(`http://localhost:3000/api/agendamentos/${id}`, { confirmado: 1 });
      setAgendamentos(prev =>
        prev.map(ag => Number(ag.id) === id ? { ...ag, confirmado: 1 } : ag)
      );
    } catch (erro) {
      console.error('Erro ao confirmar agendamento:', erro);
    }
  };

  // Recusa agendamento (atualiza campo confirmado para 0)
  const recusarAgendamento = async (id: number) => {
    try {
      await axios.patch(`http://localhost:3000/api/agendamentos/${id}`, { confirmado: 0 });
      setAgendamentos(prev =>
        prev.map(ag => Number(ag.id) === id ? { ...ag, confirmado: 0 } : ag)
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
        barbeiroSelecionadoId,
      }}
    >
      {children}
    </AgendamentoContexto.Provider>
  );
};

export const useAgendamentos = () => {
  const contexto = useContext(AgendamentoContexto);
  if (!contexto) {
    throw new Error('useAgendamentos deve ser usado dentro de um ProvedorAgendamento');
  }
  return contexto;
};
