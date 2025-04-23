import { Request, Response } from 'express';
import { generateToken } from '../utils/authUtils';
import UserService from '../services/UserService';
import { comparePassword } from '../utils/passwordUtils';

class UserController {
  // Criar um novo usuário
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.createUser({ name, email, password });

      const token = generateToken(user.id, user.role);

      const { password: _, ...userWithoutPassword } = user;
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

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      const isMatch = await comparePassword(password, user.password);
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

  // Buscar usuário por email
  async getUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;  // Pegando o email da URL
      const user = await UserService.getUserByEmail(email);  // Chama o service para buscar o usuário por email

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Atualizar dados do usuário
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

  // Criar um novo administrador
  async createAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.createAdminUser({ name, email, password });

      const token = generateToken(user.id, user.role);
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword, token });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Atualizar usuário para administrador
  async updateUserRoleToAdmin(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.id);
      const updatedUser = await UserService.updateUserRole(userId, 'admin');
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Listar usuários com filtro de Administrador
  async getAdmins(req: Request, res: Response): Promise<void> {
    try {
      const admins = await UserService.getAdmins();
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new UserController();