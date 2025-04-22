import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils';
import UserService from '../services/UserService';

class UserController {
  // Criar novo usuário
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      const user = await UserService.createUser({ name, email });

      const token = generateToken(user.id, user.role);

      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword, token });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Login do usuário
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await UserService.getUserByEmail(email);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      const token = generateToken(user.id, user.role);
      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({ user: userWithoutPassword, token });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Enviar e-mail de recuperação de senha
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await UserService.sendPasswordResetEmail(email);
      res.status(200).json({ message: 'E-mail de recuperação enviado' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Resetar senha via token
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, newPassword } = req.body;
      await UserService.resetPassword(token, newPassword);
      res.status(200).json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Verificar e-mail do usuário
  async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      await UserService.verifyEmail(token);
      res.status(200).json({ message: 'E-mail verificado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Listar todos os usuários
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Buscar usuário por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(Number(req.params.id));
      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Atualizar usuário
  async update(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await UserService.updateUser(Number(req.params.id), req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Deletar usuário
  async delete(req: Request, res: Response): Promise<void> {
    try {
      await UserService.deleteUser(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new UserController();