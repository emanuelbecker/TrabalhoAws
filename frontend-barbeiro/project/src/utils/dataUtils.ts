export const formatarData = (data: Date, formato: string): string => {
  const ano = data.getFullYear();
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const dia = data.getDate().toString().padStart(2, '0');
  
  return formato
    .replace('yyyy', ano.toString())
    .replace('MM', mes)
    .replace('dd', dia);
};

export const adicionarMinutos = (data: number | Date, minutos: number): Date => {
  const resultado = new Date(data);
  resultado.setMinutes(resultado.getMinutes() + minutos);
  return resultado;
};

export const formatarHorario = (horario: string): string => {
  const [horas, minutos] = horario.split(':').map(Number);
  const periodo = horas >= 12 ? 'PM' : 'AM';
  const horasFormatadas = horas % 12 || 12;
  return `${horasFormatadas}:${minutos.toString().padStart(2, '0')} ${periodo}`;
};

export const formatarDuracao = (minutos: number): string => {
  if (minutos < 60) {
    return `${minutos} min`;
  }
  
  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;
  
  if (minutosRestantes === 0) {
    return `${horas}h`;
  }
  
  return `${horas}h ${minutosRestantes}min`;
};

export const calcularTempoRestante = (horario: string): string => {
  const [horas, minutos] = horario.split(':').map(Number);
  const horarioAgendamento = new Date();
  horarioAgendamento.setHours(horas, minutos, 0, 0);
  
  const agora = new Date();
  
  const diffMs = horarioAgendamento.getTime() - agora.getTime();
  const minutosRestantes = Math.floor(diffMs / 60000);

  if (minutosRestantes < 0) {
    return 'Atrasado';
  }
  
  if (minutosRestantes < 60) {
    return `${minutosRestantes} min`;
  }
  
  const horasRestantes = Math.floor(minutosRestantes / 60);
  const minRestantes = minutosRestantes % 60;
  
  if (minRestantes === 0) {
    return `${horasRestantes}h`;
  }
  
  return `${horasRestantes}h ${minRestantes}min`;
};