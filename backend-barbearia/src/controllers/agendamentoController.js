import pool from '../database/db.js';

export const getAll = async (req, res) => {
  try {
    const [agendamentos] = await pool.query(`
      SELECT 
          a.id, a.data_agendada AS data, a.hora_agendada, a.confirmado,
          a.barbeiro_id AS idBarbeiro,
          c.nome AS cliente_nome, c.telefone, c.email,
          s.nome AS servico_nome, s.descricao, s.preco,
          b.nome AS barbeiro_nome, b.img AS barbeiro_img
      FROM agendamentos a
          JOIN clientes c ON a.cliente_id = c.id
          JOIN servicos s ON a.servico_id = s.id
          JOIN barbeiros b ON a.barbeiro_id = b.id
      ORDER BY a.data_agendada, a.hora_agendada;
    `);

    res.json(agendamentos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar agendamentos.' });
  }
};

export const create = async (req, res) => {
  const { cliente_id, servico_id, barbeiro_id, data, horario, confirmado = false } = req.body;
  try {
    if (!cliente_id || !servico_id || !barbeiro_id || !data || !horario) {
      return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.' });
    }

    const [conflito] = await pool.query(
      `SELECT id 
       FROM agendamentos 
       WHERE data_agendada = ? AND hora_agendada = ? AND barbeiro_id = ? AND confirmado = true`,
      [data, horario, barbeiro_id]
    );

    if (conflito.length > 0) {
      return res.status(400).json({ error: 'Este horário já está confirmado por outro agendamento.' });
    }

    const [result] = await pool.query(
      `INSERT INTO agendamentos (cliente_id, servico_id, barbeiro_id, data_agendada, hora_agendada, confirmado)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [cliente_id, servico_id, barbeiro_id, data, horario, confirmado]
    );

    res.status(201).json({ id: result.insertId, cliente_id, servico_id, barbeiro_id, data, horario, confirmado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar agendamento.' });
  }
};

export const getHorariosDisponiveis = async (req, res) => {
  const { data, barbeiroId } = req.query;

  if (!data || !barbeiroId) {
    return res.status(400).json({ error: 'Data e barbeiroId são obrigatórios.' });
  }

  try {
    const gerarHorarios = () => {
      const horarios = [];
      let hora = 8;
      let minuto = 30;

      while (hora < 12 || (hora === 11 && minuto <= 50)) {
        const horaFormatada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        let disponivel = true;
        if ((hora === 11 && minuto === 50) || hora === 12 || (hora === 13 && minuto < 30)) {
          disponivel = false;
        }
        horarios.push({ hora: horaFormatada, disponivel });
        minuto += 50;
        if (minuto >= 60) {
          hora += Math.floor(minuto / 60);
          minuto = minuto % 60;
        }
        if (hora > 11 && minuto > 50) break;
      }

      hora = 13;
      minuto = 30;

      while (hora < 19) {
        const horaFormatada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        horarios.push({ hora: horaFormatada, disponivel: true });
        minuto += 50;
        if (minuto >= 60) {
          hora += Math.floor(minuto / 60);
          minuto = minuto % 60;
        }
      }

      return horarios;
    };

    const todosHorarios = gerarHorarios();

    const [agendados] = await pool.query(
      `SELECT hora_agendada 
       FROM agendamentos 
       WHERE data_agendada = ? AND barbeiro_id = ? AND confirmado = true`,
      [data, barbeiroId]
    );

    const horariosOcupados = agendados.map(a => a.hora_agendada.substring(0, 5));

    const horarios = todosHorarios.map(({ hora, disponivel }) => ({
      data,
      barbeiroId,
      hora,
      disponivel: disponivel && !horariosOcupados.includes(hora),
    }));

    res.json(horarios);
  } catch (err) {
    console.error('Erro ao buscar horários:', err);
    res.status(500).json({ error: 'Erro ao buscar horários disponíveis.' });
  }
};

export const confirmarAgendamento = async (req, res) => {
  const { id } = req.params;
  try {
    const [agendamento] = await pool.query(
      `SELECT data_agendada, hora_agendada, barbeiro_id 
       FROM agendamentos 
       WHERE id = ? AND confirmado = false`,
      [id]
    );

    if (!agendamento || agendamento.length === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado ou já confirmado.' });
    }

    const { data_agendada, hora_agendada, barbeiro_id } = agendamento[0];

    const [conflito] = await pool.query(
      `SELECT id 
       FROM agendamentos 
       WHERE data_agendada = ? AND hora_agendada = ? AND barbeiro_id = ? AND confirmado = true`,
      [data_agendada, hora_agendada, barbeiro_id]
    );

    if (conflito.length > 0) {
      return res.status(400).json({ error: 'Este horário já foi confirmado por outro agendamento.' });
    }

    const [result] = await pool.query(
      `UPDATE agendamentos SET confirmado = true WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }

    res.json({ message: 'Agendamento confirmado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao confirmar agendamento.' });
  }
};
