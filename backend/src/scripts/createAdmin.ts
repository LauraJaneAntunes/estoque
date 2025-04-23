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
  const hashedPassword = await bcrypt.hash('senhaAdmin123', 10); // Alterar a senha conforme necessário

  // Criação do usuário admin
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com', // Altere conforme necessário
      password: hashedPassword,
      role: 'admin', // Define o papel como 'admin'
      isEmailVerified: true, // Como exemplo, definimos como verdadeiro
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