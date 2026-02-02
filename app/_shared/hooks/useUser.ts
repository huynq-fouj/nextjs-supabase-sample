'use client';

import useSWR from "swr";
import { ApiResponse, User } from "../types";
import { getCurrentUserInfo } from "../libs/fetchers/user";

export function useUser() {

    const { data, error, isLoading, mutate } = useSWR<ApiResponse<User>>(
        '/api/users/me',
        getCurrentUserInfo,
        {
            revalidateOnFocus: false,
            dedupingInterval: 60_000,
        }
    );

    return {
        user: data?.data,
        error,
        isLoading,
        mutate
    }
}