import { ReactNode } from "react";
import Sidebar from "./_layouts/Sidebar";
import Footer from "./_layouts/Footer";
import Header from "./_layouts/Header";
import Background from "./_layouts/Background";

export default function SitesLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="relative">
            <Background />
            <div className="flex relative z-10">
                <Sidebar />
                <div className="grow min-w-0 pt-12 flex flex-col min-h-lvh relative">
                    <Header />
                    <main className="p-4">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}