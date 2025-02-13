import { Request, Response } from "express";
import { employeeService } from "../services/employeeService";

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

  // async updateEmployee(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;
  //     const { name, email, password } = req.body;

  //     const e = await employeeService.updateEmployee(parseInt(id), name, email, password);

  //     res.json(e);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       res.status(404).json({ error: error.message });
  //     }

  //     res.status(500).json({ error: 'Erro ao atualizar usuário' });
  //   }
  // },

  async deleteEmployee(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await employeeService.deleteEmployee(parseInt(id));

      res.json({
        message: "Usuario deletado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          error: error.message,
        });
      }

      res.status(500).json({
        error: "Erro ao deletar usuário",
      });
    }
  }
}