// src/routes/teste.js
import { Router } from 'express';
const router = Router();

router.get('/teste', (req, res) => {
  res.json({ message: 'Rota de teste funcionando!' });
});

export default router;
