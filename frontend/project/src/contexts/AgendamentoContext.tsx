import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { setHours, setMinutes } from 'date-fns';
import { fetchServicos, fetchBarbeiros } from '../services/api.ts';
import axios from 'axios';

// Tipos
export interface Horario {
  dia: string;
  id: string;
  hora: string;
  disponivel: boolean;
}

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
}

export interface Cliente {
  nome: string;
  telefone: string;
  email: string;
}

export interface Barbeiro {
  imagemUrl: string | undefined;
  id: string;
  nome: string;
  foto: string;
}

export interface Agendamento {
  id?: string;
  cliente: Cliente;
  data: Date | string;
  horario: string;
  servico: Partial<Servico> & { nome: string; preco: number };
  barbeiro: Partial<Barbeiro> & { nome: string };
  confirmado: boolean | number;
}

interface AgendamentoContextType {
  horarios: Horario[];
  servicos: Servico[];
  barbeiros: Barbeiro[];
  agendamentos: Agendamento[];
  clienteAtual: Cliente;
  servicoSelecionado: Servico | null;
  barbeiroSelecionado: Barbeiro | null;
  dataSelecionada: Date;
  horarioSelecionado: Horario | null;
  agendamentoConfirmado: Agendamento | null;
  atualizarCliente: (cliente: Cliente) => void;
  selecionarServico: (id: string) => void;
  selecionarBarbeiro: (id: string) => void;
  selecionarData: (data: Date) => void;
  selecionarHorario: (id: string) => void;
  confirmarAgendamento: () => void;
  obterHorariosDisponiveis: (data: Date, barbeiroId: string) => Horario[];
  obterBarbeirosDisponiveis: (data: Date) => Barbeiro[];
  setAgendamentoConfirmado: (agendamento: Agendamento | null) => void; // <-- ADICIONADO!
}

const AgendamentoContext = createContext<AgendamentoContextType | undefined>(undefined);

// Função para gerar horários fixos do dia
const gerarHorarios = (): Horario[] => {
  const horarios: Horario[] = [];

  // Manhã (08:30 até 11:50)
  let hora = 8;
  let minuto = 30;
  while (hora < 12 || (hora === 11 && minuto <= 50)) {
    const horaFormatada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
    let disponivel = true;
    if ((hora === 11 && minuto === 50) || hora === 12 || (hora === 13 && minuto < 30)) {
      disponivel = false;
    }
    horarios.push({
      id: `${hora}-${minuto}`, hora: horaFormatada, disponivel,
      dia: ''
    });
    minuto += 50;
    if (minuto >= 60) {
      hora += Math.floor(minuto / 60);
      minuto = minuto % 60;
    }
    if (hora > 11 && minuto > 50) break;
  }

  // Tarde: começa em 14:00, vai até 19:00, pulando de 50 em 50 minutos
  hora = 14;
  minuto = 0;
  while (hora < 19 || (hora === 19 && minuto <= 0)) {
    const horaFormatada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
    horarios.push({
      id: `${hora}-${minuto}`, hora: horaFormatada, disponivel: true,
      dia: ''
    });
    minuto += 50;
    if (minuto >= 60) {
      hora += Math.floor(minuto / 60);
      minuto = minuto % 60;
    }
  }

  return horarios;
};


