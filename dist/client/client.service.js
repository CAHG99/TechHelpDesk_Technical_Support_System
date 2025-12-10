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
var ClientService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./entities/client.entity");
const response_client_dto_1 = require("./dto/response-client.dto");
const class_transformer_1 = require("class-transformer");
const paginated_response_dto_1 = require("../common/dto/paginated-response.dto");
let ClientService = ClientService_1 = class ClientService {
    clientRepository;
    logger = new common_1.Logger(ClientService_1.name);
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async create(dto) {
        const client = this.clientRepository.create({
            ...dto,
            isActive: true,
        });
        const saved = await this.clientRepository.save(client);
        return (0, class_transformer_1.plainToInstance)(response_client_dto_1.ResponseClientDto, saved, {
            excludeExtraneousValues: true,
        });
    }
    async findAll(paginationDto) {
        this.logger.log('Fetching all clients with pagination');
        const { limit = 10, offset = 0 } = paginationDto || {};
        const [clients, total] = await this.clientRepository.findAndCount({
            take: limit,
            skip: offset,
            order: { name: 'ASC' },
        });
        const data = (0, class_transformer_1.plainToInstance)(response_client_dto_1.ResponseClientDto, clients, { excludeExtraneousValues: true });
        this.logger.log(`Returned ${data.length} clients out of ${total} total`);
        return new paginated_response_dto_1.PaginatedResponseDto(data, total, limit, offset);
    }
    async findOne(id) {
        const client = await this.clientRepository.findOne({ where: { id } });
        if (!client)
            throw new common_1.NotFoundException("Cliente no encontrado");
        return (0, class_transformer_1.plainToInstance)(response_client_dto_1.ResponseClientDto, client, {
            excludeExtraneousValues: true,
        });
    }
    async update(id, dto) {
        const client = await this.clientRepository.findOne({ where: { id } });
        if (!client)
            throw new common_1.NotFoundException("Cliente no encontrado");
        Object.assign(client, dto);
        const updated = await this.clientRepository.save(client);
        return (0, class_transformer_1.plainToInstance)(response_client_dto_1.ResponseClientDto, updated, {
            excludeExtraneousValues: true,
        });
    }
    async remove(id) {
        const client = await this.clientRepository.findOne({ where: { id } });
        if (!client)
            throw new common_1.NotFoundException("Cliente no encontrado");
        await this.clientRepository.remove(client);
        return { message: "Cliente eliminado correctamente" };
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = ClientService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientService);
//# sourceMappingURL=client.service.js.map