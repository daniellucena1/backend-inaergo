// import prisma from "../services/prisma";
import { NextFunction, Request, Response } from "express";
import { AnswerDTO } from "../types/answerDTO";
import { z } from "zod";
import { answerService } from "../services/answerService";
import { NotFound } from "../@errors/NotFound";

export const answerController = {
  createAnswer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = z.object({
        answers: z.array(z.object({
          questionId: z.number(),
          answer: z.number()
        }))
      })

      const data = schema.parse(req.body);

      if (req.user === undefined) {
        throw new NotFound('Usuário não encontrado');
      }

      const answer = await answerService.createAnswerFromJson(data as AnswerDTO, req.user.id);

      res.status(201).json(answer);
    } catch (error) {
      next(error);
    }
  },

  getAnswer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const answers = await answerService.getAnswers();

      res.status(200).json(answers);
    } catch (error) {
    
      next(error);
    }
  },

  getAnswerByEmployeeId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId: string = req.params.id;

      const answer = await answerService.getAnswersByEmployeeId(employeeId as string);

      res.status(200).json(answer);
    } catch (error) {

      next(error);
    }
  }
};