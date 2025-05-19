import pool from '../database/db.js';

// Listar todos os clientes
export const getAll = async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

// Buscar cliente por ID
export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Cliente não encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao buscar cliente:', err);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
};

// Cadastrar novo cliente
export const create = async (req, res) => {
  const { nome, telefone, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)',
      [nome, telefone, email]
    );
    res.status(201).json({ id: result.insertId, nome, telefone, email });
  } catch (err) {
    console.error('Erro ao cadastrar cliente:', err);
    res.status(500).json({ error: 'Erro ao cadastrar cliente' });
  }
};
