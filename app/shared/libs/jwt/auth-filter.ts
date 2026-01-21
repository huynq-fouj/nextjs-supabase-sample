import 'server-only';
import { AppError } from '@/app/shared/_errors/AppError';
import { verifyToken } from './jwt';
import { Permission } from '@/app/shared/_enums/Permission.enum';

export async function filter(req: Request, roles?: Permission[]) {
    const authHeader = req.headers.get('authorization');

    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
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