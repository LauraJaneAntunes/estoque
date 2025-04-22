// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: 'JWT_SECRET não configurado.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as { userId: number, role: string };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

// Middleware de autorização para o papel de "admin"
export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ message: 'Acesso negado. Permissão de administrador necessária.' });
    }
    next();
  } catch (err) {
    console.error('Erro na autorização de admin:', err);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// Middleware de autorização para o papel de "user"
export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.user || req.user.role !== 'user') {
      res.status(403).json({ message: 'Acesso negado. Permissão de usuário necessária.' });
    }
    next();
  } catch (err) {
    console.error('Erro na autorização de usuário:', err);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};