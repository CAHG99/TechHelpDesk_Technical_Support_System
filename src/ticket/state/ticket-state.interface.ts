import { TicketStatus } from '../entities/ticket.entity';
import { Ticket } from '../entities/ticket.entity';

/**
 * Interface for ticket state behavior
 * Implements State Pattern for ticket status transitions
 */
export interface TicketState {
    /**
     * Check if transition to a new status is allowed
     * @param newStatus - The target status to transition to
     */
    canTransitionTo(newStatus: TicketStatus): boolean;

    /**
     * Get all allowed status transitions from current state
     */
    getAllowedTransitions(): TicketStatus[];

    /**
     * Hook executed when entering this state
     * @param ticket - The ticket entering this state
     */
    onEnter?(ticket: Ticket): Promise<void>;

    /**
     * Hook executed when exiting this state
     * @param ticket - The ticket exiting this state
     */
    onExit?(ticket: Ticket): Promise<void>;
}
