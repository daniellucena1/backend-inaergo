import prisma from "../services/prisma";

export const employeeService = {
  createEmployee: async (name: string, email: string, age: number, gender: string, schoolership: string, meritalStatus: string, sector: string, position: string, companyTime: number, positionTime: number, healthProblemLastYear: string, registration: string) => {
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        age,
        gender,
        schoolership,
        meritalStatus,
        sector,
        position,
        companyTime,
        positionTime,
        healthProblemLastYear,
        registration
      }
    });

    if (!employee) {
      throw new Error('Erro ao criar usuário');
    }

    return employee;
  },

  getEmployeeById: async (id: number) => {
    const employee = await prisma.employee.findUnique({
      where: { id: id }
    });

    if (!employee) {
      throw new Error('Usuário não encontrado');
    }

    return employee;
  },

  updateEmployee: async (id: number, name: string, email: string, age: number, gender: string, schoolership: string, meritalStatus: string, sector: string, position: string, companyTime: number, positionTime: number, healthProblemLastYear: string, registration: string) => {

    const employee = await prisma.employee.update({
      where: { id: id },
      data: {
        name,
        email,
        age,
        gender,
        schoolership,
        meritalStatus,
        sector,
        position,
        companyTime,
        positionTime,
        healthProblemLastYear,
        registration
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