import { registerUser } from "@/app/_services/user/user.service";
import { createRoutes } from "@/app/_shared/libs/api-handler";
import { NextRequest } from "next/server";

export const { POST } = createRoutes({
  POST: async (req: NextRequest) => {
    const registerReq = await req.json();
    return registerUser(registerReq);
  }
});