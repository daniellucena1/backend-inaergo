import prisma from "./prisma";
import bcrypt from "bcryptjs";

export const userService = {
  create: async (name: string, email: string, password: string, type: 'ADMIN' | 'MANAGER', companyId?: number) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const findedUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (findedUser) {
      throw new Error('Usuário já cadastrado');
    }

    if (companyId) {
      const findedCompany = await prisma.company.findUnique({
        where: {
          id: companyId
        }
      });

      if (!findedCompany) {
        throw new Error('Empresa não encontrada');
      }
    }

    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        type,
        companyId: companyId ? companyId : null
      },
      omit: {
        password: true
      }
    });

    if (!admin) {
      throw new Error('Erro ao criar usuário');
    }

    return admin;
  },

  getById: async (id: number) => {
    const user = await prisma.user.findUnique({
      where: { id: id },
      omit: {
        password: true
      }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user
  },

  getManagers: async (companyId: number) => {

    const managers = await prisma.user.findMany({
      where: {
        companyId: companyId ? companyId : undefined,
        type: "MANAGER"
      },
      omit: {
        password: true
      }
    });

    if ( !managers ) {
      throw new Error('Usuários não encontrados');
    }

    return managers
  },

  update: async (id: number, name?: string, email?: string, password?: string) => {
    
    let hashedPassword;
    if(password !== undefined) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const admin = await prisma.user.update({
      where: { id: id },
      data: {
        name: name !== undefined ? name : undefined,
        email: email !== undefined ? email : undefined,
        password: password !== undefined ? hashedPassword : undefined,
      },
    });

    if (!admin) {
      throw new Error('Erro ao atualizar usuário');
    }

    return admin
  },

  delete: async (id: number) => {
    await prisma.user.delete({ where: { id: id } });
  }
}