import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../@errors/baseError';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { z } from 'zod';

export const errorHandlerMiddleware = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof BaseError) {
    return res.status(err.httpCode).json({
      status: err.httpCode,
      error: err.message,
      isOperational: err.isOperational
    });
  }

  if (err instanceof Error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
  }

  if (err instanceof z.ZodError) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ error: err.errors, status: 400 });
  }
}