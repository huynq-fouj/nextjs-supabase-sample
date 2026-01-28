'use client'

import { AuthenticationRequest } from "@/app/_shared/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AuthenticationRequest>();
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: AuthenticationRequest) => {
        setError(null);

        const res = await fetch('/api/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            setError('Invalid username or password');
            return;
        }

        router.push('/');

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4 items-center py-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">LOGIN</h2>
            <div className="w-80">
                <label htmlFor="username" className="text-sm mb-2 text-gray-900 font-bold">Username<span className="text-red-500">*</span></label>
                <input
                    type="text"
                    className="w-full rounded-lg focus:outline-none text-sm text-gray-900 border border-gray-300 px-4 py-2 h-9 hover:border-gray-900 focus:border-gray-900 transition-all"
                    placeholder="Enter username"
                    id="username"
                    {...register('username', { required: 'Username is required' })}
                />
                {errors.username && (
                    <p className="text-xs text-red-500 mt-1">
                        {errors.username.message}
                    </p>
                )}
            </div>
            <div className="w-80">
                <label htmlFor="password" className="text-sm mb-2 text-gray-900 font-bold">Password</label>
                <input
                    type="password"
                    className="w-full rounded-lg focus:outline-none text-sm text-gray-900 border border-gray-300 px-4 py-2 h-9 hover:border-gray-900 focus:border-gray-900 transition-all"
                    placeholder="Enter password"
                    id="password"
                    {...register('password', { required: 'Password is required' })}
                />
                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}
            </div>
            <button type="submit" disabled={isSubmitting} className="mt-5 w-80 bg-gray-900 text-gray-50 font-bold text-sm h-9 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-60">
                {isSubmitting ? 'Logging in...' : 'LOGIN'}
            </button>
            <Link href={'/register'} className="text-sky-500 text-sm hover:underline hover:text-sky-700 transition-all">Register</Link>
        </form>
    )
}