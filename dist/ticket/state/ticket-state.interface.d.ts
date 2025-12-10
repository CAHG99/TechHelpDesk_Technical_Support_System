import { TicketStatus } from '../entities/ticket.entity';
import { Ticket } from '../entities/ticket.entity';
export interface TicketState {
    canTransitionTo(newStatus: TicketStatus): boolean;
    getAllowedTransitions(): TicketStatus[];
    onEnter?(ticket: Ticket): Promise<void>;
    onExit?(ticket: Ticket): Promise<void>;
}
