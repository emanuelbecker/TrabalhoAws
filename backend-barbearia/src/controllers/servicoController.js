import pool from '../database/db.js';

export const listarServicos = async (req, res) => {
  try {
    const rows = await pool.query('SELECT id, nome, descricao, preco FROM servicos');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar serviços:', error);
    res.status(500).json({ message: 'Erro interno ao buscar serviços' });
  }
};
