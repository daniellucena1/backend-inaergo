import prisma from "../services/prisma";
import bcrypt from "bcryptjs";

export const managerService = {
  createManager: async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const manager = await prisma.manager.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      omit: {
        password: true
      }
    });
    return manager;
  },

  getManagerById: async (id: number) => {
    const manager = await prisma.manager.findUnique({
      where: { id: id },
      omit: {
        password: true
      }
    });

    if (!manager) {
      throw new Error('Usuário não encontrado');
    }

    return manager;
  },

  updateManager: async (id: number, name: string, email: string, password: string) => {

    const hashedPassword = await bcrypt.hash(password, 10);
    const manager = await prisma.manager.update({
      where: { id: id },
      data: {
        name,
        email,
        password: hashedPassword,
      },
      omit: {
        password: true
      }
    });

    if (!manager) {
      throw new Error('Erro ao atualizar usuário');
    }

    return manager;
  },

  deleteManager: async (id: number) => {
    await prisma.manager.delete({ where: { id: id } });

    return true;
  }
}