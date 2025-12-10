export declare class PaginatedResponseDto<T> {
    data: T[];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
    constructor(data: T[], total: number, limit: number, offset: number);
}
