import { http } from "@/app/_utils/helpers/http";
import { ApiResponse, SearchUserRequest, User } from "../../types";

export async function getCurrentUserInfo(): Promise<ApiResponse<User>> {
    return http.get<ApiResponse<User>>('/api/users/me');
}

export async function getUsers({ keyword, page, size }: SearchUserRequest): Promise<ApiResponse<User[]>> {
    return http.get<ApiResponse<User[]>>('/api/users', {
        params: {
            keyword,
            page,
            size
        }
    });
}

export async function getUserDetail(id: string): Promise<ApiResponse<User>> {
  return http.get<ApiResponse<User>>(`/api/users/${id}`);
}