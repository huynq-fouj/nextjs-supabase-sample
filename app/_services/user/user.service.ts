import 'server-only'
import { User } from "@/app/_shared/types";
import { Permission } from '@/app/_shared/enums/permission.enum';

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