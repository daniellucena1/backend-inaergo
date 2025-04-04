import { Forbidden } from "../@errors/Forbidden";
import { NotFound } from "../@errors/NotFound";
import { AnswerDTO } from "../types/answerDTO";
import prisma from "./prisma";

export const answerService = {
  createAnswerFromJson: async (answer: AnswerDTO, employeeId: number) => {
    
    const employeeExists = await prisma.employee.findUnique({
      where: { id: employeeId}
    });

    if (!employeeExists) {
      throw new NotFound(`Funcionário com ID ${employeeId} não econtrado`);
    }

    const createdAnswer = await Promise.all(answer.answers.map(async (ans) => {

      const empCheck = async () => {
        return await prisma.answer.findFirst({
          where: {
            employeeId: employeeId,
            questionId: ans.questionId
          }
        })
      }
  
      if (await empCheck()) {
        throw new Forbidden('Funcionário não pode responder mais de uma vez');
      }

      const now = new Date();
      const review = await prisma.review.findFirst({
        where: {
          AND: [
            { openingDate: { lte: now } },
            { finishingDate: { gte: now } }
          ]
        }
      });

      if (!review) {
        throw new NotFound("Nenhuma avaliação disponível");
      }

      return prisma.answer.create({
        data: {
          employeeId: employeeId,
          questionId: ans.questionId,
          value: ans.answer,
          reviewId: review.id
        }
      })
    }))

    console.log(createdAnswer);

    return createdAnswer;

  },

  getAnswers: async () => {
    const answer = await prisma.answer.findMany({});

    if (!answer) {
      throw new NotFound('Respostas não encontradas');
    }

    return {
      answer: answer.map((answer) => ({
        employeeId: answer.employeeId,
        questionId: answer.questionId,
        answer: answer.value
      }))
    }
  },

  getAnswersByEmployeeId: async (employeeRegistration: string) => {
    const answer = await prisma.answer.findMany({
      where: {
        employeeId: parseInt(employeeRegistration)
      }
    });

    if (!answer) {
      throw new NotFound('Resposta não encontrada');
    }

    return {
      answer: answer.map((answer) => ({
        employeeId: answer.employeeId,
        questionId: answer.questionId,
        answer: answer.value
      }))
    }
  }
}