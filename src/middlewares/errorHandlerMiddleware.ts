import { Request, Response } from 'express';
import { BaseError } from '../@errors/baseError';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { z } from 'zod';

export const errorHandlerMiddleware = (err: unknown, req: Request, res: Response) => {
  if (err instanceof BaseError) {
    switch (err.name) {
      case 'BAD_REQUEST':
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: err.message });
      case 'UNAUTHORIZED':
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: err.message });
      case 'FORBIDDEN':
        return res.status(HttpStatusCode.FORBIDDEN).json({ error: err.message });
      case 'NOT_FOUND':
        return res.status(HttpStatusCode.TOO_MANY_REQUEST).json({ error: err.message });
      case 'METHOD_NOT_ALLOWED':
        return res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({ error: err.message });
      case 'TOO_MANY_REQUESTS':
        return res.status(HttpStatusCode.TOO_MANY_REQUEST).json({ error: err.message });
      case 'INTERNAL_SERVER_ERROR':
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: err.message });
      case 'BAD_GATEWAY':
        return res.status(HttpStatusCode.BAD_GATEWAY).json({ error: err.message });
      case 'SERVICE_UNAVAILABLE':
        return res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json({ error: err.message });
      case 'GATEWAY_TIMEOUT':
        return res.status(HttpStatusCode.GATEWAY_TIMEOUT).json({ error: err.message });
      default:
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
    }
  }

  if (err instanceof Error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
  }

  if (err instanceof z.ZodError) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ error: err.errors, status: 400 });
  }
}