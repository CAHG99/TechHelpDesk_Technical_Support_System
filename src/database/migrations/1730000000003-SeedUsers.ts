import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedUsers1730000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert("user", [
      {
        id: 1,
        name: "Admin User",
        email: "admin@techhelpdesk.com",
        password:
          "$2b$10$bUedpvrmJ.kESdxWuQppgu0cXwntao6G3PmV9nvoW4LpZSjbdqpp6", // hash de ejemplo
        isActive: true,
        roleId: 1, // ADMIN
      },
      {
        id: 2,
        name: "Tech One",
        email: "tech1@techhelpdesk.com",
        password:
          "$2b$10$Y3Polui9kJz7WIHMs/IaXe9jaPBhCC8zX3xytynJn0kbmiFUBGEd.",
        isActive: true,
        roleId: 2, // TECHNICIAN
      },
      {
        id: 3,
        name: "Tech Two",
        email: "tech2@techhelpdesk.com",
        password:
          "$2b$10$Y3Polui9kJz7WIHMs/IaXe9jaPBhCC8zX3xytynJn0kbmiFUBGEd.",
        isActive: true,
        roleId: 2, // TECHNICIAN
      },
      {
        id: 4,
        name: "Customer One",
        email: "customer1@company.com",
        password:
          "$2b$10$pMX0qEKX/Ytld72zK3OAhOcCHCeN6xZZLVeAAUQrYkYqItlLj/rUC",
        isActive: true,
        roleId: 3, // CUSTOMER
      },
      {
        id: 5,
        name: "Customer Two",
        email: "customer2@company.com",
        password:
          "$2b$10$pMX0qEKX/Ytld72zK3OAhOcCHCeN6xZZLVeAAUQrYkYqItlLj/rUC",
        isActive: true,
        roleId: 3, // CUSTOMER
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete("user", {});
  }
}
