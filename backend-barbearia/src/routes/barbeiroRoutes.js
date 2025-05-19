import express from 'express';
import { getAll, getById, create, getImagemBarbeiro } from '../controllers/barbeiroController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);

// Nova rota para servir a imagem do barbeiro
router.get('/:id/imagem', getImagemBarbeiro);

export default router;
