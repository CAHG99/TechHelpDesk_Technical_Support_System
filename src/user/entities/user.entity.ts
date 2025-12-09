import { Role } from 'src/role/entities/role.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:100 })
    name: string;

    @Column({ unique: true})
    email: string;

    @Column({ length: 100 })
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    roleId: number;

    @ManyToOne(() => Role, (role) => role.users, { eager: true })
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @OneToMany(() => Ticket, ticket => ticket.customer)
    ticketsCreated: Ticket[];

    @OneToMany(() => Ticket, ticket => ticket.technician)
    ticketsAssigned: Ticket[];

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;
}
