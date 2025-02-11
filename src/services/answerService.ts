import { AnswerDTO } from "../types/answerDTO";
import prisma from "./prisma";

export const answerService = {
  createAnswerFromJson: async (answer: AnswerDTO) => {

    const createdAnswer = await Promise.all(answer.answers.map((ans) => {
      console.log(ans)
      return prisma.answer.create({
        data: {
          employeeId: ans.employeeId,
          questionId: ans.questionId,
          value: ans.answer
        }
      })
    }))

    console.log(createdAnswer)

    if (!createdAnswer) {
      throw new Error('Erro ao criar resposta');
    }

    return createdAnswer;

  },

  getAnswers: async () => {
    const answer = await prisma.answer.findMany({});

    if (!answer) {
      throw new Error('Resposta não encontrada');
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
      throw new Error('Resposta não encontrada');
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