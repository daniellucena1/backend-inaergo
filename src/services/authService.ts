import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './prisma';
import { User } from '../types/user';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("A variável JWT_SECRET não está definida no .env.");
}


export const authService = {

  loginAdmin: async (email: string, password: string) => {
    const user = await prisma.admin.findUnique({ where: { email: email } });

    if (!user) {
      throw new Error("Admin não encontrado");
    }

    return authService.handleLogin(user, password);
  },

  loginFuncionario: async (email: string, password: string) => {
    const user = await prisma.employee.findUnique({ where: { email: email } });

    if (!user) {
      throw new Error("Funcionário não encontrado");
    }

    return authService.handleLogin(user, password);
  },

  loginManager: async (email: string, password: string) => {
    const user = await prisma.manager.findUnique({ where: { email: email } });

    if (!user) {
      throw new Error("Admin não encontrado");
    }

    return authService.handleLogin(user, password);
  },

  handleLogin: async (user: User, password: string) => {
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error("password inválida");
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

    return { token, user: { ...user, password: undefined } };
  },

  verifyToken: (token: string) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as User;
      return decoded;
    } catch (error) {
      console.error(error);
      throw new Error("Token inválido");
    }
  }

};
