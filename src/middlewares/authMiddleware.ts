import { NextFunction, Request, Response } from "express";
import { authService } from "../services/authService";
import prisma from "../services/prisma";
import { User } from "@prisma/client";

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

export const authMiddleware = {

  authenticate: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Token não encontrado" });
    }

    try {
      const user = authService.verifyToken(token as string);
      req.user = user;

      return next();
    } catch (error) {
      console.error(error);
      return res.status(403).json({ error: "Token inválido" });
    }
  },

  isAdmin: async (req: Request, res: Response, next: NextFunction) => {

    try {

      const admin = await prisma.user.findUnique({ where: { email: req.user?.email, type: "ADMIN" } });
      if (!admin) {
        return res.status(401).json({ error: "Admin não encontrado" });
      }

      if (admin.permission !== true) {
        return res.status(401).json({ error: "Acesso negado. Requer admin" });
      };

      return next();
    } catch (error) {
      return res.status(401).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }

  },

  isManager: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const manager = await prisma.user.findUnique({
        where: {
          email: req.user?.email,
          type: "MANAGER"
        }
      });

      if (!manager) {
        return res.status(401).json({ error: "Manager não encontrado" });
      }

      if (manager.permission !== true) {
        return res.status(401).json({ error: "Acesso negado. Requer manager" });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  }
}