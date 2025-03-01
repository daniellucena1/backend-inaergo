import { Request, Response } from 'express'
import { dashboardService } from '../services/dashboardService'
import { z } from 'zod';

export const dashboardController = {
  getDashboardInfo: async (req: Request, res: Response) => {
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

      const dashboardInfo = await dashboardService.getDashboardInfo(Number(managerId), sector, baseAge, ceilAge, gender, baseCompanyTime, ceilCompanyTime);

      res.json(dashboardInfo)
    } catch (error) {
      if ( error instanceof z.ZodError) {
        res.status(400).json({error: error.errors})
      } else if (error instanceof Error) {
        res.status(400).json({
          message: error.message
        })
      }

      res.status(500).json({
        message: "Erro interno do servidor"
      })
    }
  }
}