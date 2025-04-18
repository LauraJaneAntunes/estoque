import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json()); // Middleware para parsear o corpo da requisição como JSON

app.use('/api', userRoutes); // Definindo a rota base para o usuário

export default app;