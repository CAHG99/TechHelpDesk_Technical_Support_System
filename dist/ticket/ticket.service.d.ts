import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status-dto';
import { ResponseTicketDto } from './dto/response-ticket.dto';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { Client } from '../client/entities/client.entity';
import { Technician } from '../technician/entities/technician.entity';
export declare class TicketService {
    private readonly ticketRepo;
    private readonly userRepo;
    private readonly categoryRepo;
    private readonly clientRepo;
    private readonly technicianRepo;
    private readonly logger;
    constructor(ticketRepo: Repository<Ticket>, userRepo: Repository<User>, categoryRepo: Repository<Category>, clientRepo: Repository<Client>, technicianRepo: Repository<Technician>);
    private readonly validTransitions;
    private validateTechnicianLoad;
    create(dto: CreateTicketDto): Promise<ResponseTicketDto>;
    updateStatus(id: number, dto: UpdateTicketStatusDto): Promise<ResponseTicketDto>;
    findByClient(id: number): Promise<ResponseTicketDto[]>;
    findByTechnician(id: number): Promise<ResponseTicketDto[]>;
    findOne(id: number): Promise<ResponseTicketDto>;
    findAll(paginationDto?: {
        limit?: number;
        offset?: number;
    }): Promise<{
        data: ResponseTicketDto[];
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    }>;
}
