import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './app/shared/libs/jwt/jwt';
import { errorResponse } from './app/utils/helpers/response';

const publicApiPaths = [
    '/api/authenticate',
    '/api/register',
    '/api/forgot-password',
    '/api/p/**'
];

const roleBasedApiPaths: Record<string, string[]> = {
  '/api/users/**': ['ADMIN'],
};

function isPathMatch(pattern: string, pathname: string): boolean {
    if (pattern.endsWith('/**')) {
        const prefix = pattern.replace('/**', '');
        return pathname.startsWith(prefix);
    }
    
    return pattern === pathname;
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublic = publicApiPaths.some(pattern => isPathMatch(pattern, pathname));
    if (isPublic) return NextResponse.next();

    let token = request.cookies.get('session_token')?.value;

    if (!token) {
        const authHeader = request.headers.get('Authorization');
        if (authHeader?.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    if (!token) return errorResponse('Authentication required', 401);

    const payload = await verifyToken(token);

    if (!payload) return errorResponse('Invalid or expired token', 401);

    for (const [pattern, allowedRoles] of Object.entries(roleBasedApiPaths)) {
        if (isPathMatch(pattern, pathname)) {
            const userRole = payload.role as string;
            if (!allowedRoles.includes(userRole)) return errorResponse('Forbidden: Insufficient permissions', 403);
        }
    }

    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.userId as string);
    response.headers.set('x-user-role', payload.role as string);

    return response;
}

export const config = {
    matcher: [
        '/api/:path*',
    ],
};