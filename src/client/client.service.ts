import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Client } from "./entities/client.entity";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { ResponseClientDto } from "./dto/response-client.dto";
import { plainToInstance } from "class-transformer";
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) { }

  async create(dto: CreateClientDto): Promise<ResponseClientDto> {
    const client = this.clientRepository.create({
      ...dto,
      isActive: true,
    });

    const saved = await this.clientRepository.save(client);
    return plainToInstance(ResponseClientDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(paginationDto?: PaginationDto): Promise<PaginatedResponseDto<ResponseClientDto>> {
    this.logger.log('Fetching all clients with pagination');

    const { limit = 10, offset = 0 } = paginationDto || {};

    const [clients, total] = await this.clientRepository.findAndCount({
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });

    const data = plainToInstance(ResponseClientDto, clients, { excludeExtraneousValues: true });
    this.logger.log(`Returned ${data.length} clients out of ${total} total`);

    return new PaginatedResponseDto(data, total, limit, offset);
  }

  async findOne(id: number): Promise<ResponseClientDto> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) throw new NotFoundException("Cliente no encontrado");

    return plainToInstance(ResponseClientDto, client, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: number, dto: UpdateClientDto): Promise<ResponseClientDto> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) throw new NotFoundException("Cliente no encontrado");

    Object.assign(client, dto);

    const updated = await this.clientRepository.save(client);
    return plainToInstance(ResponseClientDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) throw new NotFoundException("Cliente no encontrado");

    await this.clientRepository.remove(client);
    return { message: "Cliente eliminado correctamente" };
  }
}
