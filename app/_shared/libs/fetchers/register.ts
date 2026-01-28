import { http } from "@/app/_utils/helpers/http";
import { ApiResponse } from "../../types"
import { RegisterRequest } from "../../types/register"

export async function registerFetcher(
  url: string,
  { arg }: { arg: RegisterRequest }
): Promise<ApiResponse<null>> {
  return http.post<ApiResponse<null>>(url, arg);
}
