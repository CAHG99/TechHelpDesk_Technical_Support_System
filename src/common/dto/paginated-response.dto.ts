import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
    @ApiProperty({ description: 'Array of items for current page' })
    data: T[];

    @ApiProperty({ description: 'Total number of items' })
    total: number;

    @ApiProperty({ description: 'Number of items per page' })
    limit: number;

    @ApiProperty({ description: 'Number of items skipped' })
    offset: number;

    @ApiProperty({ description: 'Whether there are more items' })
    hasMore: boolean;

    constructor(data: T[], total: number, limit: number, offset: number) {
        this.data = data;
        this.total = total;
        this.limit = limit;
        this.offset = offset;
        this.hasMore = offset + data.length < total;
    }
}
