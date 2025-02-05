import fs from 'fs';
import csvParser from 'csv-parser';
import prisma from '../services/prisma';
import { Employee } from '@prisma/client';
import bcrypt from 'bcryptjs';
import xlsx from 'xlsx';
import { DataExcel } from '../types/dataExcel';

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
          if (!data.password) {
            throw new Error('Senha não encontrada no CSV');
          }

          data.password = bcrypt.hashSync(data.password, 10);
          results.push(data);
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

  importFromExcel: async (path: string) => {
    const excel = xlsx.readFile(path);
    const data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>[] = [];
    const sheets = excel.SheetNames;

    for (let i = 0; i < sheets.length; i++) {
      const temp = xlsx.utils.sheet_to_json<DataExcel>(excel.Sheets[excel.SheetNames[i]])
      temp.forEach((res) => {
        const row: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'> = {
          name: res['nome'],
          email: res['email'],
          password: bcrypt.hashSync(String(res['password']), 10),
          permission: false,
        }

        data.push(row)
      })
    }

    const results = await prisma.employee.createManyAndReturn({
      data,
      skipDuplicates: true,
    });

    return results;
  }
}