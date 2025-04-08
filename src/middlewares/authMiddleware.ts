import { NextFunction, Request, Response } from "express";
import { authService } from "../services/authService";
import prisma from "../services/prisma";
import { User } from "@prisma/client";
import { Unauthorized } from "../@errors/Unauthorized";
import { NotFound } from "../@errors/NotFound";

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

export const authMiddleware = {

  authenticate: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    // console.log(token);

    if (!token) {
      throw new Unauthorized("Token não fornecido");
    }

    try {
      const user = authService.verifyToken(token as string);
      req.user = user;

      return next();
    } catch (error) {
      // console.error(error);
      next(error)
    }
  },

  isAdmin: async (req: Request, res: Response, next: NextFunction) => {

    try {

      const admin = await prisma.user.findUnique({ where: { email: req.user?.email, type: "ADMIN" } });
      if (!admin) {
        throw new NotFound("Admin não encontrado");
      }

      if (admin.permission !== true) {
        throw new Unauthorized("Acesso negado. Requer admin");
      };

      return next();
    } catch (error) {
      next(error);
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
        throw new NotFound("Manager não encontrado");
      }

      if (manager.permission !== true) {
        throw new Unauthorized("Acesso negado. Requer manager");
      }

      return next();
    } catch (error) {
      next(error);
    }
  }
}