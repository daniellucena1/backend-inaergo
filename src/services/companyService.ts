import prisma from "./prisma"

export const companyService = {
  createCompany: async (name: string, cnpj: string) => {
    const companyExist = await prisma.company.findUnique({
      where: {
        cnpj
      }
    });

    if ( companyExist ) {
      throw new Error("Empresa já cadastrada");
    }

    const company = await prisma.company.create({
      data: {
        name,
        cnpj
      }
    });

    if (!company) {
      throw new Error("Erro ao criar empresa");
    }

    return company;

  }
}