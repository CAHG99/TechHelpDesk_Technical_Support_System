import { Ticket } from "../../ticket/entities/ticket.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("technicians")
export class Technician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialty: string;

  @Column()
  availability: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.technicianExternal)
  tickets: Ticket[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
