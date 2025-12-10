import { TechnicianService } from "./technician.service";
import { CreateTechnicianDto } from "./dto/create-technician.dto";
import { UpdateTechnicianDto } from "./dto/update-technician.dto";
import { ResponseTechnicianDto } from "./dto/response-technician.dto";
export declare class TechnicianController {
    private readonly technicianService;
    constructor(technicianService: TechnicianService);
    create(dto: CreateTechnicianDto): Promise<ResponseTechnicianDto>;
    findAll(): Promise<import("../common/dto/paginated-response.dto").PaginatedResponseDto<ResponseTechnicianDto>>;
    findOne(id: number): Promise<ResponseTechnicianDto>;
    update(id: number, dto: UpdateTechnicianDto): Promise<ResponseTechnicianDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
