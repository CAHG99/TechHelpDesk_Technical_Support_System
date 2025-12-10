import { Repository } from "typeorm";
import { Client } from "./entities/client.entity";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { ResponseClientDto } from "./dto/response-client.dto";
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
export declare class ClientService {
    private readonly clientRepository;
    private readonly logger;
    constructor(clientRepository: Repository<Client>);
    create(dto: CreateClientDto): Promise<ResponseClientDto>;
    findAll(paginationDto?: PaginationDto): Promise<PaginatedResponseDto<ResponseClientDto>>;
    findOne(id: number): Promise<ResponseClientDto>;
    update(id: number, dto: UpdateClientDto): Promise<ResponseClientDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
