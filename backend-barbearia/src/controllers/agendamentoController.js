// backend/src/controllers/agendamentoController.js

import pool from '../database/db.js';

export const getAll = async (req, res) => {
  try {
    const agendamentos = await pool.query(`
      SELECT 
          a.id, a.data_agendada data, a.hora_agendada , a.confirmado,
          c.nome as cliente_nome, c.telefone, c.email,
          s.nome as servico_nome, s.descricao, s.preco,
          b.nome as barbeiro_nome, b.img as barbeiro_img
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
  const { cliente_id, servico_id, barbeiro_id, data, horario, confirmado } = req.body;
  try {
    const result = await pool.query(
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
    // Função para gerar horários fixos do dia
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

    // Busca agendamentos para o barbeiro na data
    const agendados = await pool.query(
      `SELECT hora_agendada, barbeiro_id, data_agendada FROM agendamentos 
       WHERE data_agendada = ? AND barbeiro_id = ?`,
      [data, barbeiroId]
    );

    // Extrai os horários ocupados formatados "HH:mm"
    const horariosOcupados = agendados.map(a => {
      const hora = typeof a === 'string' ? a : a.hora_agendada;
      return hora.substring(0, 5);
    });

    // Marca indisponíveis os horários ocupados
    const horarios = todosHorarios.map(({ hora, disponivel }) => ({
      data, // data solicitada
      barbeiroId, // id do barbeiro
      hora,
      disponivel: disponivel && !horariosOcupados.includes(hora),
    }));

    res.json(horarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar horários disponíveis.' });
  }
};
