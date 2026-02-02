import useSWR from "swr";
import { getUsers } from "../libs/fetchers/user";
import { useMemo, useState } from "react";

export default function useUsers() {
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const params = useMemo(
        () => ({ keyword, page, size }),
        [keyword, page, size]
    );

    const { data, error, isLoading, isValidating, mutate } = useSWR(
        ['/api/users', params],
        ([, params]) => getUsers(params),
        {
        revalidateOnFocus: false,
        }
    );

    return {
        users: data?.data ?? [],
        count: data?.count ?? 0,
        raw: data,
        loading: isLoading,
        validating: isValidating,
        error,
        refresh: mutate,

        keyword,
        setKeyword,
        page,
        setPage,
        size,
        setSize,
    };
}