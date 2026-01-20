import 'server-only';
import { apiHandler, ApiHandlerOptions } from './api-handler';

type RouteHandlers = {
  [key in 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH']?: Function;
};

export function createRoutes(handlers: RouteHandlers, options?: ApiHandlerOptions) {
  const wrappedHandlers: RouteHandlers = {};

  for (const [method, handler] of Object.entries(handlers)) {
    if (handler) {
      wrappedHandlers[method as keyof RouteHandlers] = apiHandler(handler as any, options);
    }
  }

  return wrappedHandlers;
}