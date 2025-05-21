import { Agendamento, Barbeiro, HorarioDisponivel } from '../tipos';
import { formatarData, adicionarMinutos } from '../utils/dataUtils';

export const barbeiros: Barbeiro[] = [
  {
    id: '1',
    nome: 'João Silva',
    especialidade: 'Cortes Clássicos & Barba',
    urlImagem: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    avaliacao: 4.8,
    totalAgendamentos: 12
  },
  {
    id: '2',
    nome: 'Pedro Santos',
    especialidade: 'Degradê & Modernos',
    urlImagem: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    avaliacao: 4.9,
    totalAgendamentos: 8
  },
  {
    id: '3',
    nome: 'Carlos Oliveira',
    especialidade: 'Barbas & Tratamentos',
    urlImagem: 'https://images.pexels.com/photos/2035237/pexels-photo-2035237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    avaliacao: 4.7,
    totalAgendamentos: 5
  }
];

const hoje = new Date();
const amanha = new Date(hoje);
amanha.setDate(amanha.getDate() + 1);

export const agendamentos: Agendamento[] = [
  {
    id: '1',
    nomeCliente: 'Roberto Almeida',
    servico: 'Corte e Barba',
    data: formatarData(hoje, 'yyyy-MM-dd'),
    horario: '10:00',
    duracao: 45,
    observacoes: 'Preferência por corte baixo nas laterais',
    status: 'pendente',
    barbeiroId: '1',
    dataCriacao: new Date(hoje.setHours(hoje.getHours() - 2)).toISOString()
  },
  {
    id: '2',
    nomeCliente: 'Miguel Costa',
    servico: 'Barba Completa',
    data: formatarData(hoje, 'yyyy-MM-dd'),
    horario: '11:30',
    duracao: 30,
    status: 'confirmado',
    barbeiroId: '1',
    dataCriacao: new Date(hoje.setHours(hoje.getHours() - 4)).toISOString()
  }
];

export const gerarHorariosDisponiveis = (barbeiroId: string, data: string): HorarioDisponivel[] => {
  const horarios: HorarioDisponivel[] = [];
  const horaInicio = 9; // 9:00
  const horaFim = 18; // 18:00
  const duracaoSlot = 30; // 30 minutos por slot

  const agendamentosBarbeiro = agendamentos.filter(
    ag => ag.barbeiroId === barbeiroId && ag.data === data && ag.status !== 'recusado'
  );

  for (let hora = horaInicio; hora < horaFim; hora++) {
    for (let minuto = 0; minuto < 60; minuto += duracaoSlot) {
      const horarioInicio = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
      const horarioFimObj = adicionarMinutos(new Date().setHours(hora, minuto), duracaoSlot);
      const horarioFim = `${horarioFimObj.getHours().toString().padStart(2, '0')}:${horarioFimObj.getMinutes().toString().padStart(2, '0')}`;
      
      const agendamentoSobreposto = agendamentosBarbeiro.find(ag => {
        const [horaAg, minutoAg] = ag.horario.split(':').map(Number);
        const fimAgendamentoObj = adicionarMinutos(new Date().setHours(horaAg, minutoAg), ag.duracao);
        const fimAgendamento = `${fimAgendamentoObj.getHours().toString().padStart(2, '0')}:${fimAgendamentoObj.getMinutes().toString().padStart(2, '0')}`;
        
        return (
          (horarioInicio >= ag.horario && horarioInicio < fimAgendamento) || 
          (horarioFim > ag.horario && horarioFim <= fimAgendamento) ||
          (ag.horario >= horarioInicio && ag.horario < horarioFim)
        );
      });

      horarios.push({
        id: `${hora}-${minuto}`,
        horarioInicio,
        horarioFim,
        ocupado: !!agendamentoSobreposto,
        agendamentoId: agendamentoSobreposto?.id
      });
    }
  }

  return horarios;
};