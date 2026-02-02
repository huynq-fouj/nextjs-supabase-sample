import { getUser } from '@/app/_services/user/user.service';
import { Permission } from '@/app/_shared/enums/permission.enum';
import { createRoutes } from '@/app/_shared/libs/api-handler';
import { NextRequest, NextResponse } from 'next/server';

export const { POST } = createRoutes({
  POST: async (req: NextRequest) => {
    const body = await req.json();
    
    return NextResponse.json({ success: true, data: null });
  }
});

export const { GET } = createRoutes({
  GET: async (req) => {
    const params = req.nextUrl.searchParams;
    const keyword = params.get('keyword');
    const page = params.get('page');
    const size = params.get('size');
    return getUser({
      keyword: keyword ?? '',
      page: parseInt(page ?? '0'),
      size: parseInt(size ?? '0')
    });
  }
}, {
  withRoles: [Permission.USER_READ],
});