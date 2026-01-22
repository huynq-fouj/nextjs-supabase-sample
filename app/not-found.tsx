'use client'

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
    useEffect(() => {
        const t = setTimeout(() => redirect('/'), 1500);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="w-full h-lvh flex flex-col gap-4 items-center justify-center">
            <span className="text-9xl font-bold">404</span>
            <span>PAGE NOT FOUND. REDIRECTING...</span>
        </div>
    );
}
