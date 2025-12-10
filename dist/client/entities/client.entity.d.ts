import { Ticket } from "../../ticket/entities/ticket.entity";
export declare class Client {
    id: number;
    name: string;
    company: string;
    contactEmail: string;
    isActive: boolean;
    tickets: Ticket[];
    createdAt: Date;
    updatedAt: Date;
}
