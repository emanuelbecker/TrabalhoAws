export interface Barbeiro {
  id: number;
  nome: string;
  especialidade?: string;
  imagemUrl?: string;
  img?: { data: number[] } | string | undefined;
  clientes?: number;
}

export interface Horario {
  disponivel: boolean;
  id: number;
  barbeiroId: number;
  data: string;               // Formato ISO: "YYYY-MM-DD"
  hora: string;               // Formato: "HH:mm"
  ocupado: boolean;
  cliente?: string;
  servico?: string;
  aceito?: boolean;
}
