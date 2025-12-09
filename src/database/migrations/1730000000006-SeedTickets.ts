import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTickets1730000000006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "tickets"
      ("id", "title", "description", "status", "priority", "customerId", "technicianId", "categoryId", "clientId", "technicianExternalId", "isActive")
      VALUES
      (1, 'Printer not working', 'The printer in office 3 is jammed', 'OPEN', 'MEDIUM', 4, 2, 1, 1, null, true),
      (2, 'Software installation request', 'Need to install Visual Studio Code', 'IN_PROGRESS', 'LOW', 5, 3, 3, 2, null, true);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "tickets"`);
  }
}
