import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { Client } from '../client/entities/client.entity';
import { Technician } from '../technician/entities/technician.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, User, Category, Client, Technician]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
