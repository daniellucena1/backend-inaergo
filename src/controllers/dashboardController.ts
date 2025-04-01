import { NextFunction, Request, Response } from 'express'
import { dashboardService } from '../services/dashboardService'
import { z } from 'zod';
import { NotFound } from '../@errors/NotFound';

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
        ceilCompanyTime: z.coerce.number().optional(),
        reviewId: z.coerce.number().optional()
      });

      const { sector, baseAge, ceilAge, gender, baseCompanyTime, ceilCompanyTime, reviewId } = schema.parse(req.query);

      if (managerId === undefined) {
        throw new NotFound("Manager não encontrado")
      }

      const dashboardInfo = await dashboardService.getDashboardInfo(Number(managerId), Number(reviewId), sector, baseAge, ceilAge, gender, baseCompanyTime, ceilCompanyTime);

      res.json(dashboardInfo)
    } catch (error) {
      next(error);
    }
  }
}