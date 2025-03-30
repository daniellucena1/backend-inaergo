import { NotFound } from "../@errors/NotFound";
import { FormsDTO } from "../types/formsDTO"
import { FormsResponse } from "../types/formsResponse";
import prisma from "./prisma";

export const formsService = {
    createFormFromJson: async ({ forms }: FormsDTO) => {
        const createdForm = await prisma.form.create({
            data: {
                title: forms.title,
            }
        })

        const createdPages = await Promise.all(forms.pages.map((form) => {
            return prisma.page.create({
                data: {
                    formId: createdForm.id,
                    number: form.page,
                    title: form.title,
                    Question: {
                        create: form.fields.map((field) => ({
                            text: field.question,
                            type: field.type,
                        }))
                    }
                },
                select: {
                    id: true,
                    Question: true,
                    title: true,
                    number: true
                }
            })
        }));

        return {
            forms: {
                id: createdForm.id,
                title: createdForm.title,
                pages: createdPages.map((page) => ({
                    id: page.id,
                    page: page.number,
                    title: page.title,
                    fields: page.Question.map((question) => ({
                        id: question.id,
                        question: question.text,
                        type: question.type,
                    }))
                }))
            }
        } as FormsResponse;
    },

    getForm: async () => {
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
            throw new NotFound("Nenhuma avaliação aberta no momento");
        }

        const form = await prisma.form.findUnique({
            where: {
                id: review?.formId
            }
        });

        if (!form) {
            throw new NotFound('Formulário não encontrado');
        }

        const pages = await prisma.page.findMany({
            where: { formId: form?.id },
            select: {
                id: true,
                number: true,
                title: true,
                Question: true
            }
        });

        return {
            forms: {
                id: form.id,
                title: form.title,
                pages: pages.map((page) => ({
                    id: page.id,
                    page: page.number,
                    title: page.title,
                    fields: page.Question.map((question) => ({
                        id: question.id,
                        question: question.text,
                        type: question.type,
                    }))
                }))
            }
        } as FormsResponse;
    }
}