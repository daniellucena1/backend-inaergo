import { Request, Response } from "express";
import { employeeService } from "../services/empĺoyeeService";

export const employeeController = {
  async createEmployee(req: Request, res: Response) {
    const { name, email, password } = req.body;

    employeeService.createEmployee(name, email, password, res);
  },

  async getEmployeeById(req: Request, res: Response) {
    const { id } = req.params;

    employeeService.getEmployeeById(parseInt(id), res);
  },

  async updateEmployee(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    employeeService.updateEmployee(parseInt(id), name, email, password, res);
  },

  async deleteEmployee(req: Request, res: Response) {
    const { id } = req.params;

    employeeService.deleteEmployee(parseInt(id), res);
  }
}