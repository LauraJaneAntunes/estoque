import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

// Define o tipo para o payload do token
interface TokenPayload extends JwtPayload {
  userId: number;
  role: string;
}

// Função para gerar o JWT
export const generateToken = (userId: number, role: string): string => {
  return jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Função para verificar e decodificar o JWT
export const verifyToken = (token: string): TokenPayload => {
  try {
    // Verifica e decodifica o token
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
};