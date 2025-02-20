import { Request, Response } from 'express';

export const notFoundRoute = (_: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada', status: 404 });
};