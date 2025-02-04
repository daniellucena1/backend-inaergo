import { FormsDTO } from "../types/formsDTO"
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
                    Question: {
                        create: form.fields.map((field) => ({
                            text: field.question,
                            type: field.type,
                        }))
                    }
                },
                select: {
                    Question: true,
                    number: true
                }
            })
        }));

        return {
            forms: {
                title: createdForm.title,
                pages: createdPages.map((page) => ({
                    page: page.number,
                    fields: page.Question.map((question) => ({
                        question: question.text,
                        type: question.type,
                    }))
                }))
            }
        } as FormsDTO;
    },

    getForm: async () => {
        const form = await prisma.form.findFirst({});

        if (!form) {
            throw new Error('Formulário não encontrado');
        }

        const pages = await prisma.page.findMany({ where: { formId: form?.id }, select: { number: true, Question: true } });

        return {
            forms: {
                title: form.title,
                pages: pages.map((page) => ({
                    page: page.number,
                    fields: page.Question.map((question) => ({
                        question: question.text,
                        type: question.type,
                    }))
                }))
            }
        } as FormsDTO;
    }
}