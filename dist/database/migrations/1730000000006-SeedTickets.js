"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedTickets1730000000006 = void 0;
class SeedTickets1730000000006 {
    async up(queryRunner) {
        await queryRunner.query(`
      INSERT INTO "tickets"
      ("id", "title", "description", "status", "priority", "customerId", "technicianId", "categoryId", "clientId", "technicianExternalId", "isActive")
      VALUES
      (1, 'Printer not working', 'The printer in office 3 is jammed', 'OPEN', 'MEDIUM', 4, 2, 1, 1, null, true),
      (2, 'Software installation request', 'Need to install Visual Studio Code', 'IN_PROGRESS', 'LOW', 5, 3, 3, 2, null, true);
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "tickets"`);
    }
}
exports.SeedTickets1730000000006 = SeedTickets1730000000006;
//# sourceMappingURL=1730000000006-SeedTickets.js.map