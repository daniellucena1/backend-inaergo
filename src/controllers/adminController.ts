import { Request, Response } from 'express';
import prisma from '../services/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const adminController = {
  async createAdmin(req: Request, res: Response) {
    const { name, email, senha } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(senha, 10);
      const admin = await prisma.admin.create({
        data: {
          name,
          email,
          senha: hashedPassword
        }
      });
      res.status(201).json(admin);
    } catch (error) {
      res.status(401).json({ error: 'Erro ao criar usuário'});
    }
  },

  async getAdminById(req: Request, res:Response) {
    const { id } = req.params;

    try {
      const admin = await prisma.admin.findUnique({ where: { id: parseInt(id) } } );
      if ( !admin ) {
        res.status(404).json({ error: 'Usuário não encontrado'});
      }
      res.json(admin);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao buscar usuário'});
    }
  },

  async updateAdmin(req: Request, res:Response) {
    const { id } = req.params;
    const { name, email, senha } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(senha, 10);
      const admin = await prisma.admin.update({
        where: { id: parseInt(id) },
        data: {
          name,
          email,
          senha: hashedPassword,
        },
      });

      if ( !admin ) {
        res.status(404).json({ error: 'Usuário não encontrado'});
      }

      res.json(admin);

    } catch (error) {
      res.status(400).json({error: 'Erro ao atualizar usuário'});
    }
  },

  async deleteAdmin(req: Request, res:Response) {
    const { id } = req.params;

    try {
      await prisma.admin.delete({ where: { id: parseInt(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Erro ao deletar usuário'});
    }
  }
};