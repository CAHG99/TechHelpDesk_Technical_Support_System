import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { ResponseClientDto } from "./dto/response-client.dto";
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(dto: CreateClientDto): Promise<ResponseClientDto>;
    findAll(): Promise<import("../common/dto/paginated-response.dto").PaginatedResponseDto<ResponseClientDto>>;
    findOne(id: number): Promise<ResponseClientDto>;
    update(id: number, dto: UpdateClientDto): Promise<ResponseClientDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
