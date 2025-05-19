// src/services/api.d.ts

import { Servico, Barbeiro, Cliente, Agendamento } from '../contexts/AgendamentoContext';

export function fetchServicos(): Promise<Servico[]>;
export function fetchBarbeiros(): Promise<Barbeiro[]>;
export function fetchAgendamentos(): Promise<Agendamento[]>;
export function criarAgendamento(dadosAgendamento: {
  cliente_id: string;
  servico_id: string;
  barbeiro_id: string;
  data: string;
  horario: string;
  confirmado: boolean;
}): Promise<Agendamento>;

export function fetchClientes(): Promise<Cliente[]>;
export function criarCliente(dadosCliente: {
  nome: string;
  telefone: string;
  email: string;
}): Promise<Cliente>;
