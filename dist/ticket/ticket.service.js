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
var TicketService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("./entities/ticket.entity");
const response_ticket_dto_1 = require("./dto/response-ticket.dto");
const user_entity_1 = require("../user/entities/user.entity");
const category_entity_1 = require("../category/entities/category.entity");
const client_entity_1 = require("../client/entities/client.entity");
const technician_entity_1 = require("../technician/entities/technician.entity");
const class_transformer_1 = require("class-transformer");
let TicketService = TicketService_1 = class TicketService {
    ticketRepo;
    userRepo;
    categoryRepo;
    clientRepo;
    technicianRepo;
    logger = new common_1.Logger(TicketService_1.name);
    constructor(ticketRepo, userRepo, categoryRepo, clientRepo, technicianRepo) {
        this.ticketRepo = ticketRepo;
        this.userRepo = userRepo;
        this.categoryRepo = categoryRepo;
        this.clientRepo = clientRepo;
        this.technicianRepo = technicianRepo;
    }
    validTransitions = {
        [ticket_entity_1.TicketStatus.OPEN]: [ticket_entity_1.TicketStatus.IN_PROGRESS],
        [ticket_entity_1.TicketStatus.IN_PROGRESS]: [ticket_entity_1.TicketStatus.RESOLVED],
        [ticket_entity_1.TicketStatus.RESOLVED]: [ticket_entity_1.TicketStatus.CLOSED],
        [ticket_entity_1.TicketStatus.CLOSED]: [],
    };
    async validateTechnicianLoad(technicianId) {
        const count = await this.ticketRepo.count({
            where: {
                technician: { id: technicianId },
                status: ticket_entity_1.TicketStatus.IN_PROGRESS,
            },
        });
        if (count >= 5) {
            throw new common_1.BadRequestException('The technician already has 5 tickets in progress');
        }
    }
    async create(dto) {
        const customer = await this.userRepo.findOne({ where: { id: dto.customerId } });
        if (!customer)
            throw new common_1.BadRequestException('Invalid customer (user)');
        const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
        if (!category)
            throw new common_1.BadRequestException('Invalid category');
        const client = await this.clientRepo.findOne({ where: { id: dto.clientId } });
        if (!client)
            throw new common_1.BadRequestException('Invalid business client');
        let technician = null;
        if (dto.technicianId) {
            technician = await this.userRepo.findOne({ where: { id: dto.technicianId } });
            if (!technician)
                throw new common_1.BadRequestException('Invalid internal technician');
            await this.validateTechnicianLoad(dto.technicianId);
        }
        let technicianExternal = null;
        if (dto.technicianExternalId) {
            technicianExternal = await this.technicianRepo.findOne({ where: { id: dto.technicianExternalId } });
            if (!technicianExternal)
                throw new common_1.BadRequestException('Invalid external technician');
        }
        const ticketData = {
            title: dto.title,
            description: dto.description,
            status: ticket_entity_1.TicketStatus.OPEN,
            priority: dto.priority ?? ticket_entity_1.TicketPriority.MEDIUM,
            customer: customer ?? undefined,
            technician: technician ?? undefined,
            category,
            client,
            technicianExternal: technicianExternal ?? undefined,
            isActive: true,
        };
        const ticket = this.ticketRepo.create(ticketData);
        const saved = await this.ticketRepo.save(ticket);
        return (0, class_transformer_1.plainToInstance)(response_ticket_dto_1.ResponseTicketDto, saved, { excludeExtraneousValues: true });
    }
    async updateStatus(id, dto) {
        const ticket = await this.ticketRepo.findOne({ where: { id } });
        if (!ticket)
            throw new common_1.NotFoundException('Ticket not found');
        const allowed = this.validTransitions[ticket.status];
        if (!allowed.includes(dto.status)) {
            throw new common_1.BadRequestException(`Invalid transition: ${ticket.status} → ${dto.status}`);
        }
        if (dto.status === ticket_entity_1.TicketStatus.IN_PROGRESS && ticket.technician) {
            await this.validateTechnicianLoad(ticket.technician.id);
        }
        ticket.status = dto.status;
        const updated = await this.ticketRepo.save(ticket);
        return (0, class_transformer_1.plainToInstance)(response_ticket_dto_1.ResponseTicketDto, updated, { excludeExtraneousValues: true });
    }
    async findByClient(id) {
        const tickets = await this.ticketRepo.find({
            where: { customer: { id } },
        });
        return (0, class_transformer_1.plainToInstance)(response_ticket_dto_1.ResponseTicketDto, tickets, { excludeExtraneousValues: true });
    }
    async findByTechnician(id) {
        const tickets = await this.ticketRepo.find({
            where: { technician: { id } },
        });
        return (0, class_transformer_1.plainToInstance)(response_ticket_dto_1.ResponseTicketDto, tickets, { excludeExtraneousValues: true });
    }
    async findOne(id) {
        const ticket = await this.ticketRepo.findOne({ where: { id } });
        if (!ticket)
            throw new common_1.NotFoundException('Ticket not found');
        return (0, class_transformer_1.plainToInstance)(response_ticket_dto_1.ResponseTicketDto, ticket, { excludeExtraneousValues: true });
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto || {};
        const [tickets, total] = await this.ticketRepo.findAndCount({
            take: limit,
            skip: offset,
            order: { createdAt: 'DESC' },
        });
        const data = (0, class_transformer_1.plainToInstance)(response_ticket_dto_1.ResponseTicketDto, tickets, { excludeExtraneousValues: true });
        return {
            data,
            total,
            limit,
            offset,
            hasMore: offset + data.length < total,
        };
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = TicketService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(3, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __param(4, (0, typeorm_1.InjectRepository)(technician_entity_1.Technician)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TicketService);
//# sourceMappingURL=ticket.service.js.map