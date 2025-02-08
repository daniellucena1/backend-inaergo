// import prisma from "../services/prisma";
import { Request, Response } from "express";
import { AnswerDTO } from "../types/answerDTO";
import { z } from "zod";
import { answerService } from "../services/answerService";

export const createAnswer = {
  createAnswer: async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        questions: z.array(z.object({
          employeeId: z.number(),
          questionId: z.number(),
          answer: z.number()
        }))
      })

      const data = schema.parse(req.body);

      const answer = await answerService.createAnswerFromJson(data as AnswerDTO);

      res.status(201).json(answer);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
};