export const AgendamentoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clienteAtual, setClienteAtual] = useState<Cliente>({ nome: '', telefone: '', email: '' });
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barbeiro | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
  const [horarioSelecionado, setHorarioSelecionado] = useState<Horario | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [agendamentoConfirmado, setAgendamentoConfirmado] = useState<Agendamento | null>(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<Horario[]>(gerarHorarios());

  // Carregar serviços e barbeiros ao montar o componente
  useEffect(() => {
    async function carregarDados() {
      try {
        const servicosAPI = await fetchServicos();
        setServicos(servicosAPI);
      } catch (error) {
        setServicos([]);
      }

      try {
        const barbeirosAPI = await fetchBarbeiros();
        setBarbeiros(barbeirosAPI);
      } catch (error) {
        setBarbeiros([]);
      }
    }
    carregarDados();
  }, []);

  // Buscar agendamentos e marcar horários ocupados sempre que data ou barbeiro mudarem
  useEffect(() => {
    const fetchHorarios = async () => {
      if (!barbeiroSelecionado) {
        setHorariosDisponiveis(gerarHorarios());
        return;
      }

      try {
        const dataFormatada = dataSelecionada.toISOString().split('T')[0];
        console.log("url no agendamento context", import.meta.env.BASE_URL);
        
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/agendamentos`);
        console.log("resposta agendamentos",response);
        
        const agendamentosAPI = Array.isArray(response.data) ? response.data : [response.data];

        // Filtra agendamentos do barbeiro e da data
        const agendamentosOcupados = agendamentosAPI.filter((a: any) =>
          a.idBarbeiro?.toString() === barbeiroSelecionado.id.toString() &&
          a.data &&
          new Date(a.data).toISOString().split('T')[0] === dataFormatada &&
          a.confirmado === 1
        );

        // Marcar horário indisponível se tiver agendamento confirmado
        const horariosFormatados: Horario[] = gerarHorarios().map(h => {
          // Procura se já existe um agendamento confirmado para o horário
          const ocupado = agendamentosOcupados.find(
            (ag: any) => ag.hora_agendada.slice(0, 5) === h.hora.slice(0, 5)
          );
          return {
            ...h,
            disponivel: ocupado === undefined ? true : false
          };
        });

        setHorariosDisponiveis(horariosFormatados);

      } catch (error) {
        console.log(error);
        
        setHorariosDisponiveis(gerarHorarios().map(h => ({ ...h, disponivel: false })));
      }
    };

    fetchHorarios();
  }, [dataSelecionada, barbeiroSelecionado]);

  const obterHorariosDisponiveis = (data: Date, barbeiroId: string): Horario[] => {
    return horariosDisponiveis;
  };

  const obterBarbeirosDisponiveis = (data: Date): Barbeiro[] => {
    return barbeiros;
  };

  const atualizarCliente = (cliente: Cliente) => setClienteAtual(cliente);

  const selecionarServico = (id: string) => {
    const servico = servicos.find(s => s.id === id) || null;
    setServicoSelecionado(servico);
    setBarbeiroSelecionado(null);
    setHorarioSelecionado(null);
  };

  const selecionarBarbeiro = (id: string) => {
    const barbeiro = barbeiros.find(b => b.id === id) || null;
    setBarbeiroSelecionado(barbeiro);
    setHorarioSelecionado(null);
  };

  const selecionarData = (data: Date) => {
    setDataSelecionada(data);
    setBarbeiroSelecionado(null);
    setHorarioSelecionado(null);
  };

  const selecionarHorario = (id: string) => {
    if (!barbeiroSelecionado) return;
    const horario = horariosDisponiveis.find(
      h => h.id === id && h.disponivel === true
    ) || null;
    setHorarioSelecionado(horario);
  };

  const confirmarAgendamento = () => {
    if (!servicoSelecionado || !horarioSelecionado || !barbeiroSelecionado || !clienteAtual.nome) return;
    const [hora, minuto] = horarioSelecionado.hora.split(':').map(Number);
    const dataHora = setMinutes(setHours(dataSelecionada, hora), minuto);

    const novoAgendamento: Agendamento = {
      id: `${Date.now()}`,
      cliente: clienteAtual,
      data: dataHora,
      horario: horarioSelecionado.hora,
      servico: servicoSelecionado,
      barbeiro: barbeiroSelecionado,
      confirmado: true,
    };

    setAgendamentos(prev => [...prev, novoAgendamento]);
    setAgendamentoConfirmado(novoAgendamento);
  };

  return (
    <AgendamentoContext.Provider
      value={{
        horarios: horariosDisponiveis,
        servicos,
        barbeiros,
        agendamentos,
        clienteAtual,
        servicoSelecionado,
        barbeiroSelecionado,
        dataSelecionada,
        horarioSelecionado,
        agendamentoConfirmado,
        atualizarCliente,
        selecionarServico,
        selecionarBarbeiro,
        selecionarData,
        selecionarHorario,
        confirmarAgendamento,
        obterHorariosDisponiveis,
        obterBarbeirosDisponiveis,
        setAgendamentoConfirmado, // <-- ADICIONADO AQUI!
      }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
};

export const useAgendamento = (): AgendamentoContextType => {
  const context = useContext(AgendamentoContext);
  if (!context) {
    throw new Error('useAgendamento deve ser usado dentro de AgendamentoProvider');
  }
  return context;
};
