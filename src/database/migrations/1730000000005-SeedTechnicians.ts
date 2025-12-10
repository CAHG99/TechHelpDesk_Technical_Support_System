import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedTechnicians1730000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert("technicians", [
      {
        id: 1,
        name: "Juan Torres",
        specialty: "Networking",
        availability: true,
        isActive: true,
      },
      {
        id: 2,
        name: "Laura Martínez",
        specialty: "Hardware Repair",
        availability: true,
        isActive: true,
      },
      {
        id: 3,
        name: "Pedro Sánchez",
        specialty: "Software Support",
        availability: false,
        isActive: true,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete("technicians", {});
  }
}
