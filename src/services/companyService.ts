import { BadRequest } from "../@errors/BadRequest";
import { InternalServerError } from "../@errors/InternalServerError";
import prisma from "./prisma"

export const companyService = {
  createCompany: async (name: string, cnpj: string) => {
    const companyExist = await prisma.company.findUnique({
      where: {
        cnpj
      }
    });

    if ( companyExist ) {
      throw new BadRequest("Empresa já cadastrada");
    }

    const company = await prisma.company.create({
      data: {
        name,
        cnpj
      }
    });

    if (!company) {
      throw new InternalServerError("Erro ao criar empresa");
    }

    return company;

  },

  getAllCompanies: async () => {
    const companies = await prisma.company.findMany();

    if (!companies) {
      throw new Error("Nenhuma empresa encontrada");
    }

    return companies
  },

  updateCompany: async (companyId: number, name: string, cnpj: string) => {

    const company = await prisma.company.update({
      where: {
        id: companyId
      },
      data: {
        name: name,
        cnpj: cnpj
      }
    });

    if (!company) {
      throw new Error("Erro ao atualizar empresa");
    } 

    return company;
  }
}