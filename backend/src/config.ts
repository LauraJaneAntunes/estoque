// src/config.ts
if (!process.env.JWT_SECRET) {
    throw new Error('A variável de ambiente JWT_SECRET não foi definida.');
  }
  
  export const JWT_SECRET = process.env.JWT_SECRET;  