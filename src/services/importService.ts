import fs from 'fs';
import csvParser from 'csv-parser';
import prisma from '../services/prisma';
import { Employee } from '@prisma/client';
// import bcrypt from 'bcryptjs';
// import xlsx from 'xlsx';
import { DataExcel } from '../types/dataExcel';

// Se tornar uma rota só / importar tanto csv quando excel
// mecanismo de resposta (id da questão / resposta de um usuário)

export const importService = {
  importFromCsv: async (path: string, companyId: number) => {
    if (!path) {
      throw new Error('Nenhum arquivo enviado');
    }

    let employees: Employee[] = [];

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
            email: data.email,
            name: data.nome,
            age: parseInt(data.idade as unknown as string, 10),
            companyTime: parseInt(data['tempo empresa'] as unknown as string, 10),
            positionTime: parseInt(data['tempo posicao'] as unknown as string, 10),
            meritalStatus: data['estado civil'],
            healthProblemLastYear: data['problemas de saude'],
            gender: data.genero,
            position: data.cargo,
            sector: data.setor,
            scholarship: data.escolaridade,
            companyId
          }

          results.push(newData);
        })
        .on('end', async () => {
          try {
            employees = await prisma.employee.createManyAndReturn({
              data: results,
              skipDuplicates: true,
            });
            resolve(results);
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    return employees;
  },

  // importFromExcel: async (path: string) => {
  //   const excel = xlsx.readFile(path);
  //   const data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>[] = [];
  //   const sheets = excel.SheetNames;

  //   for (let i = 0; i < sheets.length; i++) {
  //     const temp = xlsx.utils.sheet_to_json<DataExcel>(excel.Sheets[excel.SheetNames[i]])
  //     temp.forEach((res) => {
  //       const row: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'> = {
  //         name: res['nome'],
  //         email: res['email'],
  //         password: bcrypt.hashSync(String(res['password']), 10),
  //         permission: false,
  //       }

  //       data.push(row)
  //     })
  //   }

  //   const results = await prisma.employee.createManyAndReturn({
  //     data,
  //     skipDuplicates: true,
  //   });

  //   return results;
  // }
}