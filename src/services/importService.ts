import fs from 'fs';
import csvParser from 'csv-parser';
import prisma from '../services/prisma';
import { Employee } from '@prisma/client';
// import bcrypt from 'bcryptjs';
import xlsx from 'xlsx';
import { DataExcel } from '../types/dataExcel';
import { BadRequest } from '../@errors/BadRequest';
import { NotFound } from '../@errors/NotFound';
import { Unauthorized } from '../@errors/Unauthorized';

// Se tornar uma rota só / importar tanto csv quando excel
// mecanismo de resposta (id da questão / resposta de um usuário)

export const importService = {
  importFile: async(path: string, managerId: number, fileType: string) => {
    if (!path) {
      throw new BadRequest('Nenhum arquivo enviado');
    }

    const manager = await prisma.user.findUnique({
      where: { id: managerId }
    })

    if (!manager) {
      throw new NotFound('Gerente não encontrado');
    }

    if (manager.companyId === null) {
      throw new Unauthorized('Usuário não é um gerente');
    }

    const companyId = manager?.companyId;

    switch (fileType) {
      case 'csv':
        return await importService.importFromCsv(path, companyId);
      case 'xlsx':
      case 'xls':
        return await importService.importFromExcel(path, companyId);
      default:
        throw new Error("Tipo de arquivo não suportado");

    }
  },

  importFromCsv: async (path: string, companyId: number) => {

    let employees: Employee[] = [];
    let response = {};

    const results: Omit<Employee, "id" | "createdAt" | "updatedAt" | "permission">[] = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csvParser())
        .on('data', (data: DataExcel) => {
          if (!data.matricula) {
            throw new Error('Matrícula não encontrada no CSV');
          }

          const newData: Omit<Employee, "id" | "createdAt" | "updatedAt" | "permission"> = {
            registration: data.matricula,
            name: data.nome,
            age: parseInt(data.idade as unknown as string, 10),
            companyTime: parseInt(data['tempo empresa'] as unknown as string, 10),
            positionTime: parseInt(data['tempo posicao'] as unknown as string, 10),
            meritalStatus: data['estado civil'],
            gender: data.genero ? data.genero : "Não informado",
            position: data.cargo,
            sector: data.setor,
            scholarship: data.escolaridade ? data.escolaridade : null,
            companyId
          }

          results.push(newData);
        })
        .on('end', async () => {
          try {

            const existingEmployees = await prisma.employee.findMany({
              select: { registration: true }
            });

            const existingRegistrations = existingEmployees.map((employee) => employee.registration);

            const newEmployees = results.filter((employee) => !existingRegistrations.includes(employee.registration));
            const duplicateEmployees = results.filter((employee) => existingRegistrations.includes(employee.registration));

            if (newEmployees.length > 0) {
              employees = await prisma.employee.createManyAndReturn({
                data: results,
                skipDuplicates: true,
              });
            }

            response = {
              employees,
              inserted: newEmployees.length,
              duplicated: duplicateEmployees.length,
              duplicateUsers: duplicateEmployees,
              message: duplicateEmployees.length > 0 ? `Foram ignorados ${duplicateEmployees.length} registros duplicados` : "Todos os registros foram inseridos com sucesso"
            }
            
            resolve(results);
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    return response;
  },

  importFromExcel: async (path: string, companyId: number) => {
    
    let employees: Employee[] = [];

    const results: Omit<Employee, "id" | "createdAt" | "updatedAt" | "permission">[] = [];

    const excel = xlsx.readFile(path);
    const sheets = excel.SheetNames;

    for (let i = 0; i < sheets.length; i++) {
      const temp = xlsx.utils.sheet_to_json<DataExcel>(excel.Sheets[excel.SheetNames[i]]);
      temp.forEach((data) => {
        if (!data.matricula) {
          throw new Error('Matrícula não encontrada no Excel');
        }

        const newData: Omit<Employee, "id" | "createdAt" | "updatedAt" | "permission"> = {
          registration: String(data.matricula),
          name: data.nome,
          age: parseInt(data.idade as unknown as string, 10),
          companyTime: parseInt(data['tempo empresa'] as unknown as string, 10),
          positionTime: parseInt(data['tempo posicao'] as unknown as string, 10),
          meritalStatus: data['estado civil'],
          gender: data.genero,
          position: data.cargo,
          sector: data.setor,
          scholarship: data.escolaridade ? data.escolaridade : null,
          companyId
        };

        results.push(newData);
      });
    }

    const existingEmployees = await prisma.employee.findMany({
      select: { registration: true }
    });

    const existingRegistrations = existingEmployees.map((employee) => employee.registration);

    const newEmployees = results.filter((employee) => !existingRegistrations.includes(employee.registration));
    const duplicateEmployees = results.filter((employee) => existingRegistrations.includes(employee.registration));

    if (newEmployees.length > 0) {
      employees = await prisma.employee.createManyAndReturn({
        data: results,
        skipDuplicates: true,
      });
    }

    return {
      employees,
      inserted: newEmployees.length,
      duplicated: duplicateEmployees.length,
      duplicateUsers: duplicateEmployees,
      message: duplicateEmployees.length > 0 ? `Foram ignorados ${duplicateEmployees.length} registros duplicados` : "Todos os registros foram inseridos com sucesso"
    }
  },
}