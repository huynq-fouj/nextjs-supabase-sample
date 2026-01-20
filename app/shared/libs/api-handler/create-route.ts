import 'server-only';
import { apiHandler } from './api-handler';

type RouteHandlers = {
  [key in 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH']?: Function;
};

export function createRoutes(handlers: RouteHandlers) {
  const wrappedHandlers: RouteHandlers = {};

  for (const [method, handler] of Object.entries(handlers)) {
    if (handler) {
      wrappedHandlers[method as keyof RouteHandlers] = apiHandler(handler as any);
    }
  }

  return wrappedHandlers;
}