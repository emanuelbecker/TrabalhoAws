// src/services/api.ts

import type { Servico, Barbeiro, Cliente, Agendamento } from '../contexts/AgendamentoContext';

const BASE_URL = 'http://localhost:3001/api'; // ajuste se precisar

async function fetchAPI(endpoint: string, method: string = 'GET', body: any = null): Promise<any> {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}/${endpoint}`, config);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro na requisição');
  }
  return response.json();
}

export async function fetchBarbeiros(): Promise<Barbeiro[]> {
  return fetchAPI('barbeiros');
}

export async function fetchServicos(): Promise<Servico[]> {
  return fetchAPI('servicos');
}

export async function fetchAgendamentos(): Promise<Agendamento[]> {
  return fetchAPI('agendamentos');
}

export async function criarAgendamento(dadosAgendamento: {
  cliente_id: string;
  servico_id: string;
  barbeiro_id: string;
  data: string;
  horario: string;
  confirmado: boolean;
}): Promise<Agendamento> {
  return fetchAPI('agendamentos', 'POST', dadosAgendamento);
}

export async function fetchClientes(): Promise<Cliente[]> {
  return fetchAPI('clientes');
}

export async function criarCliente(dadosCliente: {
  nome: string;
  telefone: string;
  email: string;
}): Promise<Cliente> {
  return fetchAPI('clientes', 'POST', dadosCliente);
}
