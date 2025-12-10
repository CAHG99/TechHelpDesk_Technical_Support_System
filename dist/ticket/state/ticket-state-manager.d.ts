import { TicketState } from './ticket-state.interface';
import { TicketStatus } from '../entities/ticket.entity';
export declare class TicketStateManager {
    private states;
    constructor();
    canTransition(from: TicketStatus, to: TicketStatus): boolean;
    getAllowedTransitions(from: TicketStatus): TicketStatus[];
    getState(status: TicketStatus): TicketState | undefined;
}
