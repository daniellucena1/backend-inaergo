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
      if (error instanceof Error && error.message === "FORBIDDEN") {
        return res.status(403).json({error: "Funcionário já respondeu a pesquisa"})
      }else if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      next(error);
    }
  }
};
