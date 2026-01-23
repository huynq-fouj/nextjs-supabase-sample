export default function Background() {

    return (
        <div className="fixed top-0 left-0 h-lvh w-lvw z-0">
            <div className="relative size-full">
                <div className="absolute rounded-full size-80 bg-amber-400 shadow-2xl blur-3xl opacity-70 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute rounded-full size-32 bg-pink-400 shadow-2xl blur-3xl opacity-70 -right-3 -top-3"></div>
                <div className="absolute rounded-full size-96 bg-sky-400 shadow-2xl blur-3xl opacity-70 -right-16 -bottom-16"></div>
            </div>
        </div>
    )
}