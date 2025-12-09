import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseClientDto } from './dto/response-client.dto';

@ApiTags('Clients')
@ApiBearerAuth('access-token')
@Controller('clients')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiCreatedResponse({ type: ResponseClientDto })
  create(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseClientDto, isArray: true })
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseClientDto })
  @ApiNotFoundResponse({ description: 'Cliente no encontrado' })
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseClientDto })
  update(@Param('id') id: number, @Body() dto: UpdateClientDto) {
    return this.clientService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Cliente eliminado correctamente' })
  remove(@Param('id') id: number) {
    return this.clientService.remove(id);
  }
}
