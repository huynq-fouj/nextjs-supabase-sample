import 'server-only'
import { ApiResponse, RegisterRequest, User } from "@/app/_shared/types";
import { Permission } from '@/app/_shared/enums/permission.enum';
import { NextResponse } from 'next/server';
import { successResponse } from '@/app/_utils/helpers/response';

export async function findUserByCredentials(u: string, p: string): Promise<User | null> {
    if (u === 'admin' && p === '123') {
        return {
            id: '1',
            username: u,
            fullname: 'Admin User',
            roles: Object.values(Permission),
            dob: null,
            email: null,
            address: null,
            avatar: null,
        };
    }
    return null;
}

export async function registerUser(req: RegisterRequest): Promise<NextResponse<ApiResponse<null>>> {
    const response = successResponse('Register successfully!', null);
    return response
}