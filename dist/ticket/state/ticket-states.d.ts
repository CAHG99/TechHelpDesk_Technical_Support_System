import { TicketState } from './ticket-state.interface';
import { TicketStatus } from '../entities/ticket.entity';
export declare class OpenState implements TicketState {
    canTransitionTo(newStatus: TicketStatus): boolean;
    getAllowedTransitions(): TicketStatus[];
}
export declare class InProgressState implements TicketState {
    canTransitionTo(newStatus: TicketStatus): boolean;
    getAllowedTransitions(): TicketStatus[];
}
export declare class ResolvedState implements TicketState {
    canTransitionTo(newStatus: TicketStatus): boolean;
    getAllowedTransitions(): TicketStatus[];
}
export declare class ClosedState implements TicketState {
    canTransitionTo(newStatus: TicketStatus): boolean;
    getAllowedTransitions(): TicketStatus[];
}
