import { findUserById } from '@/app/_services/user/user.service';
import { createRoutes } from '@/app/_shared/libs/api-handler';

export const { GET } = createRoutes({
    GET: async (_, { user }) => {
        return findUserById(user?.userId!);
    }
}, {
    authenticated: true,
});