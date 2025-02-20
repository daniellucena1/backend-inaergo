import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { userService } from '../services/userService';

export const userController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        type: z.enum(['ADMIN', 'MANAGER']),
        companyId: z.number().optional()
      }).refine((data) => !(data.type === 'MANAGER' && !data.companyId), { message: 'Manager precisa de companyId', path: ['companyId'] });

      const { name, email, password, type, companyId } = schema.parse(req.body);

      const user = await userService.create(name, email, password, type, companyId);

      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors, status: 400 });
      }

      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await userService.getById(parseInt(id));

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      res.json(await userService.update(parseInt(id), name, email, password));
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await userService.delete(parseInt(id))

      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      next(error);
    }
  }
};