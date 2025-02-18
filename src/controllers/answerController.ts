// import prisma from "../services/prisma";
import { Request, Response } from "express";
import { AnswerDTO } from "../types/answerDTO";
import { z } from "zod";
import { answerService } from "../services/answerService";

export const answerController = {
  createAnswer: async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        answers: z.array(z.object({
          questionId: z.number(),
          answer: z.number()
        }))
      })

      const data = schema.parse(req.body);

      if (req.user === undefined) {
        throw new Error('Usuário não encontrado');
      }

      const answer = await answerService.createAnswerFromJson(data as AnswerDTO, req.user.id);

      res.status(201).json(answer);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  },

  getAnswer: async (req: Request, res: Response) => {
    try {
      const answers = await answerService.getAnswers();

      res.status(200).json(answers);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  },

  getAnswerByEmployeeId: async (req: Request, res: Response) => {
    try {
      const employeeId: string = req.params.id;

      const answer = await answerService.getAnswersByEmployeeId(employeeId as string);

      res.status(200).json(answer);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
};