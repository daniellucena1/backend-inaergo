import { NextFunction, Request, Response } from "express";
import { authService } from "../services/authService";
import { z } from "zod";
import { BadRequest } from "../@errors/BadRequest";

export const authController = {
  signIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string()
      })

      const { email, password } = schema.parse(req.body);

      if (!email || !password) {
        throw new BadRequest("Preencha os campos corretamente");
      }

      const { token, user } = await authService.signIn(email, password);

      res.status(200).json({ token, user });
    } catch (error) {

      next(error);
    }
  },

  loginFuncionario: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { registration } = req.body;
      const { token, user } = await authService.loginFuncionario(registration);
      res.json({ token, user });
    } catch (error) {

      next(error);
    }
  }
};
