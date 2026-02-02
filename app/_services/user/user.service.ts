import 'server-only'
import { ApiResponse, CreateUserRequest, SearchUserRequest, User } from "@/app/_shared/types";
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

export async function createUser(req: CreateUserRequest): Promise<NextResponse<ApiResponse<null>>> {
    const { username, password, confirm_password, fullname, dob, email, address, roles } = req;

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
        dob,
        email,
        avatar: null,
        address,
        roles,
    }

    const { error } = await supabase.from('users').insert(user);

    if(error) throw new AppError(error.message);
    
    return successResponse('Create user successfully!', null, 201);
}

export async function findUserById(id: string): Promise<NextResponse<ApiResponse<User>>> {
    if(!id) throw new AppError('Invalid user id!');

    const supabase = await createClient();
    const { data, error } = await supabase.from('users')
    .select(
    `
        id,
        username,
        fullname,
        avatar,
        roles,
        dob,
        email,
        address
    `
    ).eq('id', id).single();

    if (error) throw new AppError(error.message);

    if(!data) throw new AppError('User not found!', 404);

    const user: User = {
        id: data.id,
        username: data.username,
        fullname: data.fullname,
        dob: data.dob,
        email: data.email,
        address: data.address,
        avatar: data.avatar,
        roles: (data.roles || []) as Permission[],
    };

    return successResponse('Get user info successfully!', user);
}

export async function getUser(params: SearchUserRequest): Promise<NextResponse<ApiResponse<User[]>>> {
    const { keyword = '', page = 0, size = 10 } = params;

    const supabase = await createClient();

    let query = supabase.from('users').select(
      `
        id,
        username,
        fullname,
        avatar,
        roles,
        dob,
        email,
        address
      `,
      { count: 'exact' }
    ).neq('username', 'admin');;

    if (keyword) {
        query = query.or(
        `username.ilike.%${keyword}%,fullname.ilike.%${keyword}%,email.ilike.%${keyword}%`
        );
    }

    const from = page * size;
    const to = from + size - 1;

    const { data, error, count } = await query.range(from, to);

    if (error) {
        throw new AppError(error.message);
    }

    const users: User[] =
        data?.map((item) => ({
        id: item.id,
        username: item.username,
        fullname: item.fullname,
        dob: item.dob,
        email: item.email,
        address: item.address,
        avatar: item.avatar,
        roles: (item.roles || []) as Permission[],
        })) ?? [];

    return successResponse('Get users successfully!', users, 200, count!);
}