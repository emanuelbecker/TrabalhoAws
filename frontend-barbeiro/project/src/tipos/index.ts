export interface Barbeiro {
  id: string;
  nome: string;
  especialidade: string;
  urlImagem: string;
  avaliacao: number;
  totalAgendamentos: number;
}

export interface Agendamento {
  id: string;
  nomeCliente: string;
  servico: string;
  data: string;
  horario: string;
  duracao: number; // em minutos
  observacoes?: string;
  status: 'pendente' | 'confirmado' | 'recusado';
  barbeiroId: string;
  dataCriacao: string;
}

export interface HorarioDisponivel {
  id: string;
  horarioInicio: string;
  horarioFim: string;
  ocupado: boolean;
  agendamentoId?: string;
}