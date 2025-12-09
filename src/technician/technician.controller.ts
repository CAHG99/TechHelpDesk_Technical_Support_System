import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResponseTechnicianDto } from './dto/response-technician.dto';

@ApiTags('Technicians')
@ApiBearerAuth('access-token')
@Controller('technicians')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class TechnicianController {
  constructor(private readonly technicianService: TechnicianService) {}

  @Post()
  @ApiCreatedResponse({ type: ResponseTechnicianDto })
  create(@Body() dto: CreateTechnicianDto) {
    return this.technicianService.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseTechnicianDto, isArray: true })
  findAll() {
    return this.technicianService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseTechnicianDto })
  @ApiNotFoundResponse({ description: 'Técnico no encontrado' })
  findOne(@Param('id') id: number) {
    return this.technicianService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseTechnicianDto })
  update(@Param('id') id: number, @Body() dto: UpdateTechnicianDto) {
    return this.technicianService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Técnico eliminado correctamente' })
  remove(@Param('id') id: number) {
    return this.technicianService.remove(id);
  }
}
