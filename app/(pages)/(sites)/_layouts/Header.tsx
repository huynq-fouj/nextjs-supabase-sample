import Image from 'next/image';

export default function Header() {
    return (
        <header className="absolute left-0 top-0 border-b border-gray-300 w-full h-12">
            <nav className="flex items-center justify-end h-full gap-3 px-4">
                <div className="flex items-center gap-4">
                    <span className="text-gray-900">Admin</span>
                    <Image
                        src="/images/profile-default.jpg"
                        alt="User avatar"
                        width={36}
                        height={36}
                        className="rounded-full border border-gray-300"
                    />
                </div>
            </nav>
        </header>
    )
}