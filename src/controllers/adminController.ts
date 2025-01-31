import { Request, Response } from 'express';
import { z } from 'zod';
import { adminService } from '../services/adminService';

export const adminController = {
  async createAdmin(req: Request, res: Response) {
    const schema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string()
    })

    const { name, email, password } = schema.parse(req.body);

    adminService.createAdmin(name, email, password, res);
  },

  async getAdminById(req: Request, res: Response) {
    const { id } = req.params;

    adminService.getAdminById(parseInt(id), res);
  },

  async updateAdmin(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    adminService.updateAdmin(parseInt(id), name, email, password, res);
  },

  async deleteAdmin(req: Request, res: Response) {
    const { id } = req.params;

    adminService.deleteAdmin(parseInt(id), res);
  }
};