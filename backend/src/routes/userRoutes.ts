import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRoutes = Router();

// Rotas públicas
userRoutes.post('/users', UserController.create);  // Criar usuário
userRoutes.post('/login', UserController.login); // Login do usuário
userRoutes.post('/forgot-password', UserController.forgotPassword); // Recuperação de senha
userRoutes.post('/reset-password', UserController.resetPassword); // Redefinição de senha
userRoutes.get('/verify-email/:token', UserController.verifyEmail); // Verificação de email 

// Rotas protegidas
userRoutes.get('/users', UserController.getAll);   // Listar todos os usuários
userRoutes.get('/users/:id', UserController.getById);  // Buscar usuário por ID
userRoutes.put('/users/:id', UserController.update);  // Atualizar usuário
userRoutes.delete('/users/:id', UserController.delete); // Deletar usuário

export default userRoutes;