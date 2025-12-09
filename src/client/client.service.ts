import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ResponseClientDto } from './dto/response-client.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  async create(dto: CreateClientDto): Promise<ResponseClientDto> {
    const client = this.clientRepo.create({
      ...dto,
      isActive: true,
    });

    const saved = await this.clientRepo.save(client);
    return plainToInstance(ResponseClientDto, saved, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<ResponseClientDto[]> {
    const clients = await this.clientRepo.find();
    return plainToInstance(ResponseClientDto, clients, { excludeExtraneousValues: true });
  }

  async findOne(id: number): Promise<ResponseClientDto> {
    const client = await this.clientRepo.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Cliente no encontrado');

    return plainToInstance(ResponseClientDto, client, { excludeExtraneousValues: true });
  }

  async update(id: number, dto: UpdateClientDto): Promise<ResponseClientDto> {
    const client = await this.clientRepo.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Cliente no encontrado');

    Object.assign(client, dto);

    const updated = await this.clientRepo.save(client);
    return plainToInstance(ResponseClientDto, updated, { excludeExtraneousValues: true });
  }

  async remove(id: number): Promise<{ message: string }> {
    const client = await this.clientRepo.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Cliente no encontrado');

    await this.clientRepo.remove(client);
    return { message: 'Cliente eliminado correctamente' };
  }
}

