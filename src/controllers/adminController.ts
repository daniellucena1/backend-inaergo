import { Request, Response } from 'express';
import { z } from 'zod';
import { adminService } from '../services/adminService';

export const adminController = {
  async createAdmin(req: Request, res: Response) {
    try {
      const schema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string()
      })

      const { name, email, password } = schema.parse(req.body);

      const admin = await adminService.createAdmin(name, email, password);

      res.json(admin);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      }

      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },

  async getAdminById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const admin = await adminService.getAdminById(parseInt(id));

      res.json(admin);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      }

      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  async updateAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      res.json(await adminService.updateAdmin(parseInt(id), name, email, password));
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      }

      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  async deleteAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await adminService.deleteAdmin(parseInt(id))

      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      }

      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
};