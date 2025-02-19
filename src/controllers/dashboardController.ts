import { Request, Response } from 'express'
import { dashboardService } from '../services/dashboardService'
import { z } from 'zod';

export const dashboardController = {
  getDashboardInfo: async (req: Request, res: Response) => {
    try {
      const managerId: number | undefined = req.user?.id;

      const schema = z.object({
        sector: z.string(),
        age: z.coerce.number(),
        gender: z.string(),
        companyTime: z.string(),
      });

      const { sector, age, gender, companyTime } = schema.parse(req.query);

      if (managerId === undefined) {
        throw new Error("Manager não encontrado")
      }

      const dashboardInfo = await dashboardService.getDashboardInfo(Number(managerId), sector, age, gender, companyTime);

      res.json(dashboardInfo)
    } catch (error) {
      if (error instanceof Error) {
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