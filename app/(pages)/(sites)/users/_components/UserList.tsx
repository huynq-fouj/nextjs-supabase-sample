'use client';

import useUsers from "@/app/_shared/hooks/useUsers";

export default function UserList() {
    const { users, loading, count, keyword, page, setKeyword, setPage } = useUsers();

    return (
        <>{
            users.map(u => <div>{u.fullname}</div>)
        }</>
    )
}