import { Response } from 'express';
import prisma from "../services/prisma";
import bcrypt from "bcryptjs";

export const adminService = {
  createAdmin: async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
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

  getAdminById: async (id: number, res: Response) => {
    try {
      const admin = await prisma.admin.findUnique({
        where: { id: id },
        omit: {
          password: true
        }
      });
      if (!admin) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(admin);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao buscar usuário' });
    }
  },

  updateAdmin: async (id: number, name: string, email: string, password: string, res: Response) => {
    try {
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
        res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json(admin);

    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  deleteAdmin: async (id: number, res: Response) => {
    try {
      await prisma.admin.delete({ where: { id: id } });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao deletar usuário' });
    }
  }
}