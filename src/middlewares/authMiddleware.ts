import { Request, Response } from "express";
import { authService } from "../services/authService";

export const authMiddleware = {
  async login ( req: Request, res: Response ) {
    const { email, senha } = req.body;

    try {
      const{ token, user } = await authService.login(email, senha);
      res.json({ token, user });
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  async verifyToken(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];

    if ( !token ) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
      const decoded = await authService.verifyToken(token);
      res.json({ decoded });
    } catch (error) {
      res.status(401).json({ error });
    }
  }
}