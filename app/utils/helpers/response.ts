import 'server-only';
import { ApiResponse } from "@/app/shared/types";
import { NextResponse } from 'next/server';

export function successResponse<T>(message: string, data: T, code: number = 200, count?: number): NextResponse<ApiResponse<T>> {
    return NextResponse.json({
        message,
        code,
        status: true,
        data,
        count
    }, { status: code })
}

export function errorResponse(message: string, code: number = 400, details?: any): NextResponse<ApiResponse<null>>  {
    return NextResponse.json({
        message,
        code,
        status: false,
        data: null,
        details,
    }, { status: code });
}