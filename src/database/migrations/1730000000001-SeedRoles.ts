import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1730000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert('role', [
      { id: 1, name: 'ADMIN', isActive: true},
      { id: 2, name: 'TECHNICIAN', isActive: true },
      { id: 3, name: 'CUSTOMER', isActive: true },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('role', {});
  }
}
