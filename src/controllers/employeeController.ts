import { NextFunction, Request, Response } from "express";
import { employeeService } from "../services/employeeService";
import { z } from "zod";

export const employeeController = {
  // async createEmployee(req: Request, res: Response) {
  //   try {
  //     const { name, email, password } = req.body;

  //     const employee = await employeeService.createEmployee(name, email, password);

  //     res.json(employee);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       res.status(400).json({ error: error.message });
  //     }

  //     res.status(500).json({ error: 'Erro ao criar usuário' });
  //   }
  // },

  // async getEmployeeById(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;

  //     const employee = await employeeService.getEmployeeById(parseInt(id));

  //     res.json(employee);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       res.status(404).json({ error: error.message });
  //     }

  //     res.status(500).json({ error: 'Erro ao buscar usuário' });
  //   }
  // },

  async updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {

      const schemaBody = z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        age: z.number().optional(),
        gender: z.string().optional(),
        scholarship: z.string().optional(),
        meritalStatus: z.string().optional(),
        sector: z.string().optional(),
        position: z.string().optional(),
        companyTime: z.number().optional(),
        positionTime: z.number().optional(),
        healthProblemaLastYear: z.string().optional(),
        companyId: z.number().optional()
      });

      const { name, email, age, gender, scholarship, meritalStatus, sector, position, companyTime, positionTime, healthProblemaLastYear, companyId } = schemaBody.parse(req.body);

      const registration = req.params.registration;

      if ( !registration ) {
        throw new Error("Matrícula do funcionário é obrigatória");
      }

      const e = await employeeService.updateEmployee(registration, name, email, age, gender, scholarship, meritalStatus, sector, position, companyTime, positionTime, healthProblemaLastYear, companyId);

      res.json(e);
    } catch (error) {
      next(error);
    }
  },

  getAllEmloyees: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await employeeService.getAllEmployees();

      res.json(employees);
    } catch (error) {
      next(error);
    }
  },

  async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await employeeService.deleteEmployee(parseInt(id));

      res.json({
        message: "Usuario deletado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }
}