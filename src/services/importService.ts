import fs from 'fs';
import csvParser from 'csv-parser';
import prisma from '../services/prisma';
import { Employee } from '@prisma/client';
// import bcrypt from 'bcryptjs';
// import xlsx from 'xlsx';
// import { DataExcel } from '../types/dataExcel';

// Se tornar uma rota só / importar tanto csv quando excel
// mecanismo de resposta (id da questão / resposta de um usuário)
// Resposta irá se tornar number ( schema.prisma )

export const importService = {
  importFromCsv: async (path: string) => {
    if (!path) {
      throw new Error('Nenhum arquivo enviado');
    }

    const results: Employee[] = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csvParser())
        .on('data', (data: Employee) => {
          if (!data.registration) {
            throw new Error('Matrícula não encontrada no CSV');
          }

          const newData: Employee = {
            ...data,
            age: parseInt(data.age as unknown as string, 10),
            companyTime: parseInt(data.companyTime as unknown as string, 10),
            positionTime: parseInt(data.positionTime as unknown as string, 10),
          }

          results.push(newData);
        })
        .on('end', async () => {
          try {
            await prisma.employee.createMany({
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
    return results;
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