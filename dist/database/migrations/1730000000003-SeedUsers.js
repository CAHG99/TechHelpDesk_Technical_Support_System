"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedUsers1730000000003 = void 0;
class SeedUsers1730000000003 {
    async up(queryRunner) {
        await queryRunner.manager.insert("user", [
            {
                id: 1,
                name: "Admin User",
                email: "admin@techhelpdesk.com",
                password: "$2b$10$bUedpvrmJ.kESdxWuQppgu0cXwntao6G3PmV9nvoW4LpZSjbdqpp6",
                isActive: true,
                roleId: 1,
            },
            {
                id: 2,
                name: "Tech One",
                email: "tech1@techhelpdesk.com",
                password: "$2b$10$Y3Polui9kJz7WIHMs/IaXe9jaPBhCC8zX3xytynJn0kbmiFUBGEd.",
                isActive: true,
                roleId: 2,
            },
            {
                id: 3,
                name: "Tech Two",
                email: "tech2@techhelpdesk.com",
                password: "$2b$10$Y3Polui9kJz7WIHMs/IaXe9jaPBhCC8zX3xytynJn0kbmiFUBGEd.",
                isActive: true,
                roleId: 2,
            },
            {
                id: 4,
                name: "Customer One",
                email: "customer1@company.com",
                password: "$2b$10$pMX0qEKX/Ytld72zK3OAhOcCHCeN6xZZLVeAAUQrYkYqItlLj/rUC",
                isActive: true,
                roleId: 3,
            },
            {
                id: 5,
                name: "Customer Two",
                email: "customer2@company.com",
                password: "$2b$10$pMX0qEKX/Ytld72zK3OAhOcCHCeN6xZZLVeAAUQrYkYqItlLj/rUC",
                isActive: true,
                roleId: 3,
            },
        ]);
    }
    async down(queryRunner) {
        await queryRunner.manager.delete("user", {});
    }
}
exports.SeedUsers1730000000003 = SeedUsers1730000000003;
//# sourceMappingURL=1730000000003-SeedUsers.js.map