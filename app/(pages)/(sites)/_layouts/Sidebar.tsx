'use client'
import { cn } from "@/app/_utils/helpers/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const linkClass = (href: string) => cn(
      'w-full rounded-md transition-all text-sm py-2 px-4 h-9 flex items-center',
      pathname === href || pathname.startsWith(href + '/')
        ? 'bg-gray-400/30 text-gray-900 font-medium'
        : 'text-gray-900 hover:bg-gray-400/30'
    );

    return (
        <aside className="h-lvh border-r border-gray-300 w-48 pt-12">
            <div className="flex flex-col gap-1 py-3 px-2 w-full">
                <Link href={'/'} className={linkClass('/')}>Dashboard</Link>
                <div className="w-full h-px bg-gray-300"></div>
                <Link href={'/users'} className={linkClass('/users')}>Users</Link>
                <div className="w-full h-px bg-gray-300"></div>
                <Link href={'/orders'} className={linkClass('/orders')}>Order</Link>
                <div className="w-full h-px bg-gray-300"></div>
                <Link href={'/settings'} className={linkClass('/settings')}>Settings</Link>
            </div>
        </aside>
    )
}