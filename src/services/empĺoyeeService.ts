import prisma from "../services/prisma";
import bcrypt from 'bcryptjs';

export const employeeService = {
  createEmployee: async (name: string, email: string, password: string) => {
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

    if (!employee) {
      throw new Error('Erro ao criar usuário');
    }

    return employee;
  },

  getEmployeeById: async (id: number) => {
    const employee = await prisma.employee.findUnique({
      where: { id: id },
      omit: {
        password: true
      }
    });

    if (!employee) {
      throw new Error('Usuário não encontrado');
    }

    return employee;
  },

  updateEmployee: async (id: number, name: string, email: string, password: string) => {
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

    if (!employee) {
      throw new Error('Erro ao atualizar usuário');
    }

    return employee;
  },

  deleteEmployee: async (id: number) => {
    await prisma.employee.delete({ where: { id: id } });

    return true;
  }
}