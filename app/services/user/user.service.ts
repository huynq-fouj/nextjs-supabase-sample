import 'server-only'
import { User } from "@/app/shared/types";

export async function findUserByCredentials(u: string, p: string): Promise<User | null> {
    if (u === 'admin' && p === '123') {
        return {
            id: '1',
            username: u,
            fullname: 'Admin User',
            roles: ['ADMIN'],
            dob: null,
            email: null,
            address: null,
            avatar: null,
        };
    }
    return null;
}