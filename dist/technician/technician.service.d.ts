import { Repository } from "typeorm";
import { Technician } from "./entities/technician.entity";
import { CreateTechnicianDto } from "./dto/create-technician.dto";
import { UpdateTechnicianDto } from "./dto/update-technician.dto";
import { ResponseTechnicianDto } from "./dto/response-technician.dto";
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
export declare class TechnicianService {
    private readonly technicianRepository;
    private readonly logger;
    constructor(technicianRepository: Repository<Technician>);
    create(dto: CreateTechnicianDto): Promise<ResponseTechnicianDto>;
    findAll(paginationDto?: PaginationDto): Promise<PaginatedResponseDto<ResponseTechnicianDto>>;
    findOne(id: number): Promise<ResponseTechnicianDto>;
    update(id: number, dto: UpdateTechnicianDto): Promise<ResponseTechnicianDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
