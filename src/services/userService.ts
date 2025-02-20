import { BadRequest } from "../@errors/BadRequest";
import { InternalServerError } from "../@errors/InternalServerError";
import { NotFound } from "../@errors/NotFound";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

export const userService = {
  create: async (name: string, email: string, password: string, type: 'ADMIN' | 'MANAGER', companyId?: number) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const findedUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (findedUser) {
      throw new BadRequest('Usuário já cadastrado');
    }

    if (companyId) {
      const findedCompany = await prisma.company.findUnique({
        where: {
          id: companyId
        }
      });

      if (!findedCompany) {
        throw new NotFound('Empresa não encontrada');
      }
    }

    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        type,
        companyId: companyId ? companyId : null
      },
      omit: {
        password: true
      }
    });

    if (!admin) {
      throw new InternalServerError('Erro ao criar usuário');
    }

    return admin;
  },

  getById: async (id: number) => {
    const user = await prisma.user.findUnique({
      where: { id: id },
      omit: {
        password: true
      }
    });

    if (!user) {
      throw new NotFound('Usuário não encontrado');
    }

    return user
  },

  update: async (id: number, name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.user.update({
      where: { id: id },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!admin) {
      throw new BadRequest('Erro ao atualizar usuário');
    }

    return admin
  },

  delete: async (id: number) => {
    await prisma.user.delete({ where: { id: id } });
  }
}