import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TicketPriority, TicketStatus } from "../entities/ticket.entity";

export class CreateTicketDto {
  @ApiProperty({
    description: 'Título del ticket que describe el problema',
    example: 'Impresora no funciona',
    minLength: 5,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    description: 'Descripción detallada del problema',
    example: 'La impresora HP LaserJet 1102w no imprime. La luz roja parpadea constantemente.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'Estado inicial del ticket',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
    example: TicketStatus.OPEN,
  })
  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;

  @ApiPropertyOptional({
    description: 'Prioridad del ticket',
    enum: TicketPriority,
    default: TicketPriority.MEDIUM,
    example: TicketPriority.HIGH,
  })
  @IsEnum(TicketPriority)
  @IsOptional()
  priority?: TicketPriority;

  @ApiProperty({
    description: 'ID del usuario que reporta el problema',
    example: 1,
  })
  @IsNumber()
  customerId: number;

  @ApiPropertyOptional({
    description: 'ID del técnico interno asignado',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  technicianId?: number;

  @ApiProperty({
    description: 'ID de la categoría del ticket',
    example: 2,
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: 'ID del cliente asociado',
    example: 3,
  })
  @IsNumber()
  clientId: number;

  @ApiPropertyOptional({
    description: 'ID del técnico externo asignado',
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  technicianExternalId?: number;
}
