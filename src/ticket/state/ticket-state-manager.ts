import { Injectable } from '@nestjs/common';
import { TicketState } from './ticket-state.interface';
import { TicketStatus } from '../entities/ticket.entity';
import { OpenState, InProgressState, ResolvedState, ClosedState } from './ticket-states';

/**
 * Manages ticket state transitions using State Pattern
 */
@Injectable()
export class TicketStateManager {
    private states: Map<TicketStatus, TicketState>;

    constructor() {
        this.states = new Map([
            [TicketStatus.OPEN, new OpenState()],
            [TicketStatus.IN_PROGRESS, new InProgressState()],
            [TicketStatus.RESOLVED, new ResolvedState()],
            [TicketStatus.CLOSED, new ClosedState()],
        ]);
    }

    /**
     * Check if transition from one status to another is valid
     * @param from - Current ticket status
     * @param to - Target ticket status
     * @returns true if transition is allowed, false otherwise
     */
    canTransition(from: TicketStatus, to: TicketStatus): boolean {
        const state = this.states.get(from);
        return state?.canTransitionTo(to) ?? false;
    }

    /**
     * Get all allowed transitions from a given status
     * @param from - Current ticket status
     * @returns Array of allowed target statuses
     */
    getAllowedTransitions(from: TicketStatus): TicketStatus[] {
        const state = this.states.get(from);
        return state?.getAllowedTransitions() ?? [];
    }

    /**
     * Get state instance for a given status
     * @param status - Ticket status
     * @returns TicketState instance or undefined
     */
    getState(status: TicketStatus): TicketState | undefined {
        return this.states.get(status);
    }
}
