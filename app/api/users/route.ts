import { createRoutes } from '@/app/_shared/libs/api-handler';
import { NextRequest, NextResponse } from 'next/server';

export const { POST } = createRoutes({
  POST: async (req: NextRequest) => {
    const body = await req.json();
    
    return NextResponse.json({ success: true, data: null });
  }
});