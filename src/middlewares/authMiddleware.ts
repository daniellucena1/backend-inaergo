import { Request, Response } from "express";
import { authService } from "../services/authService";
import { NextFunction } from "express-serve-static-core";
import { User } from "../types/user";
import prisma from "../services/prisma";
import { error } from "console";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = {

  authenticate: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Token não encontrado"});
    }

    try {
      const user = authService.verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      res.status(403).json({ error: "Token inválido"});
    }
  },

  isAdmin: (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.permission !== true) {
      return res.status(403).json({error: "Acesso negado. Requer admin"});
    };
  }
}