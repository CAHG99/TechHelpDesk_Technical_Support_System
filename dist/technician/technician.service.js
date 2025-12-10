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
var TechnicianService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicianService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const technician_entity_1 = require("./entities/technician.entity");
const response_technician_dto_1 = require("./dto/response-technician.dto");
const class_transformer_1 = require("class-transformer");
const paginated_response_dto_1 = require("../common/dto/paginated-response.dto");
let TechnicianService = TechnicianService_1 = class TechnicianService {
    technicianRepository;
    logger = new common_1.Logger(TechnicianService_1.name);
    constructor(technicianRepository) {
        this.technicianRepository = technicianRepository;
    }
    async create(dto) {
        const technician = this.technicianRepository.create({
            ...dto,
            isActive: true,
        });
        const saved = await this.technicianRepository.save(technician);
        return (0, class_transformer_1.plainToInstance)(response_technician_dto_1.ResponseTechnicianDto, saved, {
            excludeExtraneousValues: true,
        });
    }
    async findAll(paginationDto) {
        this.logger.log('Fetching all technicians with pagination');
        const { limit = 10, offset = 0 } = paginationDto || {};
        const [technicians, total] = await this.technicianRepository.findAndCount({
            take: limit,
            skip: offset,
            order: { name: 'ASC' },
        });
        const data = (0, class_transformer_1.plainToInstance)(response_technician_dto_1.ResponseTechnicianDto, technicians, { excludeExtraneousValues: true });
        this.logger.log(`Returned ${data.length} technicians out of ${total} total`);
        return new paginated_response_dto_1.PaginatedResponseDto(data, total, limit, offset);
    }
    async findOne(id) {
        const technician = await this.technicianRepository.findOne({ where: { id } });
        if (!technician)
            throw new common_1.NotFoundException("Técnico no encontrado");
        return (0, class_transformer_1.plainToInstance)(response_technician_dto_1.ResponseTechnicianDto, technician, {
            excludeExtraneousValues: true,
        });
    }
    async update(id, dto) {
        const technician = await this.technicianRepository.findOne({ where: { id } });
        if (!technician)
            throw new common_1.NotFoundException("Técnico no encontrado");
        Object.assign(technician, dto);
        const updated = await this.technicianRepository.save(technician);
        return (0, class_transformer_1.plainToInstance)(response_technician_dto_1.ResponseTechnicianDto, updated, {
            excludeExtraneousValues: true,
        });
    }
    async remove(id) {
        const technician = await this.technicianRepository.findOne({ where: { id } });
        if (!technician)
            throw new common_1.NotFoundException("Técnico no encontrado");
        await this.technicianRepository.remove(technician);
        return { message: "Técnico eliminado correctamente" };
    }
};
exports.TechnicianService = TechnicianService;
exports.TechnicianService = TechnicianService = TechnicianService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(technician_entity_1.Technician)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TechnicianService);
//# sourceMappingURL=technician.service.js.map