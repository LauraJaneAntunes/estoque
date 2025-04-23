import Prisma from '../config/prismaClient';
import crypto from 'crypto';
import { sendEmail } from '../utils/emailUtils';
import { hashPassword, comparePassword } from '../utils/passwordUtils';

class UserService {
  // Criar um novo usuário
  async createUser(data: { name: string, email: string, password: string; role?: string }): Promise<any> {
    const role = data.role || 'user';
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    const hashedPassword = await hashPassword(data.password);

    const user = await Prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        isEmailVerified: false,
        emailVerificationToken,
        role,
      },
    });

    await sendEmail(user.email, 'Verifique seu email', `Clique aqui para verificar: http://localhost:3000/verify-email/${emailVerificationToken}`);

    return user;
  }

  // Login do usuário
  async login(email: string, password: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');
  
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Credenciais inválidas');
  
    if (!user.isEmailVerified) throw new Error('E-mail não verificado');
  
    return user;
  }

  // Enviar e-mail de recuperação de senha
  async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hora

    await Prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: token,
        passwordResetExpires: expires,
      },
    });

    await sendEmail(email, 'Redefinição de senha', `Use este token: ${token}`);
  }

  // Resetar senha via token
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await Prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!user) throw new Error('Token inválido ou expirado');

    const hashedPassword = await hashPassword(newPassword);

    await Prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });
  }

  // Verificar e-mail do usuário
  async verifyEmail(token: string): Promise<void> {
    const user = await Prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
      },
    });

    if (!user) throw new Error('Token de verificação inválido');

    await Prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null,
      },
    });
  }

  // Listar todos os usuários
  async getAllUsers(): Promise<any[]> {
    return await Prisma.user.findMany();
  }

  // Buscar usuário por ID
  async getUserById(id: number): Promise<any | null> {
    return await Prisma.user.findUnique({ where: { id } });
  }

  // Buscar por email
  async getUserByEmail(email: string): Promise<any | null> {
    return await Prisma.user.findUnique({ where: { email } });
  }

  // Atualizar dados do usuário
  async updateUser(id: number, data: { name: string, email: string }): Promise<any> {
    return await Prisma.user.update({ where: { id }, data });
  }

  // Deletar usuário
  async deleteUser(id: number): Promise<void> {
    await Prisma.user.delete({ where: { id } });
  }

  // Criar um novo administrador
  async createAdminUser(data: { name: string; email: string; password: string; role?: string }): Promise<any> {
    const role = "admin";
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const hashedPassword = await hashPassword(data.password);

    const user = await Prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role,
        isEmailVerified: false,
        emailVerificationToken,
      },
    });

    await sendEmail(user.email, 'Verifique seu email', `Clique aqui para verificar: http://localhost:3000/verify-email/${emailVerificationToken}`);

    return user;
  }

  // Atualizar usuário para administrador
  async updateUserRole(id: number, role: string): Promise<any> {
    return await Prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  // Listar usuários com filtro de Administrador
  async getAdmins(): Promise<any[]> {
    return await Prisma.user.findMany({
      where: { role: "admin" },
    });
  }
}

export default new UserService();