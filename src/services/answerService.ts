import { AnswerDTO } from "../types/answerDTO";
import prisma from "./prisma";

export const answerService = {
  createAnswerFromJson: async (answer: AnswerDTO, employeeId: number) => {
    
    const employeeExists = await prisma.employee.findUnique({
      where: { id: employeeId}
    });

    if (!employeeExists) {
      throw new Error('Funcionário não encontrado');
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
        throw new Error('Funcionário não pode responder mais de uma vez');
      }

      return prisma.answer.create({
        data: {
          employeeId: employeeId,
          questionId: ans.questionId,
          value: ans.answer
        }
      })
    }))

    console.log(createdAnswer);

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