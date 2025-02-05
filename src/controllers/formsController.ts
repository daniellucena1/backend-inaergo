import { Request, Response } from "express";
import { formsService } from "../services/formsService";
import { z } from "zod";
import { FormsDTO } from "../types/formsDTO";

export const formsController = {
    createForm: async (req: Request, res: Response) => {
        try {
            const schema = z.object({
                forms: z.object({
                    title: z.string(),
                    pages: z.array(z.object({
                        page: z.number(),
                        fields: z.array(z.object({
                            type: z.enum(["TEXT", "RATING", "CHECKBOX"]),
                            question: z.string()
                        }))
                    }))
                })
            })

            const data = schema.parse(req.body);

            const form: FormsDTO = await formsService.createFormFromJson(data);
            res.status(201).json(form);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    },

    getForm: async (req: Request, res: Response) => {
        try {
            const form: FormsDTO = await formsService.getForm();
            res.status(200).json(form);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }
}