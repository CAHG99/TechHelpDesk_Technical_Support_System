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
var CategoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const class_transformer_1 = require("class-transformer");
const response_category_dto_1 = require("./dto/response-category.dto");
let CategoryService = CategoryService_1 = class CategoryService {
    categoryRepository;
    logger = new common_1.Logger(CategoryService_1.name);
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(dto) {
        const category = this.categoryRepository.create(dto);
        await this.categoryRepository.save(category);
        return (0, class_transformer_1.plainToInstance)(response_category_dto_1.ResponseCategoryDto, category, {
            excludeExtraneousValues: true,
        });
    }
    async findAll() {
        const categories = await this.categoryRepository.find();
        return categories.map(cat => (0, class_transformer_1.plainToInstance)(response_category_dto_1.ResponseCategoryDto, cat, {
            excludeExtraneousValues: true,
        }));
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return (0, class_transformer_1.plainToInstance)(response_category_dto_1.ResponseCategoryDto, category, {
            excludeExtraneousValues: true,
        });
    }
    async update(id, dto) {
        const category = await this.categoryRepository.preload({
            id,
            ...dto,
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        await this.categoryRepository.save(category);
        return (0, class_transformer_1.plainToInstance)(response_category_dto_1.ResponseCategoryDto, category, {
            excludeExtraneousValues: true,
        });
    }
    async remove(id) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        await this.categoryRepository.remove(category);
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = CategoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map