import { Response } from "express";
import prisma from "../services/prisma";
import bcrypt from 'bcryptjs';

export const employeeService = {
  createEmployee: async (name: string, email: string, password: string, res: Response) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const employee = await prisma.employee.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        omit: {
          password: true
        }
      });
      res.status(201).json(employee);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao criar usuário' });
    }
  },

  getEmployeeById: async (id: number, res: Response) => {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id: id },
        omit: {
          password: true
        }
      });

      if (!employee) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(employee);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao buscar usuário' });
    }
  },

  updateEmployee: async (id: number, name: string, email: string, password: string, res: Response) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const employee = await prisma.employee.update({
        where: { id: id },
        data: {
          name,
          email,
          password: hashedPassword,
        },
        omit: {
          password: true
        }
      });
      res.json(employee);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  deleteEmployee: async (id: number, res: Response) => {
    try {
      await prisma.employee.delete({ where: { id: id } });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao deletar usuário' });
    }
  }
}