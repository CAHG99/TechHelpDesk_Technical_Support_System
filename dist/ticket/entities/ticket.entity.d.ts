import { Category } from "../../category/entities/category.entity";
import { Client } from "../../client/entities/client.entity";
import { Technician } from "../../technician/entities/technician.entity";
import { User } from "../../user/entities/user.entity";
export declare enum TicketStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    RESOLVED = "RESOLVED",
    CLOSED = "CLOSED"
}
export declare enum TicketPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}
export declare class Ticket {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    customer: User;
    technician: User;
    category: Category;
    client: Client;
    technicianExternal: Technician;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
