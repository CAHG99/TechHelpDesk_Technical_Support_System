import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketStatusDto } from "./dto/update-ticket-status-dto";
import { ResponseTicketDto } from "./dto/response-ticket.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { PaginationDto } from "../common/dto/pagination.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Tickets") // Swagger tag for grouping ticket-related endpoints
@ApiBearerAuth("access-token") // Adds Bearer token authentication to the API
@UseGuards(AuthGuard("jwt"), RolesGuard) // Protect routes with JWT and Role Guards
@Controller("tickets")
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  // Create a new ticket (protected route)
  @Post()
  create(@Body() dto: CreateTicketDto): Promise<ResponseTicketDto> {
    return this.ticketService.create(dto);
  }

  // Update ticket status (only accessible by admin and technician)
  @Roles("admin", "technician") // Restrict access by role
  @Patch(":id/status") // Endpoint to update the ticket status by ID
  updateStatus(
    @Param("id") id: number, // Ticket ID from URL param
    @Body() dto: UpdateTicketStatusDto, // Status update DTO
  ): Promise<ResponseTicketDto> {
    return this.ticketService.updateStatus(id, dto);
  }

  // Get ticket history for a client
  @Get("client/:id")
  findByClient(@Param("id") id: number): Promise<ResponseTicketDto[]> {
    return this.ticketService.findByClient(id);
  }

  // Get tickets assigned to a technician
  @Get("technician/:id")
  findByTechnician(@Param("id") id: number): Promise<ResponseTicketDto[]> {
    return this.ticketService.findByTechnician(id);
  }

  // Get a single ticket by ID
  @Get(":id")
  findOne(@Param("id") id: number): Promise<ResponseTicketDto> {
    return this.ticketService.findOne(id);
  }

  // List all tickets with pagination
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ticketService.findAll(paginationDto);
  }
}
