import { Request, Response } from "express";
import prisma from "../services/prisma";
import bcrypt from 'bcryptjs';

export const funcionarioController = {
  async createfuncionario(req: Request, res: Response) {
    const { name, email, senha } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(senha, 10);
      const funcionario = await prisma.funcionario.create({
        data: {
          name,
          email,
          senha: hashedPassword,
        }
      });
      res.status(201).json(funcionario);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar usuário'});
    }
  },

  async getFuncionarioById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const funcionario = await prisma.funcionario.findUnique({ where: { id: parseInt(id) } });

      if ( !funcionario ) {
        res.status(404).json({ error: 'Usuário não encontrado'});
      }
      res.json(funcionario);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao buscar usuário'});
    }
  },

  async updateFuncionario(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, senha } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(senha, 10);
      const funcionario = await prisma.funcionario.update({
        where: {id: parseInt(id)},
        data: {
          name,
          email,
          senha: hashedPassword,
        },
      });
      res.json(funcionario);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar usuário'});
    }
  },

  async deleteFuncionario() {
    
  }
}