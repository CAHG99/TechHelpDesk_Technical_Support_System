import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseRoleDto } from './dto/response-role.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto): Promise<ResponseRoleDto> {
    const exists = await this.roleRepository.findOne({ where: { name: dto.name } });

    if (exists) {
      throw new BadRequestException('El rol ya existe');
    }

    const role = this.roleRepository.create(dto);
    const saved = await this.roleRepository.save(role);

    return plainToInstance(ResponseRoleDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<ResponseRoleDto[]> {
    const roles = await this.roleRepository.find();
    return plainToInstance(ResponseRoleDto, roles, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<ResponseRoleDto> {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }

    return plainToInstance(ResponseRoleDto, role, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: number, dto: UpdateRoleDto): Promise<ResponseRoleDto> {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }

    await this.roleRepository.update(id, dto);
    const updated = await this.roleRepository.findOne({ where: { id } });

    return plainToInstance(ResponseRoleDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<void> {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }

    await this.roleRepository.softDelete(id);
  }
}
