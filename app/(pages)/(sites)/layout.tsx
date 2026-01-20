import { ReactNode } from "react";

export default function SitesLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div>
            {children}
        </div>
    )
}