import pool from '../database/db.js';
import { enviarMensagemWhatsApp } from '../utils/enviarWhatsapp.js';

export const getAll = async (req, res) => {
  try {
    const agendamentos = await pool.query(`
      SELECT 
        a.id, a.data_agendada AS data, a.hora_agendada, a.confirmado,
        a.barbeiro_id AS idBarbeiro,
        c.nome AS cliente_nome, c.telefone, c.email,
        s.nome AS servico_nome, s.descricao, s.preco, s.id as servico_id,
        b.nome AS barbeiro_nome, b.img AS barbeiro_img
      FROM agendamentos a
        JOIN clientes c ON a.cliente_id = c.id
        JOIN servicos s ON a.servico_id = s.id
        JOIN barbeiros b ON a.barbeiro_id = b.id
      ORDER BY a.data_agendada, a.hora_agendada;
    `);

    console.log('[DEBUG] agendamentos:', agendamentos);

    res.json(agendamentos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar agendamentos.' });
  }
};

export const create = async (req, res) => {
  console.log("BODY RECEBIDO:", req.body);

  const {
    nome,
    telefone,
    email,
    servico_id,
    barbeiro_id,
    data_agendada,
    hora_agendada,
    confirmado = 0
  } = req.body;

  try {
    if (!nome || !telefone || !email) {
      return res.status(400).json({ error: 'Nome, telefone e email do cliente são obrigatórios.' });
    }
    if (!servico_id || !barbeiro_id || !data_agendada || !hora_agendada) {
      return res.status(400).json({ error: 'Campos do agendamento não fornecidos.' });
    }

    const clienteResult = await pool.query(
      `INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)`,
      [nome, telefone, email]
    );
    const cliente_id = clienteResult.insertId;

    const conflitoRows = await pool.query(
      `SELECT id 
       FROM agendamentos 
       WHERE data_agendada = ? AND hora_agendada = ? AND barbeiro_id = ?`,
      [data_agendada, hora_agendada, barbeiro_id]
    );
    if (conflitoRows.length > 0) {
      return res.status(400).json({ error: 'Já existe um agendamento neste horário para este barbeiro.' });
    }

    const result = await pool.query(
      `INSERT INTO agendamentos (cliente_id, servico_id, barbeiro_id, data_agendada, hora_agendada, confirmado)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [cliente_id, servico_id, barbeiro_id, data_agendada, hora_agendada, confirmado]
    );

    res.status(201).json({
      id: Number(result.insertId),
      cliente_id: Number(cliente_id),
      servico_id: Number(servico_id),
      barbeiro_id: Number(barbeiro_id),
      data_agendada,
      hora_agendada,
      confirmado
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar agendamento.' });
  }
};

export const getHorariosDisponiveis = async (req, res) => {
  const { data, barbeiro } = req.query;

  if (!data || !barbeiro) {
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

    const agendados = await pool.query(
      `SELECT hora_agendada 
       FROM agendamentos 
       WHERE data_agendada = ? AND barbeiro_id = ? AND confirmado = true`,
      [data, barbeiro]
    );

    const horariosOcupados = agendados.map(a => a.hora_agendada.substring(0, 5));
    console.log('agendados',agendados);
    

    const horarios = todosHorarios.map(({ hora, disponivel }) => ({
      data,
      barbeiro,
      hora,
      disponivel: disponivel && !horariosOcupados.includes(hora),
    }));
console.log('horarios',horarios);
    
    res.json(horarios);
  } catch (err) {
    console.error('Erro ao buscar horários:', err);
    res.status(500).json({ error: 'Erro ao buscar horários disponíveis.' });
  }
};

export const confirmarAgendamento = async (req, res) => {
  console.log('[DEBUG] ConfirmarAgendamento params:', req.params, 'body:', req.body);

  const { id } = req.params;
  try {
    // 1. Seleciona o agendamento
    const agendamentoQueryRes = await pool.query(
      `SELECT data_agendada, hora_agendada, barbeiro_id 
       FROM agendamentos 
       WHERE barbeiro_id = ? AND confirmado = false`,
      [id]
    );
    let rows = agendamentoQueryRes;
    if (Array.isArray(agendamentoQueryRes) && Array.isArray(agendamentoQueryRes[0])) {
      rows = agendamentoQueryRes[0];
    }
    console.log('[DEBUG] agendamentoQueryRes:', rows);

    if (!rows || rows.length === 0 || !rows[0]) {
      return res.status(404).json({ error: 'Agendamento não encontrado ou já confirmado.' });
    }

    const { data_agendada, hora_agendada, barbeiro_id } = rows[0];

    // 2. Checa conflito
    const conflitoQueryRes = await pool.query(
      `SELECT id 
       FROM agendamentos 
       WHERE data_agendada = ? AND hora_agendada = ? AND barbeiro_id = ? AND confirmado = true`,
      [data_agendada, hora_agendada, barbeiro_id]
    );
    let conflitoRows = conflitoQueryRes;
    if (Array.isArray(conflitoQueryRes) && Array.isArray(conflitoQueryRes[0])) {
      conflitoRows = conflitoQueryRes[0];
    }
    console.log('[DEBUG] conflitoQueryRes:', conflitoRows);

    if (conflitoRows.length > 0 && conflitoRows[0]) {
      return res.status(400).json({ error: 'Este horário já foi confirmado por outro agendamento.' });
    }

    // 3. Faz o update
    const resultQueryRes = await pool.query(
      `UPDATE agendamentos SET confirmado = true WHERE id = ?`,
      [id]
    );
    console.log('[DEBUG] resultQueryRes:', resultQueryRes);

    let result = resultQueryRes;
    if (Array.isArray(resultQueryRes) && typeof resultQueryRes[0] === 'object' && resultQueryRes[0] !== null && 'affectedRows' in resultQueryRes[0]) {
      result = resultQueryRes[0];
    }

    if (!result || result.affectedRows === undefined) {
      return res.status(500).json({ error: 'Erro interno ao atualizar agendamento.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }

    // NOVO BLOCO: Buscar dados completos para mensagem
    const [dados] = await pool.query(`
      SELECT 
        c.telefone,
        b.nome AS barbeiro_nome,
        a.data_agendada,
        a.hora_agendada,
        s.nome AS servico_nome
      FROM agendamentos a
      JOIN clientes c ON a.cliente_id = c.id
      JOIN barbeiros b ON a.barbeiro_id = b.id
      JOIN servicos s ON a.servico_id = s.id
      WHERE a.id = ?
    `, [id]);

    console.log('[DEBUG] Resultado da query dos dados completos:', dados);

    function formatarData(dataAgendada) {
      const dataObj = new Date(dataAgendada);
      return dataObj.toLocaleDateString('pt-BR');
    }

    let dadosCliente = Array.isArray(dados) ? dados[0] : dados;

    if (dadosCliente && dadosCliente.telefone) {
      let numeroCliente = dadosCliente.telefone.replace(/\D/g, '');
      if (!numeroCliente.startsWith('55')) numeroCliente = '55' + numeroCliente;

      console.log('[DEBUG] Dados para WhatsApp:', {
        numeroCliente,
        barbeiro: dadosCliente.barbeiro_nome,
        data: dadosCliente.data_agendada,
        hora: dadosCliente.hora_agendada,
        servico: dadosCliente.servico_nome
      });

      // === INTEGRAÇÃO COM MICRO SERVIÇO (NÃO MAIS O EXEC) ===
      const mensagem = `Olá aqui é da Barbearia Corte & Estilo e estamos passando aqui para avisar que seu agendamento foi confirmado com o barbeiro: ${dadosCliente.barbeiro_nome}
às ${dadosCliente.hora_agendada} no dia ${formatarData(dadosCliente.data_agendada)} que será realizado o serviço de: ${dadosCliente.servico_nome}`;

      try {
        const resposta = await fetch('http://localhost:3333/send-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ numero: numeroCliente, mensagem }),
        });
        const resultado = await resposta.json();
        if (!resposta.ok) {
          console.error('[Microserviço] Erro ao enviar mensagem:', resultado);
        } else {
          console.log('[Microserviço] Mensagem enviada com sucesso!');
        }
      } catch (error) {
        console.error('[Microserviço] Falha ao conectar ao microserviço:', error);
      }
    } else {
      console.warn('[DEBUG] Não encontrou dados completos do agendamento para enviar WhatsApp.');
    }

    res.json({ message: 'Agendamento confirmado com sucesso.' });
  } catch (err) {
    console.error('Erro ao confirmar agendamento:', err);
    res.status(500).json({ error: 'Erro ao confirmar agendamento.' });
  }
};
