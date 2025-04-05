import { NextFunction, Request, Response } from "express";
import { reviewService } from "../services/reviewService";
import { BadRequest } from "../@errors/BadRequest";
import { z } from "zod";
import { NotFound } from "../@errors/NotFound";
import { InternalServerError } from "../@errors/InternalServerError";

export const reviewController = {
  getReviewsByCompanyId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const managerId = req.user?.id;

      if (!managerId) {
        throw new BadRequest("Gestor não encontrado")
      }

      const data = await reviewService.getReviewsByCompanyId(managerId);  

      if (!data) {
        throw new BadRequest("Avaliação não encontrada");
      }

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },

  createReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = z.object({
        title: z.string(),
        openingDate: z.coerce.date(),
        finishingDate: z.coerce.date()
      });
      
      const data = schema.parse(req.body);

      const managerId = req.user?.id;

      if (!managerId) {
        throw new NotFound("Gestor não enconstrado");
      }


      const createResponse = await reviewService.createReview(data.title, data.openingDate, data.finishingDate, managerId);

      if (!createResponse) {
        throw new InternalServerError("Erro interno do servidor");
      }

      res.json(createResponse);
    } catch (error) {
      next(error);
    }
  },

  reopenReview: async (req: Request, res: Response, next: NextFunction) => {
    try {

      const schema = z.object({
        reviewId: z.coerce.number(),
        newOpeningDate: z.coerce.date(),
        newFinishingDate: z.coerce.date()
      })
      const { reviewId, newOpeningDate, newFinishingDate } = schema.parse(req.body);
      const managerId = req.user?.id;

      if (!reviewId) {
        throw new BadRequest("Identificador da avaliação necessário");
      }

      if (!managerId) {
        throw new BadRequest("Gestor não encontrado");
      }

      const response = await reviewService.reopenReview(reviewId, newOpeningDate, newFinishingDate, managerId);

      res.json(response);
    } catch (error) {
      next(error)
    }
  },

  deleteReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewId = Number(req.params.id);

      if (!reviewId) {
        throw new BadRequest("Identificador da avaliação necessário");
      }

      const response = await reviewService.deleteReview(reviewId);

      if (!response) {
        throw new NotFound("Avaliação não encontrada");
      }

      res.json(response);
    } catch (error) {
      next(error);
      
    }
  }
}