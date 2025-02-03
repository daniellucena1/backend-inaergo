import fs from 'fs';
import csvParser from 'csv-parser';
import prisma from '../services/prisma';
import { Employee } from '@prisma/client';
import bycrypt from 'bcryptjs';

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
          if (!data.password) {
            throw new Error('Senha não encontrada no CSV');
          }

          data.password = bycrypt.hashSync(data.password, 10);
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
  }
}