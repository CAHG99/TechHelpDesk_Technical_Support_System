import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiTags, ApiBody, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';


@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ type: ResponseUserDto }) 
  @ApiBadRequestResponse({ description: 'Datos inválidos o usuario duplicado' })
  @ApiUnauthorizedResponse({ description: 'Token inválido o ausente' }) 
  @Roles('admin')
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)  
  @Roles('admin')
  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Token inválido o ausente' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiBody({ type: ResponseUserDto })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiUnauthorizedResponse({ description: 'Token inválido o ausente' })
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseUserDto> {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)  
  @Roles('admin')
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  @ApiUnauthorizedResponse({ description: 'Token inválido o ausente' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)  
  @Roles('admin')
  @ApiOkResponse({ description: 'Usuario eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiUnauthorizedResponse({ description: 'Token inválido o ausente' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
