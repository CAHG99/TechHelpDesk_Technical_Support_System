import { TicketPriority, TicketStatus } from "../entities/ticket.entity";
export declare class CreateTicketDto {
    title: string;
    description: string;
    status?: TicketStatus;
    priority?: TicketPriority;
    customerId: number;
    technicianId?: number;
    categoryId: number;
    clientId: number;
    technicianExternalId?: number;
}
