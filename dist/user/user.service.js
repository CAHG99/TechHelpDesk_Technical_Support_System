"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const response_user_dto_1 = require("./dto/response-user.dto");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const role_entity_1 = require("../role/entities/role.entity");
const paginated_response_dto_1 = require("../common/dto/paginated-response.dto");
let UserService = UserService_1 = class UserService {
    userRepository;
    roleRepository;
    logger = new common_1.Logger(UserService_1.name);
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async create(createUserDto) {
        this.logger.log(`Creating new user: ${createUserDto.email}`);
        const role = await this.roleRepository.findOne({
            where: { id: createUserDto.roleId },
        });
        if (!role) {
            this.logger.warn(`Role not found: ${createUserDto.roleId}`);
            throw new common_1.BadRequestException("Role does not exist");
        }
        const exists = await this.userRepository.findOne({
            where: [{ email: createUserDto.email }],
        });
        if (exists) {
            this.logger.warn(`Email already registered: ${createUserDto.email}`);
            throw new common_1.BadRequestException("Email or username already registered");
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
            role,
        });
        const savedUser = await this.userRepository.save(user);
        this.logger.log(`User created successfully: ID=${savedUser.id}, email=${savedUser.email}`);
        return (0, class_transformer_1.plainToInstance)(response_user_dto_1.ResponseUserDto, savedUser, {
            excludeExtraneousValues: true,
        });
    }
    async findByEmail(email) {
        return this.userRepository.findOne({
            where: { email },
            relations: ['role'],
        });
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ["role"],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return (0, class_transformer_1.plainToInstance)(response_user_dto_1.ResponseUserDto, user, {
            excludeExtraneousValues: true,
        });
    }
    async findAll(paginationDto) {
        this.logger.log('Fetching all users with pagination');
        const { limit = 10, offset = 0 } = paginationDto || {};
        const [users, total] = await this.userRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['role'],
            order: { createdAt: 'DESC' },
        });
        const data = (0, class_transformer_1.plainToInstance)(response_user_dto_1.ResponseUserDto, users, { excludeExtraneousValues: true });
        this.logger.log(`Returned ${data.length} users out of ${total} total`);
        return new paginated_response_dto_1.PaginatedResponseDto(data, total, limit, offset);
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        await this.userRepository.update(id, updateUserDto);
        const updatedUser = await this.userRepository.findOneBy({ id });
        return (0, class_transformer_1.plainToInstance)(response_user_dto_1.ResponseUserDto, updatedUser, {
            excludeExtraneousValues: true,
        });
    }
    async remove(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        await this.userRepository.softDelete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map