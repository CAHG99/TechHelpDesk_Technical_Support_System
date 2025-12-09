import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCategories1730000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert('categories', [
      { id: 1, name: 'REQUEST', description: 'General service request', isActive: true},
      { id: 2, name: 'HARDWARE_INCIDENT', description: 'Hardware-related issue', isActive: true},
      { id: 3, name: 'SOFTWARE_INCIDENT', description: 'Software-related issue', isActive: true },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('categories', {});
  }
}
