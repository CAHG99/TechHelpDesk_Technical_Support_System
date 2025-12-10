import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResponseCategoryDto } from './dto/response-category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    private readonly logger;
    constructor(categoryRepository: Repository<Category>);
    create(dto: CreateCategoryDto): Promise<ResponseCategoryDto>;
    findAll(): Promise<ResponseCategoryDto[]>;
    findOne(id: number): Promise<ResponseCategoryDto>;
    update(id: number, dto: UpdateCategoryDto): Promise<ResponseCategoryDto>;
    remove(id: number): Promise<void>;
}
