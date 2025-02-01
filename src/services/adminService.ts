import prisma from "../services/prisma";
import bcrypt from "bcryptjs";

export const adminService = {
  createAdmin: async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const findedAdmin = await prisma.admin.findUnique({
      where: {
        email: email
      }
    });

    if (findedAdmin) {
      throw new Error('Usuário já cadastrado');
    }

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      omit: {
        password: true
      }
    });

    if (!admin) {
      throw new Error('Erro ao criar usuário');
    }

    return admin;
  },

  getAdminById: async (id: number) => {
    const admin = await prisma.admin.findUnique({
      where: { id: id },
      omit: {
        password: true
      }
    });

    if (!admin) {
      throw new Error('Usuário não encontrado');
    }

    return admin
  },

  updateAdmin: async (id: number, name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.update({
      where: { id: id },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!admin) {
      throw new Error('Erro ao atualizar usuário');
    }

    return admin
  },

  deleteAdmin: async (id: number) => {
    await prisma.admin.delete({ where: { id: id } });
  }
}