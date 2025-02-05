import fs from 'fs';
import csvParser from 'csv-parser';
import prisma from '../services/prisma';
import { Employee } from '@prisma/client';

export const importService = {
  import: async (path: string) => {
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
  }
}