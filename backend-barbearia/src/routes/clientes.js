import express from 'express';
import { getAll, getById, create } from '../controllers/clienteController.js';

const router = express.Router();
// Define as rotas para clientes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);

export default router;
