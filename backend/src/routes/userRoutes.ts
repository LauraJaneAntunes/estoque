import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authenticateToken, authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware';

const userRoutes = Router();

// Rotas públicas
userRoutes.post('/users', UserController.create);  // Criar usuário
userRoutes.post('/login', UserController.login); // Login do usuário
userRoutes.post('/forgot-password', UserController.forgotPassword); // Recuperação de senha
userRoutes.post('/reset-password', UserController.resetPassword); // Redefinição de senha
userRoutes.get('/verify-email/:token', UserController.verifyEmail); // Verificação de email 

// Rotas protegidas
userRoutes.get('/users', authenticateToken,  authorizeAdmin, UserController.getAll);   // Listar todos os usuários - somente admin
userRoutes.get('/users/:id', authenticateToken, authorizeUser, UserController.getById);  // Buscar usuário por ID
userRoutes.put('/users/:id', authenticateToken, authorizeUser, UserController.update);  // Atualizar usuário
userRoutes.delete('/users/:id', authenticateToken, authorizeAdmin, UserController.delete); // Deletar usuário - somente admin

export default userRoutes;