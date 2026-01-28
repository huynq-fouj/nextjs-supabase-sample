import 'server-only'
import { ApiResponse, RegisterRequest, User } from "@/app/_shared/types";
import { Permission } from '@/app/_shared/enums/permission.enum';
import { NextResponse } from 'next/server';
import { successResponse } from '@/app/_utils/helpers/response';
import { AppError } from '@/app/_shared/errors/AppError';
import { createClient } from '@/app/_utils/supabase/server';
import { hashPassword, verifyPassword } from '@/app/_utils/helpers/password';

export async function findUserByCredentials(u: string, p: string): Promise<User | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from('users')
    .select(
    `
        id,
        username,
        fullname,
        avatar,
        roles,
        password_hash
    `
    ).eq('username', u).single();

    if (error || !data) return null;
    
    const isValid = await verifyPassword(p, data.password_hash);
    if (!isValid) return null;

    const user: User = {
        id: data.id,
        username: data.username,
        fullname: data.fullname,
        dob: null,
        email: null,
        address: null,
        avatar: data.avatar,
        roles: (data.roles || []) as Permission[],
    };

    return user;
}

export async function registerUser(req: RegisterRequest): Promise<NextResponse<ApiResponse<null>>> {
    const { username, password, confirm_password, fullname } = req;

    if (!username || !password || !confirm_password || !fullname) throw new AppError('Missing required fields');

    if (password !== confirm_password) throw new AppError('Password confirmation does not match');

    const supabase = await createClient();
    const passwordHash = await hashPassword(password);

    const user: Omit<User, 'id'> & {
        password_hash: string,
    } = {
        username,
        fullname,
        password_hash: passwordHash,
        dob: null,
        email: null,
        avatar: null,
        address: null,
        roles: [Permission.USER_READ],
    }

    const { error } = await supabase.from('users').insert(user);

    if(error) throw new AppError(error.message);
    
    return successResponse('Register successfully!', null);
}