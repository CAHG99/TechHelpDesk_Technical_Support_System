import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ResponseCategoryDto } from "./dto/response-category.dto";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(dto: CreateCategoryDto): Promise<ResponseCategoryDto>;
    findAll(): Promise<ResponseCategoryDto[]>;
    findOne(id: number): Promise<ResponseCategoryDto>;
    update(id: number, dto: UpdateCategoryDto): Promise<ResponseCategoryDto>;
    remove(id: number): Promise<void>;
}
