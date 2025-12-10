"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaginatedResponseDto {
    data;
    total;
    limit;
    offset;
    hasMore;
    constructor(data, total, limit, offset) {
        this.data = data;
        this.total = total;
        this.limit = limit;
        this.offset = offset;
        this.hasMore = offset + data.length < total;
    }
}
exports.PaginatedResponseDto = PaginatedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Array of items for current page' }),
    __metadata("design:type", Array)
], PaginatedResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of items' }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of items per page' }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of items skipped' }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether there are more items' }),
    __metadata("design:type", Boolean)
], PaginatedResponseDto.prototype, "hasMore", void 0);
//# sourceMappingURL=paginated-response.dto.js.map