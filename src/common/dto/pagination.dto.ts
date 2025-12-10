import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
    @ApiPropertyOptional({
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Number of items per page',
    })
    @IsOptional()
    @IsPositive()
    @Max(100)
    @Type(() => Number)
    limit?: number = 10;

    @ApiPropertyOptional({
        minimum: 0,
        default: 0,
        description: 'Number of items to skip',
    })
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number = 0;
}
