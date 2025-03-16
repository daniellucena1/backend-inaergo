import { NextFunction, Request, Response } from "express";
import { formsService } from "../services/formsService";
import { z } from "zod";
import { FormsResponse } from "../types/formsResponse";

export const formsController = {
    createForm: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const schema = z.object({
                forms: z.object({
                    title: z.string(),
                    pages: z.array(z.object({
                        page: z.number(),
                        title: z.string(),
                        fields: z.array(z.object({
                            type: z.enum(["TEXT", "RATING", "CHECKBOX"]),
                            question: z.string()
                        }))
                    }))
                })
            })

            const data = schema.parse(req.body);

            const form: FormsResponse = await formsService.createFormFromJson(data);
            res.status(201).json(form);
        } catch (error) {
            next(error);
        }
    },

    getForm: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const form: FormsResponse = await formsService.getForm();
            res.status(200).json(form);
        } catch (error) {
            next(error);
        }
    }
}