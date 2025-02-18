import { NextFunction, Request, Response } from "express";
import { authService } from "../services/authService";
import { User } from "../types/user";
import prisma from "../services/prisma";

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

export const authMiddleware = {

  authenticate: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ error: "Token não encontrado" });
    }

    try {
      const user = authService.verifyToken(token as string);
      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(403).json({ error: "Token inválido" });
    }
  },

  isAdmin: async (req: Request, res: Response, next: NextFunction) => {

    try {
      
      const admin = await prisma.admin.findUnique({ where: { email: req.user?.email } });
      if (!admin) {
        return res.status(404).json({ error: "Admin não encontrado" });
      }
  
      if (admin.permission !== true) {
        res.status(403).json({ error: "Acesso negado. Requer admin" });
      };
      next();

    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }

  },

  isManager: async (req: Request, res: Response, next: NextFunction) => {

    try {
      
      const manager = await prisma.manager.findUnique({
        where: {
          email: req.user?.email
        }
      });
  
      if( !manager ) {
        return res.status(404).json({ error: "Manager não encontrado" });
      }
  
      if (manager.permission !== true) {
        res.status(403).json({ error: "Acesso negado. Requer manager" });
      }

      next();

    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }


  }
}