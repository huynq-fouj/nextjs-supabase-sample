import 'server-only';
import { NextResponse } from 'next/server';
import { AppError } from '@/app/shared/errors/AppError';
import { errorResponse } from '@/app/utils/helpers/response';

type HandlerFunction = (req: Request, ...args: any[]) => Promise<NextResponse | Response>;

export function apiHandler(handler: HandlerFunction): HandlerFunction {
  return async (req: Request, ...args: any[]) => {
    try {
      return await handler(req, ...args);
    } catch (error: any) {
      if (error instanceof AppError) return errorResponse(error.message, error.statusCode, error.details);

      console.error('Unhandled Error:', error); 
      return errorResponse('Internal Server Error', 500);
    }
  };
}