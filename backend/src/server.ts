import app from './app';
import prismaClient from './config/prismaClient';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    // Verificar se o banco de dados está conectado
    await prismaClient.$connect();
    console.log('Banco de dados conectado com sucesso!');

    // Iniciar o servidor
    app.listen(port, () => {
      const url = `http://localhost:${port}`;
      console.log(`Servidor está rodando na porta: ${url}`);
    });
  } catch (error) {
    console.error('Conexão com banco de dados falhou:', error);
    process.exit(1); // Fechar o processo caso a conexão falhe
  }
}

startServer();