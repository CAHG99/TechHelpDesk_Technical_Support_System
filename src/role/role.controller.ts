import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseRoleDto } from './dto/response-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiCreatedResponse({ type: ResponseRoleDto })
  @ApiBadRequestResponse({ description: 'Rol duplicado o datos inválidos' })
  @Post()
  create(@Body() dto: CreateRoleDto): Promise<ResponseRoleDto> {
    return this.roleService.create(dto);
  }

  @Roles('admin')
  @ApiOkResponse({ type: ResponseRoleDto, isArray: true })
  @Get()
  findAll(): Promise<ResponseRoleDto[]> {
    return this.roleService.findAll();
  }

  @Roles('admin')
  @ApiOkResponse({ type: ResponseRoleDto })
  @ApiNotFoundResponse({ description: 'Rol no encontrado' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseRoleDto> {
    return this.roleService.findOne(id);
  }

  @Roles('admin')
  @ApiOkResponse({ type: ResponseRoleDto })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  @ApiNotFoundResponse({ description: 'Rol no encontrado' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateRoleDto) {
    return this.roleService.update(id, dto);
  }

  @Roles('admin')
  @ApiOkResponse({ description: 'Rol eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Rol no encontrado' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
