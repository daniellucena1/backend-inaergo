import { NextFunction, Request, Response } from "express";
import { companyService } from "../services/companyService";

export const companyController = {
  createCompany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, cnpj } = req.body;
      
      const company = await companyService.createCompany(name, cnpj);

      res.json(company)
    } catch (error) {
      next(error);
    }
  }
}