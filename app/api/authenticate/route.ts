import { authenticate } from "@/app/services/_auth/auth.service";
import { createRoutes } from "@/app/shared/libs/api-handler";
import { NextRequest } from "next/server";

export const { POST } = createRoutes({
  POST: async (req: NextRequest) => {
    const authReq = await req.json();
    const response = await authenticate(authReq);
    return response;
  }
});