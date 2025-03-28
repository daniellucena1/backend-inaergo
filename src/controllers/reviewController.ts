import { NextFunction, Request, Response } from "express";
import { reviewService } from "../services/reviewService";
import { BadRequest } from "../@errors/BadRequest";

export const reviewController = {
  getReviewsByCompanyId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId = req.user?.companyId;

      if (!companyId) {
        throw new BadRequest("Gestor não possui o id da empresa")
      }

      const data = await reviewService.getReviewsByCompanyId(companyId);  

      if (!data) {
        throw new BadRequest("Avaliação não encontrada");
      }

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}