import Prisma from '../config/prismaClient';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendEmail } from '../utils/emailUtils';

class UserService {
  // Criar um novo usuário
  async createUser(data: { name: string, email: string, role?: string }): Promise<any> {
    const role = data.role || 'user'; // Definindo o papel padrão como 'user'
    // Gerar token de verificação de email
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    const user = await Prisma.user.create({
      data: {
        ...data,
        isEmailVerified: false,
        emailVerificationToken,
        role,
      },
    });

    // Enviar email de verificação (você pode personalizar o link)
    await sendEmail(user.email, 'Verifique seu email', `Clique aqui para verificar: http://localhost:3000/verify-email/${emailVerificationToken}`);

    return user;
  }

  // Criar um novo administrador
  async createAdminUser(data: { name: string; email: string; password: string }): Promise<any> {
    const role = "admin";  // Definindo o papel como "admin"
  
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
  
    const user = await Prisma.user.create({
      data: {
        ...data,
        role,  // Atribuindo o papel "admin"
        isEmailVerified: false,
        emailVerificationToken,
      },
    });
  
    await sendEmail(user.email, 'Verifique seu email', `Clique aqui para verificar: http://localhost:3000/verify-email/${emailVerificationToken}`);
  
    return user;
  }

  // Listar todos os usuários
  async getAllUsers(): Promise<any[]> {
    return await Prisma.user.findMany();
  }

  // Listar usuários com filtro de Administrador
  async getAdmins(): Promise<any[]> {
    return await Prisma.user.findMany({
      where: {
        role: "admin",
      },
    });
  }

  // Buscar por ID
  async getUserById(id: number): Promise<any | null> {
    return await Prisma.user.findUnique({ where: { id } });
  }

  // Buscar por email
  async getUserByEmail(email: string): Promise<any | null> {
    return await Prisma.user.findUnique({ where: { email } });
  }

  // Atualizar usuário
  async updateUser(id: number, data: { name: string, email: string }): Promise<any> {
    return await Prisma.user.update({ where: { id }, data });
  }

  // Atualizar usuário para administrador
  async updateUserRole(id: number, role: string): Promise<any> {
    return await Prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  // Deletar usuário
  async deleteUser(id: number): Promise<void> {
    await Prisma.user.delete({ where: { id } });
  }

  // Enviar email de recuperação de senha
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

  // Redefinir a senha com token
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await Prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!user) throw new Error('Token inválido ou expirado');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await Prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });
  }

  // Verificar o email
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
}

export default new UserService();