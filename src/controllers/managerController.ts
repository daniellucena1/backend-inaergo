import { Request, Response } from 'express';
import { z } from 'zod';
import { managerService } from '../services/managerService';

export const managerController = {
  async createManager(req: Request, res: Response) {
    const schema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string()
    })

    const { name, email, password } = schema.parse(req.body);

    managerService.createManager(name, email, password, res);
  },

  async getManagerById(req: Request, res: Response) {
    const { id } = req.params;

    managerService.getManagerById(parseInt(id), res);
  },

  async updateManager(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    managerService.updateManager(parseInt(id), name, email, password, res);
  },

  async deleteManager(req: Request, res: Response) {
    const { id } = req.params;

    managerService.deleteManager(parseInt(id), res);
  }
};