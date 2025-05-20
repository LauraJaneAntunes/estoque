import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json()); // Middleware para parsear o corpo da requisição como JSON

app.use('/api', routes); // Definindo a rota base para o usuário

export default app;