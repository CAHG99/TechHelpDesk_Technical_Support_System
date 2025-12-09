import { Ticket } from '../../ticket/entities/ticket.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({default:true})
  isActive: boolean;

  @OneToMany(() => Ticket, ticket => ticket.category)
  tickets: Ticket[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
