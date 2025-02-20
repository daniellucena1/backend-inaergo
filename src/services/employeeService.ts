import prisma from "./prisma";
// import bcrypt from 'bcryptjs';

export const employeeService = {
  // createEmployee: async (name: string, email: string, password: string) => {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const employee = await prisma.employee.create({
  //     data: {
  //       name,
  //       email,
  //     },
  //   });

  //   if (!employee) {
  //     throw new Error('Erro ao criar usuário');
  //   }

  //   return employee;
  // },

  // getEmployeeById: async (id: number) => {
  //   const employee = await prisma.employee.findUnique({
  //     where: { id: id },
  //     omit: {
  //       password: true
  //     }
  //   });

  //   if (!employee) {
  //     throw new Error('Usuário não encontrado');
  //   }

  //   return employee;
  // },

  updateEmployee: async (registration: string, name?: string, email?: string, age?: number, gender?: string, scholarship?: string, meritalStatus?: string, sector?: string, position?: string, companyTime?: number, positionTime?: number, healthProblemLastYear?: string, companyId?: number) => {

    const employee = await prisma.employee.findUnique({
      where: {
        registration
      }
    });

    if (!employee) {
      throw new Error('Usuário não cadastrado');
    }

    const updatedEmployee = await prisma.employee.update({
      where: { registration: registration },
      data: {
        name: name !== "" ? name : employee.name,
        email: email !== "" ? email : employee.email,
        registration: registration !== "" ? registration : employee.registration,
        age: age ? age : employee.age, 
        gender: gender !== "" ? gender : employee.gender, 
        scholarship: scholarship !== "" ? scholarship : employee.scholarship, 
        meritalStatus: meritalStatus !== "" ? meritalStatus : employee.meritalStatus, 
        sector: sector !== "" ? sector : employee.sector, 
        position: position !== "" ? position : employee.position, 
        companyTime: companyTime ? companyTime : employee.companyTime, 
        positionTime: positionTime ? positionTime : employee.positionTime, 
        healthProblemLastYear: healthProblemLastYear !== "" ? healthProblemLastYear : employee.healthProblemLastYear, 
        companyId: companyId ? companyId : employee.companyId
      },
    });

    if (!updatedEmployee) {
      throw new Error('Erro ao atualizar usuário');
    }

    return updatedEmployee;
  },

  getAllEmployees: async () => {
    const employees = await prisma.employee.findMany();

    if (!employees) {
      throw new Error('Nenhum usuário encontrado');
    }

    return employees;
  },

  deleteEmployee: async (id: number) => {
    await prisma.employee.delete({ where: { id: id } });

    return true;
  }
}