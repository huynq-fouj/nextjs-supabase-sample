import { http } from "@/app/_utils/helpers/http";
import { ApiResponse, User } from "../../types";

export async function getCurrentUserInfo(): Promise<ApiResponse<User>> {
    return http.get<ApiResponse<User>>('/api/users/me');
}