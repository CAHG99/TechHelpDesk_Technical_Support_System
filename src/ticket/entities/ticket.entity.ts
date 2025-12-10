import { Category } from "../../category/entities/category.entity";
import { Client } from "../../client/entities/client.entity";
import { Technician } from "../../technician/entities/technician.entity";
import { User } from "../../user/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum TicketStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export enum TicketPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

@Entity("tickets")
@Index(['status', 'createdAt'])  // Para queries de tickets por estado ordenados por fecha
@Index(['priority'])              // Para filtrar por prioridad
@Index(['isActive'])              // Para filtrar tickets activos
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @Column({
    type: "enum",
    enum: TicketPriority,
    default: TicketPriority.MEDIUM,
  })
  priority: TicketPriority;

  @ManyToOne(() => User, (user) => user.ticketsCreated, { eager: true })
  customer: User;

  @ManyToOne(() => User, (user) => user.ticketsAssigned, {
    eager: true,
    nullable: true,
  })
  technician: User;

  @ManyToOne(() => Category, (category) => category.tickets, { eager: true })
  category: Category;

  @ManyToOne(() => Client, (client) => client.tickets, { eager: true })
  client: Client;

  @ManyToOne(() => Technician, (tech) => tech.tickets, {
    eager: true,
    nullable: true,
  })
  technicianExternal: Technician;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
