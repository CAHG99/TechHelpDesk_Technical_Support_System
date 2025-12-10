"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedClients1730000000004 = void 0;
class SeedClients1730000000004 {
    async up(queryRunner) {
        await queryRunner.manager.insert("clients", [
            {
                id: 1,
                name: "Carlos Pérez",
                company: "InnovaTech",
                contactEmail: "carlos@innovatech.com",
                isActive: true,
            },
            {
                id: 2,
                name: "María Gómez",
                company: "SoftSolutions",
                contactEmail: "maria@softsolutions.com",
                isActive: true,
            },
        ]);
    }
    async down(queryRunner) {
        await queryRunner.manager.delete("clients", {});
    }
}
exports.SeedClients1730000000004 = SeedClients1730000000004;
//# sourceMappingURL=1730000000004-SeedClients.js.map