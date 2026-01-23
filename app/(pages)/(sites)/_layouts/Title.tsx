import { cn } from "@/app/_utils/helpers/cn";
import { ReactNode } from "react";

export default function Title({ children, className }: Readonly<{ children: ReactNode; className?: string }>) {
    return (
        <h3 className={cn("mb-4 text-2xl text-gray-900 font-bold uppercase", className)}>{ children }</h3>
    )
}