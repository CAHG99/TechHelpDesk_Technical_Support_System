import { TicketState } from './ticket-state.interface';
import { TicketStatus } from '../entities/ticket.entity';

export class OpenState implements TicketState {
    canTransitionTo(newStatus: TicketStatus): boolean {
        return newStatus === TicketStatus.IN_PROGRESS;
    }

    getAllowedTransitions(): TicketStatus[] {
        return [TicketStatus.IN_PROGRESS];
    }
}

export class InProgressState implements TicketState {
    canTransitionTo(newStatus: TicketStatus): boolean {
        return newStatus === TicketStatus.RESOLVED;
    }

    getAllowedTransitions(): TicketStatus[] {
        return [TicketStatus.RESOLVED];
    }
}

export class ResolvedState implements TicketState {
    canTransitionTo(newStatus: TicketStatus): boolean {
        return newStatus === TicketStatus.CLOSED;
    }

    getAllowedTransitions(): TicketStatus[] {
        return [TicketStatus.CLOSED];
    }
}

export class ClosedState implements TicketState {
    canTransitionTo(newStatus: TicketStatus): boolean {
        return false; // No transitions allowed from CLOSED
    }

    getAllowedTransitions(): TicketStatus[] {
        return [];
    }
}
