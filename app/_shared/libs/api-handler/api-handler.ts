import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { AppError } from '@/app/_shared/errors/AppError';
import { errorResponse } from '@/app/_utils/helpers/response';
import { Permission } from '@/app/_shared/enums/permission.enum';
import { filter, TokenPayload } from '@/app/_shared/libs/jwt';

export type HandlerContext = {
  user?: TokenPayload;
};

export type HandlerFunction = (req: NextRequest, ctx: HandlerContext, ...args: any[]) => Promise<NextResponse | Response>;

export type ApiHandlerOptions = {
  authenticated?: boolean;
  withRoles?: Permission[];
}

export function apiHandler(handler: HandlerFunction, options?: ApiHandlerOptions): HandlerFunction {
  return async (req, ctx = {}, ...args) => {
    try {
      if(options?.authenticated || options?.withRoles?.length) ctx.user = await filter(req, options.withRoles);
      
      return await handler(req, ctx, ...args);
    } catch (error: any) {
      if (error instanceof AppError) return errorResponse(error.message, error.statusCode, error.details);

      console.error('Unhandled Error:', error); 
      return errorResponse('Internal Server Error', 500);
    }
  };
}