import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedClients1730000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert('clients', [
      {
        id: 1,
        name: 'Carlos Pérez',
        company: 'InnovaTech',
        contactEmail: 'carlos@innovatech.com',
        isActive: true,
      },
      {
        id: 2,
        name: 'María Gómez',
        company: 'SoftSolutions',
        contactEmail: 'maria@softsolutions.com',
        isActive: true,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('clients', {});
  }
}
