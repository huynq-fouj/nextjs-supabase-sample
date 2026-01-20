import 'server-only';
import { apiHandler, ApiHandlerOptions, HandlerFunction } from './api-handler';

type RouteHandlers = {
  [key in 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH']?: HandlerFunction;
};

export function createRoutes(handlers: RouteHandlers, options?: ApiHandlerOptions) {
  const wrappedHandlers: RouteHandlers = {};

  for (const [method, handler] of Object.entries(handlers)) {
    if (handler) {
      wrappedHandlers[method as keyof RouteHandlers] = apiHandler(handler, options);
    }
  }

  return wrappedHandlers;
}