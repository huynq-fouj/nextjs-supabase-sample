import 'server-only';
import { ApiResponse, AuthenticationRequest, AuthenticationResponse } from "@/app/shared/types";
import { successResponse } from "@/app/utils/helpers/response";
import { findUserByCredentials } from "../user/user.service";
import { signToken } from "@/app/shared/libs/jwt/jwt";
import { NextResponse } from 'next/server';
import { AppError } from '@/app/shared/errors/AppError';

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
        'Đăng nhập thành công!',
        {
            access_token,
            user: userFromDb
        }
    );

    return response;
}