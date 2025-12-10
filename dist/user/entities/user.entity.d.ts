import { Role } from "src/role/entities/role.entity";
import { Ticket } from "../../ticket/entities/ticket.entity";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    roleId: number;
    role: Role;
    ticketsCreated: Ticket[];
    ticketsAssigned: Ticket[];
    createdAt: Date;
    updatedAt: Date;
}
