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

  getAllCompanies: async (req: Request, res: Response) => {
    try {
      const companies = await companyService.getAllCompanies();

      res.json(companies);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }

      res.status(500).json({ message: 'Erro ao buscar empresas' });
    }
  },

  updateCompany: async (req: Request, res: Response) => {
    try {

      const companyId = Number(req.params.id);
      const {name, cnpj} = req.body;

      if (!companyId) {
        throw new Error('ID da empresa não informado');
      }

      const company = await companyService.updateCompany(companyId, name, cnpj);

      res.json(company);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
}