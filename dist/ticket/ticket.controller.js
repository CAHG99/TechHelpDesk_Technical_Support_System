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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const ticket_service_1 = require("./ticket.service");
const create_ticket_dto_1 = require("./dto/create-ticket.dto");
const update_ticket_status_dto_1 = require("./dto/update-ticket-status-dto");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const swagger_1 = require("@nestjs/swagger");
let TicketController = class TicketController {
    ticketService;
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    create(dto) {
        return this.ticketService.create(dto);
    }
    updateStatus(id, dto) {
        return this.ticketService.updateStatus(id, dto);
    }
    findByClient(id) {
        return this.ticketService.findByClient(id);
    }
    findByTechnician(id) {
        return this.ticketService.findByTechnician(id);
    }
    findOne(id) {
        return this.ticketService.findOne(id);
    }
    findAll(paginationDto) {
        return this.ticketService.findAll(paginationDto);
    }
};
exports.TicketController = TicketController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "technician"),
    (0, common_1.Patch)(":id/status"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_ticket_status_dto_1.UpdateTicketStatusDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)("client/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "findByClient", null);
__decorate([
    (0, common_1.Get)("technician/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "findByTechnician", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "findAll", null);
exports.TicketController = TicketController = __decorate([
    (0, swagger_1.ApiTags)("Tickets"),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), roles_guard_1.RolesGuard),
    (0, common_1.Controller)("tickets"),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
//# sourceMappingURL=ticket.controller.js.map