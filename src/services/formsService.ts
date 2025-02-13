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
        const form = await prisma.form.findFirst({});

        if (!form) {
            throw new Error('Formulário não encontrado');
        }

        const pages = await prisma.page.findMany({
            where: { formId: form?.id },
            select: {
                id: true,
                number: true,
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