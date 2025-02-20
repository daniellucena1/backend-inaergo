import { Request, Response } from "express";
import { authService } from "../services/authService";
import { z } from "zod";

export const authController = {
  signIn: async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string()
      })

      const { email, password } = schema.parse(req.body);

      if (!email || !password) {
        res.status(400).json({ error: "Preencha os campos corretamente" });
      }

      const { token, user } = await authService.signIn(email, password);

      res.json({ token, user });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Admin não encontrado" || error.message === "Funcionário não encontrado") {
          return res.status(404).json({ error: error.message });
        }

        if (error.message === "password inválida") {
          return res.status(401).json({ error: error.message });
        }
      }

      return res.status(500).json({ error: "Erro ao tentar fazer o login" });
    }
  },

  loginFuncionario: async (req: Request, res: Response) => {
    try {
      const { registration } = req.body;
      const { token, user } = await authService.loginFuncionario(registration);
      res.json({ token, user });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.json({ error: "Erro ao tentar fazer login" });
    }
  }
};
