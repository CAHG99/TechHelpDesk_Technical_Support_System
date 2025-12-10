"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ticket_entity_1 = require("./entities/ticket.entity");
const ticket_service_1 = require("./ticket.service");
const ticket_controller_1 = require("./ticket.controller");
const ticket_state_manager_1 = require("./state/ticket-state-manager");
const user_entity_1 = require("../user/entities/user.entity");
const category_entity_1 = require("../category/entities/category.entity");
const client_entity_1 = require("../client/entities/client.entity");
const technician_entity_1 = require("../technician/entities/technician.entity");
let TicketModule = class TicketModule {
};
exports.TicketModule = TicketModule;
exports.TicketModule = TicketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ticket_entity_1.Ticket, user_entity_1.User, category_entity_1.Category, client_entity_1.Client, technician_entity_1.Technician]),
        ],
        controllers: [ticket_controller_1.TicketController],
        providers: [ticket_service_1.TicketService, ticket_state_manager_1.TicketStateManager],
    })
], TicketModule);
//# sourceMappingURL=ticket.module.js.map