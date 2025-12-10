import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  // auth.service.ts
  async register(dto: RegisterDto) {
    const defaultRole = await this.roleRepository.findOne({
      where: { name: 'customer' },
    });

    if (!defaultRole) {
      throw new Error('Rol por defecto no configurado');
    }

    const createUserDto: CreateUserDto = {
      ...dto,
      roleId: defaultRole.id,
    };

    return this.userService.create(createUserDto);
  }


  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario desactivado');
    }

    const isValid = await bcrypt.compare(dto.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email, role: user.role.name };

    const accessToken = this.jwt.sign(payload);

    return { accessToken };
  }

  async getProfile(userId: number) {
    return this.userService.findOne(userId);
  }
}
