import { TicketService } from "./ticket.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketStatusDto } from "./dto/update-ticket-status-dto";
import { ResponseTicketDto } from "./dto/response-ticket.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    create(dto: CreateTicketDto): Promise<ResponseTicketDto>;
    updateStatus(id: number, dto: UpdateTicketStatusDto): Promise<ResponseTicketDto>;
    findByClient(id: number): Promise<ResponseTicketDto[]>;
    findByTechnician(id: number): Promise<ResponseTicketDto[]>;
    findOne(id: number): Promise<ResponseTicketDto>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: ResponseTicketDto[];
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    }>;
}
