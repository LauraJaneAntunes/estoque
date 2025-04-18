import prismaClient from '../config/prismaClient';
import { Prisma } from '@prisma/client';

class UserService {
  // Criar um novo usuário
  async createUser(data: { name: string, email: string }): Promise<Prisma.User> {
    const user = await prismaClient.user.create({
      data,
    });
    return user;
  }

  // Listar todos os usuários
  async getAllUsers(): Promise<Prisma.User[]> {
    const users = await prismaClient.user.findMany();
    return users;
  }

  // Buscar um usuário pelo ID
  async getUserById(id: number): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });
    return user;
  }

  // Atualizar um usuário
  async updateUser(id: number, data: { name: string, email: string }): Promise<User> {
    const updatedUser = await prismaClient.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  }

  // Deletar um usuário
  async deleteUser(id: number): Promise<void> {
    await prismaClient.user.delete({
      where: { id },
    });
  }
}

export default new UserService();