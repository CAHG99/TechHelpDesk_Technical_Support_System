import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseCategoryDto } from './dto/response-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<ResponseCategoryDto> {
    const category = this.categoryRepository.create(dto);
    await this.categoryRepository.save(category);

    return plainToInstance(ResponseCategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<ResponseCategoryDto[]> {
    const categories = await this.categoryRepository.find();

    return categories.map(cat =>
      plainToInstance(ResponseCategoryDto, cat, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findOne(id: number): Promise<ResponseCategoryDto> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) throw new NotFoundException('Category not found');

    return plainToInstance(ResponseCategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<ResponseCategoryDto> {
    const category = await this.categoryRepository.preload({
      id,
      ...dto,
    });

    if (!category) throw new NotFoundException('Category not found');

    await this.categoryRepository.save(category);

    return plainToInstance(ResponseCategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) throw new NotFoundException('Category not found');

    await this.categoryRepository.remove(category);
  }
}

