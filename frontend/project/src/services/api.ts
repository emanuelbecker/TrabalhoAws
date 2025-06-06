import axios, { AxiosResponse, AxiosError } from 'axios';
import { Buffer } from 'buffer';
import type { Servico, Barbeiro, Cliente, Agendamento } from '../contexts/AgendamentoContext';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`; // ajuste se precisar

async function apiRequest(endpoint: string, method: string = 'GET', body: any = null): Promise<any> {
  const config = {
    method,
    url: `${BASE_URL}/${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body ? body : undefined,
  };

  try {
    const response: AxiosResponse = await axios(config);
    console.log(`Response from ${method} ${endpoint}:`, {
      status: response.status,
      data: response.data,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    console.error(`Error in ${method} ${endpoint}:`, {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      message: axiosError.message,
    });
    throw new Error((axiosError.response?.data as any)?.error || 'Erro na requisição');
  }
}

export async function fetchBarbeiros(): Promise<Barbeiro[]> {
  console.log("BARBEIROS BASE URL", import.meta.env.VITE_API_BASE_URL);
  const barbeiros = await apiRequest('barbeiros');
  
  // Verificar se barbeiros é um array
  if (!Array.isArray(barbeiros)) {
    console.error("fetchBarbeiros: Resposta da API não é um array", barbeiros);
    return []; // Retorna array vazio para evitar erros no front-end
  }

  // Processar a imagem (Buffer) para uma URL base64
  return barbeiros.map((barbeiro: any) => ({
    id: barbeiro.id.toString(),
    nome: barbeiro.nome,
    imagemUrl: barbeiro.img?.data
      ? `data:image/jpeg;base64,${Buffer.from(barbeiro.img.data).toString('base64')}`
      : undefined,
    foto: barbeiro.img?.data
      ? `data:image/jpeg;base64,${Buffer.from(barbeiro.img.data).toString('base64')}`
      : "",
  }));
}

export async function fetchServicos(): Promise<Servico[]> {
  return apiRequest('servicos');
}

export async function fetchAgendamentos(): Promise<Agendamento[]> {
  return apiRequest('agendamentos');
}

export async function criarAgendamento(dadosAgendamento: {
  cliente_id: string;
  servico_id: string;
  barbeiro_id: string;
  data: string;
  horario: string;
  confirmado: boolean;
}): Promise<Agendamento> {
  return apiRequest('agendamentos', 'POST', dadosAgendamento);
}

export async function fetchClientes(): Promise<Cliente[]> {
  return apiRequest('clientes');
}

export async function criarCliente(dadosCliente: {
  nome: string;
  telefone: string;
  email: string;
}): Promise<Cliente> {
  return apiRequest('clientes', 'POST', dadosCliente);
}