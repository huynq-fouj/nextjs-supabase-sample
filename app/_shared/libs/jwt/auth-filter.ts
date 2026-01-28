import 'server-only';
import { AppError } from '@/app/_shared/errors/AppError';
import { verifyToken } from './jwt';
import { Permission } from '@/app/_shared/enums/permission.enum';
import { cookies } from 'next/headers';

export async function filter(roles?: Permission[]) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) throw new AppError('Authentication required', 401);

    const payload = await verifyToken(token);
    if (!payload) throw new AppError('Invalid or expired token', 401);

    if (roles?.length) {
        const userRoles = new Set(payload.roles);
        const allowed = roles.every(p => userRoles.has(p));
        if (!allowed) throw new AppError('Forbidden', 403);
    }

    return payload;
}