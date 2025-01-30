import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './prisma';
import { z } from 'zod';
import { permission } from 'process';
import { User } from '../types/user';

const JWT_SECRET = process.env.JWT_SECRET;

if ( !JWT_SECRET ) {
  throw new Error("A variável JWT_SECRET não está definida no .env.");
}

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
});

export const authService = {

  loginAdmin: async (email: string, senha: string) => {
    const user = await prisma.admin.findUnique({ where: { email }});

    if ( !user ) {
      throw new Error("Admin não encontrado");
    }

    return authService.handleLogin(user, senha);
  },

  loginFuncionario: async (email: string, senha: string) => {
    const user = await prisma.funcionario.findUnique({ where: { email }});

    if ( !user ) {
      throw new Error("Funcionário não encontrado");
    }

    return authService.handleLogin(user, senha);
  },

  handleLogin: async (user: any, senha: string) => {
    const validPassword = await bcrypt.compare(senha, user.senha);

    if ( !validPassword ) {
      throw new Error("Senha inválida");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    return { token, user };
  },

  verifyToken: (token: string) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as User;
      return decoded;
    } catch (error) {
      throw new Error("Token inválido");
    }
  }

};
