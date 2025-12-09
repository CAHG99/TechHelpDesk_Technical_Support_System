import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles('admin')
  @Post()
  @ApiCreatedResponse({ type: ResponseCategoryDto })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() dto: CreateCategoryDto): Promise<ResponseCategoryDto> {
    return this.categoryService.create(dto);
  }

  @Roles('admin')
  @Get()
  @ApiOkResponse({ type: ResponseCategoryDto, isArray: true })
  findAll(): Promise<ResponseCategoryDto[]> {
    return this.categoryService.findAll();
  }

  @Roles('admin')
  @Get(':id')
  @ApiOkResponse({ type: ResponseCategoryDto })
  @ApiNotFoundResponse({ description: 'Categoría no encontrada' })
  findOne(@Param('id') id: number): Promise<ResponseCategoryDto> {
    return this.categoryService.findOne(id);
  }

  @Roles('admin')
  @Patch(':id')
  @ApiOkResponse({ type: ResponseCategoryDto })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Roles('admin')
  @Delete(':id')
  @ApiOkResponse({ description: 'Categoría eliminada' })
  @ApiNotFoundResponse({ description: 'Categoría no encontrada' })
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
