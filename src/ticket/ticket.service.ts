import { BadRequestException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Ticket, TicketStatus, TicketPriority } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status-dto';
import { ResponseTicketDto } from './dto/response-ticket.dto';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { Client } from '../client/entities/client.entity';
import { Technician } from '../technician/entities/technician.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TicketService {
  private readonly logger = new Logger(TicketService.name);

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    @InjectRepository(Technician)
    private readonly technicianRepo: Repository<Technician>,
  ) { }

  // Valid transition map for ticket statuses
  private readonly validTransitions: Record<TicketStatus, TicketStatus[]> = {
    [TicketStatus.OPEN]: [TicketStatus.IN_PROGRESS],
    [TicketStatus.IN_PROGRESS]: [TicketStatus.RESOLVED],
    [TicketStatus.RESOLVED]: [TicketStatus.CLOSED],
    [TicketStatus.CLOSED]: [],
  };

  // Validate if the technician has less than 5 tickets in progress
  private async validateTechnicianLoad(technicianId: number) {
    const count = await this.ticketRepo.count({
      where: {
        technician: { id: technicianId },
        status: TicketStatus.IN_PROGRESS,
      },
    });

    if (count >= 5) {
      throw new BadRequestException('The technician already has 5 tickets in progress');
    }
  }

  // Create a new ticket
  async create(dto: CreateTicketDto): Promise<ResponseTicketDto> {
    // Validate customer (user)
    const customer = await this.userRepo.findOne({ where: { id: dto.customerId } });
    if (!customer) throw new BadRequestException('Invalid customer (user)');

    // Validate category
    const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    if (!category) throw new BadRequestException('Invalid category');

    // Validate client
    const client = await this.clientRepo.findOne({ where: { id: dto.clientId } });
    if (!client) throw new BadRequestException('Invalid business client');

    let technician: User | null = null;
    if (dto.technicianId) {
      // Validate internal technician
      technician = await this.userRepo.findOne({ where: { id: dto.technicianId } });
      if (!technician) throw new BadRequestException('Invalid internal technician');

      // Check technician load
      await this.validateTechnicianLoad(dto.technicianId);
    }

    let technicianExternal: Technician | null = null;
    if (dto.technicianExternalId) {
      // Validate external technician
      technicianExternal = await this.technicianRepo.findOne({ where: { id: dto.technicianExternalId } });
      if (!technicianExternal) throw new BadRequestException('Invalid external technician');
    }

    // Prepare ticket data
    const ticketData: DeepPartial<Ticket> = {
      title: dto.title,
      description: dto.description,
      status: TicketStatus.OPEN, // Default status is 'OPEN'
      priority: dto.priority ?? TicketPriority.MEDIUM, // Default priority is 'MEDIUM'
      customer: customer ?? undefined,
      technician: technician ?? undefined,
      category,
      client,
      technicianExternal: technicianExternal ?? undefined,
      isActive: true,
    };

    // Create and save the ticket
    const ticket = this.ticketRepo.create(ticketData);
    const saved = await this.ticketRepo.save(ticket);

    // Return the saved ticket as a ResponseTicketDto
    return plainToInstance(ResponseTicketDto, saved, { excludeExtraneousValues: true });
  }

  // Update ticket status (validate status transitions)
  async updateStatus(id: number, dto: UpdateTicketStatusDto): Promise<ResponseTicketDto> {
    const ticket = await this.ticketRepo.findOne({ where: { id } });
    if (!ticket) throw new NotFoundException('Ticket not found');

    // Validate if the status transition is allowed
    const allowed = this.validTransitions[ticket.status];
    if (!allowed.includes(dto.status)) {
      throw new BadRequestException(
        `Invalid transition: ${ticket.status} → ${dto.status}`,
      );
    }

    // If transitioning to IN_PROGRESS, validate technician load
    if (dto.status === TicketStatus.IN_PROGRESS && ticket.technician) {
      await this.validateTechnicianLoad(ticket.technician.id);
    }

    ticket.status = dto.status;

    // Save updated ticket
    const updated = await this.ticketRepo.save(ticket);

    // Return the updated ticket as a ResponseTicketDto
    return plainToInstance(ResponseTicketDto, updated, { excludeExtraneousValues: true });
  }

  // Get ticket history by client ID
  async findByClient(id: number): Promise<ResponseTicketDto[]> {
    const tickets = await this.ticketRepo.find({
      where: { customer: { id } },
    });

    return plainToInstance(ResponseTicketDto, tickets, { excludeExtraneousValues: true });
  }

  // Get tickets assigned to a specific technician
  async findByTechnician(id: number): Promise<ResponseTicketDto[]> {
    const tickets = await this.ticketRepo.find({
      where: { technician: { id } },
    });

    return plainToInstance(ResponseTicketDto, tickets, { excludeExtraneousValues: true });
  }

  // Get a ticket by its ID
  async findOne(id: number): Promise<ResponseTicketDto> {
    const ticket = await this.ticketRepo.findOne({ where: { id } });
    if (!ticket) throw new NotFoundException('Ticket not found');

    return plainToInstance(ResponseTicketDto, ticket, { excludeExtraneousValues: true });
  }

  // Get a list of all tickets with pagination
  async findAll(paginationDto?: { limit?: number; offset?: number }): Promise<{ data: ResponseTicketDto[]; total: number; limit: number; offset: number; hasMore: boolean }> {
    const { limit = 10, offset = 0 } = paginationDto || {};

    const [tickets, total] = await this.ticketRepo.findAndCount({
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });

    const data = plainToInstance(ResponseTicketDto, tickets, { excludeExtraneousValues: true });

    return {
      data,
      total,
      limit,
      offset,
      hasMore: offset + data.length < total,
    };
  }
}
