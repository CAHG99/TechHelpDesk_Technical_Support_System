import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTicketsTableProperOrder1730000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tickets" (
        "id" SERIAL PRIMARY KEY,
        "title" varchar NOT NULL,
        "description" varchar NOT NULL,
        "status" varchar NOT NULL,
        "priority" varchar NOT NULL,
        "isActive" boolean NOT NULL DEFAULT true,

        -- Foreign keys (antes de las fechas)
        "customerId" integer,
        "technicianId" integer,
        "categoryId" integer,
        "clientId" integer,
        "technicianExternalId" integer,

        -- Fechas AL FINAL
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      );
    `);

    await queryRunner.query(`
      ALTER TABLE "tickets"
      ADD CONSTRAINT "FK_ticket_customer"
      FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE SET NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "tickets"
      ADD CONSTRAINT "FK_ticket_technician"
      FOREIGN KEY ("technicianId") REFERENCES "user"("id") ON DELETE SET NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "tickets"
      ADD CONSTRAINT "FK_ticket_category"
      FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "tickets"
      ADD CONSTRAINT "FK_ticket_client"
      FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "tickets"
      ADD CONSTRAINT "FK_ticket_technician_external"
      FOREIGN KEY ("technicianExternalId") REFERENCES "technicians"("id") ON DELETE SET NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tickets"`);
  }
}
