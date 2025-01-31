import { Response } from 'express';
import prisma from "../services/prisma";
import bcrypt from "bcryptjs";

export const managerService = {
  createManager: async (name: string, email: string, password: string, res: Response) => {
    try {
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
      res.status(201).json(manager);
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Erro ao criar usuário' });
    }
  },

  getManagerById: async (id: number, res: Response) => {
    try {
      const manager = await prisma.manager.findUnique({
        where: { id: id },
        omit: {
          password: true
        }
      });
      if (!manager) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(manager);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao buscar usuário' });
    }
  },

  updateManager: async (id: number, name: string, email: string, password: string, res: Response) => {
    try {
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
        res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json(manager);

    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  deleteManager: async (id: number, res: Response) => {
    try {
      await prisma.manager.delete({ where: { id: id } });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao deletar usuário' });
    }
  }
}