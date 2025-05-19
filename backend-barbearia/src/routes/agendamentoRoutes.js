// backend/src/routes/agendamentoRoutes.js
import express from 'express';
import { getAll, create, getHorariosDisponiveis } from '../controllers/agendamentoController.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', create);

// ADICIONE ESTA LINHA
router.get('/horarios', getHorariosDisponiveis);

export default router;
