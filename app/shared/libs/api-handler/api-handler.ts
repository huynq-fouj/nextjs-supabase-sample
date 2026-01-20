import 'server-only';
import { NextResponse } from 'next/server';
import { AppError } from '@/app/shared/errors/AppError';
import { errorResponse } from '@/app/utils/helpers/response';
import { filter } from '../jwt/auth-filter';
import { Permission } from '@/app/shared/enums/Permission.enum';

type HandlerFunction = (req: Request, ...args: any[]) => Promise<NextResponse | Response>;

export type ApiHandlerOptions = {
  authenticated?: boolean;
  withRoles?: Permission[];
}

export function apiHandler(handler: HandlerFunction, options?: ApiHandlerOptions): HandlerFunction {
  return async (req: Request, ...args: any[]) => {
    try {
      if(options?.authenticated) {
        const user = await filter(req, options.withRoles);
        (req as any).user = user;
      }
      return await handler(req, ...args);
    } catch (error: any) {
      if (error instanceof AppError) return errorResponse(error.message, error.statusCode, error.details);

      console.error('Unhandled Error:', error); 
      return errorResponse('Internal Server Error', 500);
    }
  };
}