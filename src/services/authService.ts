import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './prisma';
import { Employee, User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("A variável JWT_SECRET não está definida no .env.");
}

export const authService = {
  signIn: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return authService.handleLogin(user, password);
  },

  loginFuncionario: async (registration: string) => {
    const user = await prisma.employee.findUnique({
      where: { registration: registration }, include: {
        Answer: true
      }
    });

    if (!user) {
      throw new Error("Funcionário não encontrado");
    }

    if (user.Answer.length > 0) {
      throw new Error("UNAUTHORIZED");
    }

    return authService.handleLoginEmployee(user, registration);
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
        isAdmin: user.type === "ADMIN" ? true : false,
      },
      JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    return { token, user: { ...user, password: undefined } };
  },

  handleLoginEmployee: async (user: Employee, registration: string) => {
    const validRegistration = user.registration.trim() === registration.trim();

    if (!validRegistration) {
      throw new Error("registration inválida");
    }

    const token = jwt.sign(
      {
        id: user.id,
        registration: user.registration,
        isAdmin: false
      },
      JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    return { token, user: { ...user } };
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
