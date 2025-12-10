import { Ticket } from "../../ticket/entities/ticket.entity";
export declare class Category {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    tickets: Ticket[];
    createdAt: Date;
    updatedAt: Date;
}
