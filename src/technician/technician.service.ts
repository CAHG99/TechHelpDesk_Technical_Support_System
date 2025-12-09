import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technician } from './entities/technician.entity';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { ResponseTechnicianDto } from './dto/response-technician.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TechnicianService {
  constructor(
    @InjectRepository(Technician)
    private readonly technicianRepo: Repository<Technician>,
  ) {}

  async create(dto: CreateTechnicianDto): Promise<ResponseTechnicianDto> {
    const technician = this.technicianRepo.create({
      ...dto,
      isActive: true,
    });

    const saved = await this.technicianRepo.save(technician);
    return plainToInstance(ResponseTechnicianDto, saved, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<ResponseTechnicianDto[]> {
    const technicians = await this.technicianRepo.find();
    return plainToInstance(ResponseTechnicianDto, technicians, { excludeExtraneousValues: true });
  }

  async findOne(id: number): Promise<ResponseTechnicianDto> {
    const technician = await this.technicianRepo.findOne({ where: { id } });
    if (!technician) throw new NotFoundException('Técnico no encontrado');

    return plainToInstance(ResponseTechnicianDto, technician, { excludeExtraneousValues: true });
  }

  async update(id: number, dto: UpdateTechnicianDto): Promise<ResponseTechnicianDto> {
    const technician = await this.technicianRepo.findOne({ where: { id } });
    if (!technician) throw new NotFoundException('Técnico no encontrado');

    Object.assign(technician, dto);

    const updated = await this.technicianRepo.save(technician);
    return plainToInstance(ResponseTechnicianDto, updated, { excludeExtraneousValues: true });
  }

  async remove(id: number): Promise<{ message: string }> {
    const technician = await this.technicianRepo.findOne({ where: { id } });
    if (!technician) throw new NotFoundException('Técnico no encontrado');

    await this.technicianRepo.remove(technician);
    return { message: 'Técnico eliminado correctamente' };
  }
}
