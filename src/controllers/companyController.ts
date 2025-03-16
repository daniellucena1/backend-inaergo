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
  },

  getAllCompanies: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companies = await companyService.getAllCompanies();

      res.json(companies);
    } catch (error) {
      next(error);
    }
  },

  updateCompany: async (req: Request, res: Response, next: NextFunction) => {
    try {

      const companyId = Number(req.params.id);
      const {name, cnpj} = req.body;

      if (!companyId) {
        throw new Error('ID da empresa não informado');
      }

      const company = await companyService.updateCompany(companyId, name, cnpj);

      res.json(company);
    } catch (error) {
      next(error);
    }
  }
}