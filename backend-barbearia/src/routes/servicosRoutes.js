import { Router } from 'express';
import { listarServicos } from '../controllers/servicoController.js';

const router = Router();

router.get('/', listarServicos);

export default router;
