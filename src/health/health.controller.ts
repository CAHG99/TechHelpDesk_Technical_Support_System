import { Controller, Get } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckService,
    TypeOrmHealthIndicator,
    MemoryHealthIndicator,
    DiskHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
        private memory: MemoryHealthIndicator,
        private disk: DiskHealthIndicator,
    ) { }

    @Get()
    @HealthCheck()
    @ApiOperation({ summary: 'Check application health status' })
    @ApiResponse({ status: 200, description: 'Health check passed' })
    @ApiResponse({ status: 503, description: 'Health check failed' })
    check() {
        return this.health.check([
            // Database health
            () => this.db.pingCheck('database'),

            // Memory health (heap should not exceed 150MB)
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),

            // Disk health (storage should have at least 50% free)
            () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
        ]);
    }
}
