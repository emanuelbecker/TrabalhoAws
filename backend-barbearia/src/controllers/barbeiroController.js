import pool from '../database/db.js';

// Retorna lista de barbeiros (sem URL de imagem, só base64)
export const getAll = async (req, res) => {
  try {
    const rows = await pool.query('SELECT id, nome, img FROM barbeiros');

    // Retorna a lista com a imagem em base64
    const barbeiros = rows.map(b => ({
      id: b.id,
      nome: b.nome,
      img: b.img || null, // base64 da imagem
    }));

    res.json(barbeiros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar barbeiros.' });
  }
};

// Retorna barbeiro por id (com base64)
export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await pool.query('SELECT id, nome, img FROM barbeiros WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Barbeiro não encontrado.' });

    const b = rows[0];
    const barbeiro = {
      id: b.id,
      nome: b.nome,
      img: b.img || null,
    };

    res.json(barbeiro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar barbeiro.' });
  }
};

// Cria barbeiro com base64 da imagem
export const create = async (req, res) => {
  const { nome, img } = req.body; // img deve ser base64 string
  try {
    const result = await pool.query('INSERT INTO barbeiros (nome, img) VALUES (?, ?)', [nome, img]);
    res.status(201).json({ id: result.insertId, nome, img });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar barbeiro.' });
  }
};

// Rota para retornar imagem como arquivo (decodifica base64)
export const getImagemBarbeiro = async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await pool.query('SELECT img FROM barbeiros WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Barbeiro não encontrado.' });

    const imgBase64 = rows[0].img;
    if (!imgBase64) return res.status(404).json({ error: 'Imagem não encontrada.' });

    const imgBuffer = Buffer.from(imgBase64, 'base64');

    res.writeHead(200, {
      'Content-Type': 'image/jpeg', // ajuste se precisar (ex: 'image/png')
      'Content-Length': imgBuffer.length,
    });

    return res.end(imgBuffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar imagem do barbeiro.' });
  }
};
