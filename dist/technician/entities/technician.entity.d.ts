import { Ticket } from "../../ticket/entities/ticket.entity";
export declare class Technician {
    id: number;
    name: string;
    specialty: string;
    availability: boolean;
    isActive: boolean;
    tickets: Ticket[];
    createdAt: Date;
    updatedAt: Date;
}
