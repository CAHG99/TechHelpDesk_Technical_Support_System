"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClosedState = exports.ResolvedState = exports.InProgressState = exports.OpenState = void 0;
const ticket_entity_1 = require("../entities/ticket.entity");
class OpenState {
    canTransitionTo(newStatus) {
        return newStatus === ticket_entity_1.TicketStatus.IN_PROGRESS;
    }
    getAllowedTransitions() {
        return [ticket_entity_1.TicketStatus.IN_PROGRESS];
    }
}
exports.OpenState = OpenState;
class InProgressState {
    canTransitionTo(newStatus) {
        return newStatus === ticket_entity_1.TicketStatus.RESOLVED;
    }
    getAllowedTransitions() {
        return [ticket_entity_1.TicketStatus.RESOLVED];
    }
}
exports.InProgressState = InProgressState;
class ResolvedState {
    canTransitionTo(newStatus) {
        return newStatus === ticket_entity_1.TicketStatus.CLOSED;
    }
    getAllowedTransitions() {
        return [ticket_entity_1.TicketStatus.CLOSED];
    }
}
exports.ResolvedState = ResolvedState;
class ClosedState {
    canTransitionTo(newStatus) {
        return false;
    }
    getAllowedTransitions() {
        return [];
    }
}
exports.ClosedState = ClosedState;
//# sourceMappingURL=ticket-states.js.map