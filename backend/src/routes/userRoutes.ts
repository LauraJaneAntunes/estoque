import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRoutes = Router();

userRoutes.post('/users', UserController.create);  // Criar usuário
userRoutes.get('/users', UserController.getAll);   // Listar todos os usuários
userRoutes.get('/users/:id', UserController.getById);  // Buscar usuário por ID
userRoutes.put('/users/:id', UserController.update);  // Atualizar usuário
userRoutes.delete('/users/:id', UserController.delete); // Deletar usuário

export default userRoutes;