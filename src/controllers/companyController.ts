import { Request, Response } from "express";
import { companyService } from "../services/companyService";

export const companyController = {
  createCompany: async (req: Request, res: Response) => {
    try {
      const { name, cnpj } = req.body;
      
      const company = await companyService.createCompany(name, cnpj);

      res.json(company)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }

      res.status(500).json({ message: 'Erro ao criar empresa' });
    }
  }
}