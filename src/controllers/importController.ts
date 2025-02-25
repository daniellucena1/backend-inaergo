import { Request, Response } from 'express';
import fs from 'fs';
import { Employee } from '@prisma/client';
import { importService } from '../services/importService';

export const importController = {

  importFile: async (req: Request, res: Response) => {
    const path = req.file?.path;

    if (!req.user) {
      return res.status(401).json({
        error: 'Usuário não autenticado'
      });
    }

    const managerId: number = req.user.id;

    if(!path) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const fileExtension = req.file?.originalname.split('.').pop()?.toLowerCase();

    if (!fileExtension) {
      return res.status(400).json({error: 'Tipo de arquivo não suportado'});
    }
    
    try {
      const results: Employee[] = await importService.importFile(path, managerId, fileExtension);

      res.status(201).json({ message: 'Arquivo importado com sucesso', results});
    } catch (error) {
      fs.unlink(path, () => {});
      return res.status(500).json({
        error: error instanceof Error? error.message : 'Erro desconhecido'
      });
    }
  },

//   importAsCsv: async (req: Request, res: Response) => {
//     const path = req.file?.path;

//     if (req.user === undefined) {
//       return res.status(401).json({ error: 'Usuário não autenticado' });
//     }

//     const managerId: number = req.user.id;

//     if (!path) {
//       return res.status(400).json({ error: 'Nenhum arquivo enviado' });
//     }

//     try {
//       const results: Employee[] = await importService.importFromCsv(path, managerId);

//       res.status(201).json({ message: 'Arquivo importado com sucesso', results });
//     } catch (error) {
//       fs.unlink(path, () => { });
//       return res.status(500).json({
//         error: error instanceof Error ? error.message : 'Erro desconhecido'
//       });
//     }
//   },

// importFromExcel: async (req: Request, res: Response) => {
//     const path = req.file?.path;

//     if (req.user === undefined) {
//       return res.status(401).json({ error: 'Usuário não autenticado' });
//     }

//     const managerId: number = req.user.id;

//     if (!path) {
//       return res.status(400).json({ error: 'Nenhum arquivo enviado' });
//     }

//     try {
//       const results: Employee[] = await importService.importFromExcel(path, managerId);

//       res.status(201).json({ message: 'Arquivo importado com sucesso', results });
//     } catch (error) {
//       fs.unlink(path, () => { });
//       return res.status(500).json({
//         error: error instanceof Error ? error.message : 'Erro desconhecido'
//       });
//     }
//   },
};