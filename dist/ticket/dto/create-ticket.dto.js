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
exports.CreateTicketDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const ticket_entity_1 = require("../entities/ticket.entity");
class CreateTicketDto {
    title;
    description;
    status;
    priority;
    customerId;
    technicianId;
    categoryId;
    clientId;
    technicianExternalId;
}
exports.CreateTicketDto = CreateTicketDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Título del ticket que describe el problema',
        example: 'Impresora no funciona',
        minLength: 5,
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripción detallada del problema',
        example: 'La impresora HP LaserJet 1102w no imprime. La luz roja parpadea constantemente.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Estado inicial del ticket',
        enum: ticket_entity_1.TicketStatus,
        default: ticket_entity_1.TicketStatus.OPEN,
        example: ticket_entity_1.TicketStatus.OPEN,
    }),
    (0, class_validator_1.IsEnum)(ticket_entity_1.TicketStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Prioridad del ticket',
        enum: ticket_entity_1.TicketPriority,
        default: ticket_entity_1.TicketPriority.MEDIUM,
        example: ticket_entity_1.TicketPriority.HIGH,
    }),
    (0, class_validator_1.IsEnum)(ticket_entity_1.TicketPriority),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del usuario que reporta el problema',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTicketDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID del técnico interno asignado',
        example: 5,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTicketDto.prototype, "technicianId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la categoría del ticket',
        example: 2,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTicketDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del cliente asociado',
        example: 3,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTicketDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID del técnico externo asignado',
        example: 10,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTicketDto.prototype, "technicianExternalId", void 0);
//# sourceMappingURL=create-ticket.dto.js.map