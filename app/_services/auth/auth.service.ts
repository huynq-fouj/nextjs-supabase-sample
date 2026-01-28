import 'server-only';
import { ApiResponse, AuthenticationRequest, AuthenticationResponse } from "@/app/_shared/types";
import { successResponse } from "@/app/_utils/helpers/response";
import { findUserByCredentials } from "../user/user.service";
import { signToken } from "@/app/_shared/libs/jwt/jwt";
import { NextResponse } from 'next/server';
import { AppError } from '@/app/_shared/errors/AppError';

export async function authenticate(req: AuthenticationRequest): Promise<NextResponse<ApiResponse<AuthenticationResponse>>> {
    const { username, password } = req;
    if(!username || !password) throw new AppError('Missing credentials', 401);

    const userFromDb = await findUserByCredentials(username, password);

    if (!userFromDb) throw new AppError('Invalid username or password', 401);

    const access_token = await signToken({
        userId: userFromDb.id,
        username: userFromDb.username,
        roles: userFromDb.roles
    });

    const response = successResponse<AuthenticationResponse>(
        'Login successfully!',
        {
            access_token,
            user: userFromDb
        }
    );

    response.cookies.set('access_token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
    });

    return response;
}