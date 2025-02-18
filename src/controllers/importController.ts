import { Request, Response } from 'express';
import fs from 'fs';
import { Employee } from '@prisma/client';
import { importService } from '../services/importService';

export const importController = {
  importAsCsv: async (req: Request, res: Response) => {
    const path = req.file?.path;

    if (req.user === undefined) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const managerId: number = req.user.id;

    if (!path) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    try {
      const results: Employee[] = await importService.importFromCsv(path, managerId);

      res.status(201).json({ message: 'Arquivo importado com sucesso', results });
    } catch (error) {
      fs.unlink(path, () => { });
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  },

  // importFromExcel: async (req: Request, res: Response) => {
  //   try {
  //     const path = req.file?.path;
  //     const results: Employee[] = await importService.importFromExcel(path as string);

  //     res.status(201).json({ message: 'Arquivo importado com sucesso', results });
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).json({
  //       error: error instanceof Error ? error.message : 'Erro desconhecido'
  //     });
  //   }
  // }
};