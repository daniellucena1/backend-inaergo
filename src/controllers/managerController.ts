import { Request, Response } from 'express';
import { z } from 'zod';
import { managerService } from '../services/managerService';

export const managerController = {
  async createManager(req: Request, res: Response) {
    try {
      const schema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        companyId: z.number()
      })

      const { name, email, password, companyId } = schema.parse(req.body);

      const manager = await managerService.createManager(name, email, password, companyId);
      
      res.status(200).json(manager);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      }

      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },

  async getManagerById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const m = await managerService.getManagerById(parseInt(id));

      res.json(m);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      }

      res.status(500).json({
        error: 'Erro ao buscar usuário'
      });
    }
  },

  async updateManager(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const updatedManager = await managerService.updateManager(parseInt(id), name, email, password);

      res.json(updatedManager);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      }

      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  async deleteManager(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await managerService.deleteManager(parseInt(id));

      res.status(204).send({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      }

      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
};