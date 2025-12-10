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
var RoleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
const response_role_dto_1 = require("./dto/response-role.dto");
const class_transformer_1 = require("class-transformer");
const paginated_response_dto_1 = require("../common/dto/paginated-response.dto");
let RoleService = RoleService_1 = class RoleService {
    roleRepository;
    logger = new common_1.Logger(RoleService_1.name);
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async create(dto) {
        const exists = await this.roleRepository.findOne({
            where: { name: dto.name },
        });
        if (exists) {
            throw new common_1.BadRequestException("El rol ya existe");
        }
        const role = this.roleRepository.create(dto);
        const saved = await this.roleRepository.save(role);
        return (0, class_transformer_1.plainToInstance)(response_role_dto_1.ResponseRoleDto, saved, {
            excludeExtraneousValues: true,
        });
    }
    async findAll(paginationDto) {
        this.logger.log('Fetching all roles with pagination');
        const { limit = 10, offset = 0 } = paginationDto || {};
        const [roles, total] = await this.roleRepository.findAndCount({
            take: limit,
            skip: offset,
            order: { name: 'ASC' },
        });
        const data = (0, class_transformer_1.plainToInstance)(response_role_dto_1.ResponseRoleDto, roles, { excludeExtraneousValues: true });
        this.logger.log(`Returned ${data.length} roles out of ${total} total`);
        return new paginated_response_dto_1.PaginatedResponseDto(data, total, limit, offset);
    }
    async findOne(id) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException("Rol no encontrado");
        }
        return (0, class_transformer_1.plainToInstance)(response_role_dto_1.ResponseRoleDto, role, {
            excludeExtraneousValues: true,
        });
    }
    async findByName(name) {
        return this.roleRepository.findOne({ where: { name } });
    }
    async update(id, dto) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException("Rol no encontrado");
        }
        await this.roleRepository.update(id, dto);
        const updated = await this.roleRepository.findOne({ where: { id } });
        return (0, class_transformer_1.plainToInstance)(response_role_dto_1.ResponseRoleDto, updated, {
            excludeExtraneousValues: true,
        });
    }
    async remove(id) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException("Rol no encontrado");
        }
        await this.roleRepository.softDelete(id);
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = RoleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleService);
//# sourceMappingURL=role.service.js.map