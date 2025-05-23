import { Horario } from '../types/tipos';

// Gera horários de funcionamento com intervalos de 50 minutos
const gerarHorariosDoDia = () => {
  const horarios: string[] = [];
  
  // Período da manhã: 08:30 até 12:00
  for (let hora = 8; hora < 12; hora++) {
    if (hora === 8) {
      horarios.push('08:30');
      horarios.push('09:20');
      horarios.push('10:10');
      horarios.push('11:00');
      horarios.push('11:50');
    }
  }
  
  // Período da tarde: 14:00 até final do expediente
  for (let hora = 14; hora < 19; hora++) {
    if (hora === 14) {
      horarios.push('14:00');
      horarios.push('14:50');
      horarios.push('15:40');
      horarios.push('16:30');
      horarios.push('17:20');
      horarios.push('18:10');
      horarios.push('19:00');
    }
  }
  
  return horarios;
};

// Gera dados de horários com alguns ocupados aleatoriamente para simulação
export const getHorariosParaData = (barbeiroId: number, data: string): Horario[] => {
  const horariosDisponiveis = gerarHorariosDoDia();
  
  // Para simular dados dinâmicos, usamos o ID do barbeiro e a data para gerar
  // um padrão previsível mas que varia conforme os parâmetros
  const seed = barbeiroId + Date.parse(data);
  
  return horariosDisponiveis.map((hora, index) => {
    // Determina se o horário estará ocupado com base no seed + índice
    const ocupado = ((seed + index) % 5) < 2; // ~40% dos horários ocupados
    
    // Para horários ocupados, gera nome de cliente fictício
    let cliente;
    let servico;
    
    if (ocupado) {
      const clientes = [
        'João Silva', 'Pedro Almeida', 'Miguel Souza', 
        'Gustavo Santos', 'Rafael Oliveira', 'Eduardo Lima',
        'Lucas Ferreira', 'Matheus Costa', 'Felipe Rodrigues'
      ];
      
      const servicos = [
        'Corte Degradê', 'Barba Completa', 'Corte + Barba', 
        'Pezinho', 'Coloração', 'Design de Sobrancelha'
      ];
      
      cliente = clientes[(seed + index) % clientes.length];
      servico = servicos[(seed + index) % servicos.length];
    }
    
    return {
      id: index + 1,
      barbeiroId,
      data,
      hora,
      ocupado,
      cliente,
      servico,
      aceito: false,
      disponivel: !ocupado
    };
  });
};