import { Request, Response } from "express";
import { authService } from "../services/authService";

export const authController = {
  loginAdmin: async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body;
      const { token, user } = await authService.loginAdmin(email, senha);
      res.json({ token, user });
    } catch (error) {
      return authController.handleLoginError(error, res);
    }
  },

  loginFuncionario: async (req: Request, res:Response) => {
    try {
      const { email, senha } = req.body;
      const { token, user } = await authService.loginFuncionario(email, senha);
      res.json({ token, user });
    } catch (error) {
      return authController.handleLoginError(error, res);
    }
  },

  handleLoginError: (error: any, res: Response) => {
    console.error("Erro no login: ", error);
  
    if ( error.message === "Admin não encontrado" || error.message === "Funcionário não encontrado") {
      res.status(404).json({ error: error.message });
    }
  
    if (error.message === "Senha inválida") {
      res.status(401).json({ error: error.message });
    }
  
    res.status(500).json({ error: error.message });
  }
};
