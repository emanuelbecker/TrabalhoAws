import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import testeRoute from './routes/teste.js';
import clientesRoute from './routes/clientes.js';
import barbeiroRoutes from './routes/barbeiroRoutes.js';
import agendamentoRoutes from './routes/agendamentoRoutes.js';
import servicosRoutes from './routes/servicosRoutes.js';

const app = express();

// ... suas outras configurações


// ... rotas e start do servidor

app.use(cors());
app.use(express.json());

// Rotas específicas primeiro
app.use('/uploads', express.static('uploads')); // serve arquivos da pasta 'uploads'
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/barbeiros', barbeiroRoutes);
app.use('/api/servicos', servicosRoutes);
app.use('/api/clientes', clientesRoute);

// Rota genérica /api - para testes ou outros endpoints
app.use('/api', testeRoute);

// Rota padrão de teste simples
app.get('/ping', (req, res) => {
  res.send('Servidor rodando 🎉');
});

export default app;
