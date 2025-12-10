import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Technician } from "./entities/technician.entity";
import { CreateTechnicianDto } from "./dto/create-technician.dto";
import { UpdateTechnicianDto } from "./dto/update-technician.dto";
import { ResponseTechnicianDto } from "./dto/response-technician.dto";
import { plainToInstance } from "class-transformer";
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';

@Injectable()
export class TechnicianService {
  private readonly logger = new Logger(TechnicianService.name);

  constructor(
    @InjectRepository(Technician)
    private readonly technicianRepository: Repository<Technician>,
  ) { }

  async create(dto: CreateTechnicianDto): Promise<ResponseTechnicianDto> {
    const technician = this.technicianRepository.create({
      ...dto,
      isActive: true,
    });

    const saved = await this.technicianRepository.save(technician);
    return plainToInstance(ResponseTechnicianDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(paginationDto?: PaginationDto): Promise<PaginatedResponseDto<ResponseTechnicianDto>> {
    this.logger.log('Fetching all technicians with pagination');

    const { limit = 10, offset = 0 } = paginationDto || {};

    const [technicians, total] = await this.technicianRepository.findAndCount({
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });

    const data = plainToInstance(ResponseTechnicianDto, technicians, { excludeExtraneousValues: true });
    this.logger.log(`Returned ${data.length} technicians out of ${total} total`);

    return new PaginatedResponseDto(data, total, limit, offset);
  }

  async findOne(id: number): Promise<ResponseTechnicianDto> {
    const technician = await this.technicianRepository.findOne({ where: { id } });
    if (!technician) throw new NotFoundException("Técnico no encontrado");

    return plainToInstance(ResponseTechnicianDto, technician, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    dto: UpdateTechnicianDto,
  ): Promise<ResponseTechnicianDto> {
    const technician = await this.technicianRepository.findOne({ where: { id } });
    if (!technician) throw new NotFoundException("Técnico no encontrado");

    Object.assign(technician, dto);

    const updated = await this.technicianRepository.save(technician);
    return plainToInstance(ResponseTechnicianDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const technician = await this.technicianRepository.findOne({ where: { id } });
    if (!technician) throw new NotFoundException("Técnico no encontrado");

    await this.technicianRepository.remove(technician);
    return { message: "Técnico eliminado correctamente" };
  }
}
