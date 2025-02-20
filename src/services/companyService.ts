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

  }
}