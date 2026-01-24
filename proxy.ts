import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ['/login', '/register'];

export function proxy(req: NextRequest) {
    const token = req.cookies.get('access_token');
    const { pathname } = req.nextUrl;

    const isPublic = PUBLIC_PATHS.some(
        p => pathname === p || pathname.startsWith(p + '/')
    );

    if (!token && !isPublic) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};