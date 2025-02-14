import { Request, Response } from 'express'
import { dashboardService } from '../services/dashboardService'

export const dashboardController = {
  getDashboardInfo: async (req: Request, res: Response) => {
    try {
      const managerId: number | undefined = req.user?.id;

      if (managerId === undefined) {
        throw new Error("Manager não encontrado")
      }

      const dashboardInfo = await dashboardService.getDashboardInfo(Number(managerId));

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