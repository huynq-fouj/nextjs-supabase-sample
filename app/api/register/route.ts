import { createUser } from "@/app/_services/user/user.service";
import { Permission } from "@/app/_shared/enums/permission.enum";
import { createRoutes } from "@/app/_shared/libs/api-handler";
import { RegisterRequest } from "@/app/_shared/types";
import { NextRequest } from "next/server";

export const { POST } = createRoutes({
  POST: async (req: NextRequest) => {
    const registerReq = await req.json() as RegisterRequest;
    return createUser({
      ...registerReq,
      roles: [Permission.USER_READ],
      dob: null,
      avatar: null,
      address: null,
      email: null,
    });
  }
});