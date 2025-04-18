import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  // Criar um novo usuário
  async create(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const user = await UserService.createUser({ name, email });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Listar todos os usuários
  async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Buscar um usuário pelo ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(parseInt(id));
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Atualizar um usuário
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const updatedUser = await UserService.updateUser(parseInt(id), { name, email });
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Deletar um usuário
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(parseInt(id));
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();