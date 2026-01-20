import { apiHandler, createRoutes } from '@/app/shared/libs/api-handler';
import { NextRequest, NextResponse } from "next/server"

type Params = {
    params: {
        id: string;
    }
}

export const { POST } = createRoutes({
  POST: async (req: NextRequest) => {
    const body = await req.json();
    
    return NextResponse.json({ success: true, data: null });
  }
});