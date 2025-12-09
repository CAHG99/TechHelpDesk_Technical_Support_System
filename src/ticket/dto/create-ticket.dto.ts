import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TicketPriority, TicketStatus } from '../entities/ticket.entity';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;

  @IsEnum(TicketPriority)
  @IsOptional()
  priority?: TicketPriority;

  @IsNumber()
  customerId: number;

  @IsNumber()
  @IsOptional()
  technicianId?: number;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  clientId: number;

  @IsNumber()
  @IsOptional()
  technicianExternalId?: number;
}
