import 'dotenv/config'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createAdminUser = async () => {
  // Verifica se já existe um usuário admin
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'admin' },
  });

  if (existingAdmin) {
    console.log('Usuário admin já existe');
    return;
  }

  // Criação do hash da senha
  const hashedPassword = await bcrypt.hash('Senh@123', 10);

  // Criação do usuário admin
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@email.com',
      password: hashedPassword,
      role: 'admin',
      isEmailVerified: true,
    },
  });

  console.log('Usuário admin criado:', adminUser);
};

createAdminUser()
  .catch((error) => {
    console.error('Erro ao criar o usuário admin:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });