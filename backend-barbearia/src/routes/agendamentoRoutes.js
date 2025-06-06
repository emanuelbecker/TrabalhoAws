import express from 'express';
import { 
  getAll, 
  create, 
  getHorariosDisponiveis, 
  confirmarAgendamento,
} from '../controllers/agendamentoController.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', create);
router.get('/horarios', getHorariosDisponiveis);
router.put('/:id/confirmar', confirmarAgendamento);

export default router;
