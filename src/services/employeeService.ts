import { BadRequest } from "../@errors/BadRequest";
import { Forbidden } from "../@errors/Forbidden";
import { InternalServerError } from "../@errors/InternalServerError";
import { NotFound } from "../@errors/NotFound";
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

    if (!companyId) {
      throw new BadRequest('Identificador da empresa não encontrado');
    }

    const employee = await prisma.employee.findUnique({
      where: {
        registrationCompanyId: {
          registration: registration,
          companyId: companyId
        }
      }
    });

    if (!employee) {
      throw new NotFound('Usuário não cadastrado');
    }

    const updatedEmployee = await prisma.employee.update({
      where: { 
        registrationCompanyId: {
          registration: registration,
          companyId: companyId
        }
      },
      data: {
        name: name !== "" ? name : employee.name,
        registration: registration !== "" ? registration : employee.registration,
        age: age ? age : employee.age, 
        gender: gender !== "" ? gender : employee.gender, 
        scholarship: scholarship !== "" ? scholarship : employee.scholarship, 
        meritalStatus: meritalStatus !== "" ? meritalStatus : employee.meritalStatus, 
        sector: sector !== "" ? sector : employee.sector, 
        position: position !== "" ? position : employee.position, 
        companyTime: companyTime ? companyTime : employee.companyTime, 
        positionTime: positionTime ? positionTime : employee.positionTime, 
        companyId: companyId ? companyId : employee.companyId
      },
    });

    if (!updatedEmployee) {
      throw new InternalServerError('Erro ao atualizar usuário');
    }

    return updatedEmployee;
  },

  getAllEmployees: async (managerId: number) => {
    
    const manager = await prisma.user.findUnique({
      where: {
        id: managerId
      }
    });

    if (!manager) {
      throw new NotFound("Gestor não cadastrado");
    }

    if (!manager.companyId) {
      throw new Forbidden("Autorização de gestor necessária");
    }
    
    const employees = await prisma.employee.findMany({
      where: {
        companyId: manager.companyId
      },
      include: {
        Answer: true
      }
    });

    if (!employees) {
      throw new NotFound('Nenhum usuário encontrado');
    }

    const response = employees.map(({Answer, ...employee}) => ({
      ...employee,
      answered: Answer.length > 0
    }));

    return response;
  },

  deleteEmployee: async (id: number) => {
    await prisma.employee.delete({ where: { id: id } });

    const deletedEmployee = await prisma.employee.findUnique({where: {id}});

    if (deletedEmployee) {
      throw new InternalServerError("Falha no servidor");
    }
    
    return true;
  },

  toggleBlock: async (id: number) => {
    const employee = await prisma.employee.findUnique({ where: { id: id } });

    if (!employee) {
      throw new NotFound("Funcionário não encontrado");
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id: id },
      data: { isBlocked: !employee.isBlocked }
    });

    if (!updatedEmployee) {
      throw new InternalServerError("Falha no servidor");
    }

    return updatedEmployee;
  }
}