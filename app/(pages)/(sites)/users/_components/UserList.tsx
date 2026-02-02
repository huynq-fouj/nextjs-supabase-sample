'use client';

import useUsers from "@/app/_shared/hooks/useUsers";
import { debounce, DebouncedFunc } from "lodash";
import { useState, useMemo, useEffect } from "react";

export default function UserList() {
    const { users, loading, count, page, setKeyword, setPage, size } = useUsers();

    const [key, setKey] = useState('')
    
    const debouncedSearch = useMemo(() => debounce((keyword) => {
        setPage(0);
        setKeyword(keyword);
    }, 500), [setKeyword, setPage]);

    useEffect(() => {
        debouncedSearch(key);
        return () => {
        debouncedSearch.cancel();
        };
    }, [key, debouncedSearch]);

    const changePage = (value: number) => {
        const newPage = page + value;
        if(newPage < 0 || newPage > count / size) return;
        setPage(newPage);
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-4 mb-4">
                <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Search..."
                    className="text-sm px-4 py-2 h-8 w-60 focus:outline-none border border-gray-300 hover:border-amber-400 transition-all focus:border-amber-400 rounded-md"
                />
            </div>
            <table className="w-full mb-4 text-sm">
                <thead>
                    <tr>
                        <th className="text-start">No.</th>
                        <th className="text-start">Full name</th>
                        <th className="text-start">Email</th>
                        <th className="text-start">Address</th>
                        <th className="text-start">Date of birth</th>
                        <th className="text-start">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, i) => <tr>
                        <td>{ page * size + i + 1 }</td>
                        <td>{ u.fullname }</td>
                        <td>{ u.email || '-' }</td>
                        <td>{ u.address || '-' }</td>
                        <td>{ u.dob || '-' }</td>
                        <td></td>
                    </tr>)}
                </tbody>
            </table>
            <div className="w-full flex justify-center">
                <button type="button" onClick={() => changePage(-1)}></button>
                <span>{ page + 1 }</span>
                <button type="button" onClick={() => changePage(1)}></button>
            </div>
        </div>
    )
}
