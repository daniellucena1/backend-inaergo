import { AnswerDTO } from "../types/answerDTO";
import prisma from "./prisma";

export const answerService = {
  createAnswerFromJson: async (answer: AnswerDTO) => {

    // const createdForm = await prisma.form.create({
    //     data: {
    //         title: forms.title,
    //     }
    // })

    // const createdPages = await Promise.all(forms.pages.map((form) => {
    //     return prisma.page.create({
    //         data: {
    //             formId: createdForm.id,
    //             number: form.page,
    //             Question: {
    //                 create: form.fields.map((field) => ({
    //                     text: field.question,
    //                     type: field.type,
    //                 }))
    //             }
    //         },
    //         select: {
    //             Question: true,
    //             number: true
    //         }
    //     })
    // }));

    // return {
    //     forms: {
    //         title: createdForm.title,
    //         pages: createdPages.map((page) => ({
    //             page: page.number,
    //             fields: page.Question.map((question) => ({
    //                 question: question.text,
    //                 type: question.type,
    //             }))
    //         }))
    //     }
    // } as FormsDTO;

    const createdAnswer = await Promise.all(answer.map((answer) => {
      return prisma.answer.create({
        data: {
          employeeId: answer.employeeId,
          questionId: answer.questionId,
          value: answer.answer
        }
      })
    }));

    if (!createdAnswer) {
      throw new Error('Erro ao criar resposta');
    }

    return createdAnswer;

  },

  // getForm: async () => {
  //     const form = await prisma.form.findFirst({});

  //     if (!form) {
  //         throw new Error('Formulário não encontrado');
  //     }

  //     const pages = await prisma.page.findMany({ where: { formId: form?.id }, select: { number: true, Question: true } });

  //     return {
  //         answer: {
  //             title: form.title,
  //             pages: pages.map((page) => ({
  //                 page: page.number,
  //                 fields: page.Question.map((question) => ({
  //                     question: question.text,
  //                     type: question.type,
  //                 }))
  //             }))
  //         }
  //     } as AnswerDTO;
  // }

  getAnswer: async () => {
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
}