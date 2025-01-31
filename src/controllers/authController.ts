import { Request, Response } from "express";
import { authService } from "../services/authService";

export const authController = {
  loginAdmin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Preencha os campos corretamente" });
      }

      const { token, user } = await authService.loginAdmin(email, password);
      res.json({ token, user });
    } catch (error) {
      return authController.handleLoginError(error as Error, res);
    }
  },

  loginFuncionario: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await authService.loginFuncionario(email, password);
      res.json({ token, user });
    } catch (error) {
      return authController.handleLoginError(error as Error, res);
    }
  },

  loginManager: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Preencha os campos corretamente" });
      }

      const { token, user } = await authService.loginManager(email, password);
      res.json({ token, user });
    } catch (error) {
      return authController.handleLoginError(error as Error, res);
    }
  },


  handleLoginError: (error: Error, res: Response) => {
    console.error("Erro no login: ", error);

    if (error.message === "Admin não encontrado" || error.message === "Funcionário não encontrado") {
      res.status(404).json({ error: error.message });
    }

    if (error.message === "password inválida") {
      res.status(401).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};
