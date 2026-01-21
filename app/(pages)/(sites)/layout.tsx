import { ReactNode } from "react";
import Sidebar from "./_layouts/Sidebar";
import Footer from "./_layouts/Footer";
import Header from "./_layouts/Header";

export default function SitesLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="grow min-w-0 pt-12 flex flex-col min-h-lvh relative">
                <Header />
                <main className="p-3">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    )
}