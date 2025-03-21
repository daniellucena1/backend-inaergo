import { NextFunction, Request, Response } from 'express'
import { dashboardService } from '../services/dashboardService'
import { z } from 'zod';

export const dashboardController = {
  getDashboardInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const managerId: number | undefined = req.user?.id;

      const schema = z.object({
        sector: z.string().optional(),
        baseAge: z.coerce.number().optional(),
        ceilAge: z.coerce.number().optional(),
        gender: z.string().optional(),
        baseCompanyTime: z.coerce.number().optional(),
        ceilCompanyTime: z.coerce.number().optional()
      });

      const { sector, baseAge, ceilAge, gender, baseCompanyTime, ceilCompanyTime } = schema.parse(req.query);

      if (managerId === undefined) {
        throw new Error("Manager não encontrado")
      }

      console.log(managerId, sector, baseAge, ceilAge);

      const dashboardInfo = await dashboardService.getDashboardInfo(Number(managerId), sector, baseAge, ceilAge, gender, baseCompanyTime, ceilCompanyTime);

      res.json(dashboardInfo)
    } catch (error) {
      next(error);
    }
  }
}