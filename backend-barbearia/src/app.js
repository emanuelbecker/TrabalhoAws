import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Configura variáveis de ambiente
dotenv.config();

// Importação das rotas
import testeRoute from './routes/teste.js';
import clientesRoute from './routes/clientes.js';
import barbeiroRoutes from './routes/barbeiroRoutes.js';
import agendamentoRoutes from './routes/agendamentoRoutes.js';
import servicosRoutes from './routes/servicosRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.resolve('uploads')));

// Rotas da API
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/barbeiros', barbeiroRoutes);
app.use('/api/servicos', servicosRoutes);
app.use('/api/clientes', clientesRoute);
app.use('/api', testeRoute);

// Rota simples de teste
app.get('/ping', (req, res) => {
  res.send('Servidor rodando 🎉');
});

export default app;
