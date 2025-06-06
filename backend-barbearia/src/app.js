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

// Configuração explícita do CORS para permitir todas as origens (todos os IPs)
app.use(cors({
  origin: '*', // Permite todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: false // Desativa credenciais (não necessário para todas as origens)
}));

// Middlewares
app.use(express.json());

// Servir arquivos estáticos da pasta 'Uploads'
app.use('/uploads', express.static(path.resolve('Uploads')));

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