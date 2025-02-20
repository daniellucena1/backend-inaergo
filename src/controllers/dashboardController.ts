import { NextFunction, Request, Response } from 'express'
import { dashboardService } from '../services/dashboardService'
import { z } from 'zod';

export const dashboardController = {
  getDashboardInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const managerId: number | undefined = req.user?.id;

      const schema = z.object({
        sector: z.string().optional(),
        age: z.coerce.number().optional(),
        gender: z.string().optional(),
        companyTime: z.coerce.number().optional(),
      });

      const { sector, age, gender, companyTime } = schema.parse(req.query);

      if (managerId === undefined) {
        throw new Error("Manager não encontrado")
      }

      const dashboardInfo = await dashboardService.getDashboardInfo(Number(managerId), sector, age, gender, companyTime);

      res.json(dashboardInfo)
    } catch (error) {
      next(error);
    }
  }
}