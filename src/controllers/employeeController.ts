import { Request, Response } from "express";
import prisma from "../services/prisma";
import bcrypt from 'bcryptjs';

export const employeeController = {
  async createEmployee(req: Request, res: Response) {
    const { name, email, senha } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(senha, 10);
      const employee = await prisma.employee.create({
        data: {
          name,
          email,
          senha: hashedPassword,
        }
      });
      res.status(201).json(employee);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao criar usuário' });
    }
  },

  async getEmployeeById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const employee = await prisma.employee.findUnique({ where: { id: parseInt(id) } });

      if (!employee) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(employee);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao buscar usuário' });
    }
  },

  async updateEmployee(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, senha } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(senha, 10);
      const employee = await prisma.employee.update({
        where: { id: parseInt(id) },
        data: {
          name,
          email,
          senha: hashedPassword,
        },
      });
      res.json(employee);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  async deleteEmployee(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.employee.delete({ where: { id: parseInt(id) } });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao deletar usuário' });
    }
  }
}