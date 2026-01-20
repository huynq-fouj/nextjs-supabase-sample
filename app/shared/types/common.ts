export type ApiResponse<T> = {
    message: string;
    code: number;
    status: boolean;
    data: T;
    count: number | null;
};