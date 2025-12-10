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
exports.ResponseTicketDto = void 0;
const class_transformer_1 = require("class-transformer");
class ResponseTicketDto {
    id;
    title;
    description;
    status;
    priority;
    category;
    customer;
    technician;
    client;
    technicianExternal;
    createdAt;
    updatedAt;
}
exports.ResponseTicketDto = ResponseTicketDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ResponseTicketDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseTicketDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseTicketDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseTicketDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseTicketDto.prototype, "priority", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ obj }) => obj.category?.name),
    __metadata("design:type", String)
], ResponseTicketDto.prototype, "category", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ obj }) => obj.customer?.name),
    __metadata("design:type", String)
], ResponseTicketDto.prototype, "customer", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ obj }) => obj.technician?.name),
    __metadata("design:type", String)
], ResponseTicketDto.prototype, "technician", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ obj }) => obj.client?.company),
    __metadata("design:type", String)
], ResponseTicketDto.prototype, "client", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ obj }) => obj.technicianExternal?.name),
    __metadata("design:type", String)
], ResponseTicketDto.prototype, "technicianExternal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? new Date(value).toLocaleDateString("es-CO") : null),
    __metadata("design:type", String)
], ResponseTicketDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? new Date(value).toLocaleDateString("es-CO") : null),
    __metadata("design:type", String)
], ResponseTicketDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=response-ticket.dto.js.map