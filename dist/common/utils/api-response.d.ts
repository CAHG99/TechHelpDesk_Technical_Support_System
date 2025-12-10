export interface ApiResponse<T> {
    success: boolean;
    timestamp: string;
    data: T;
}
export interface ApiErrorResponse {
    success: false;
    timestamp: string;
    path: string;
    method: string;
    statusCode: number;
    error: string | string[];
}
