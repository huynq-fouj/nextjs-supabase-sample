import 'server-only';
import { NextRequest } from 'next/server';
import { AppError } from '@/app/_shared/errors/AppError';
import { errorResponse } from '@/app/_utils/helpers/response';
import { Permission } from '@/app/_shared/enums/permission.enum';
import { filter, TokenPayload } from '@/app/_shared/libs/jwt';

export type HandlerContext = {
  user?: TokenPayload;
};

export type HandlerFunction = (req: NextRequest, context: {
  params: any;
  user?: TokenPayload
}) => void | Response | Promise<void | Response>;

export type ApiHandlerOptions = {
  authenticated?: boolean;
  withRoles?: Permission[];
}

export function apiHandler(handler: HandlerFunction, options?: ApiHandlerOptions): HandlerFunction {
  return async (
    req: NextRequest,
    context: { params: any; }
  ) => {
    try {
      const ctx: {
        params: any;
        user?: TokenPayload
      } = {
        params: context.params,
      }

      if(options?.authenticated || options?.withRoles?.length) ctx.user = await filter(options.withRoles);
      
      return await handler(req, ctx);
    } catch (error: any) {
      if (error instanceof AppError) return errorResponse(error.message, error.statusCode, error.details);

      console.error('Unhandled Error:', error); 
      return errorResponse('Internal Server Error', 500);
    }
  };
}