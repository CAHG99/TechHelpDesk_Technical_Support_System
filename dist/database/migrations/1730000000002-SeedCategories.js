"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedCategories1730000000002 = void 0;
class SeedCategories1730000000002 {
    async up(queryRunner) {
        await queryRunner.manager.insert("categories", [
            {
                id: 1,
                name: "REQUEST",
                description: "General service request",
                isActive: true,
            },
            {
                id: 2,
                name: "HARDWARE_INCIDENT",
                description: "Hardware-related issue",
                isActive: true,
            },
            {
                id: 3,
                name: "SOFTWARE_INCIDENT",
                description: "Software-related issue",
                isActive: true,
            },
        ]);
    }
    async down(queryRunner) {
        await queryRunner.manager.delete("categories", {});
    }
}
exports.SeedCategories1730000000002 = SeedCategories1730000000002;
//# sourceMappingURL=1730000000002-SeedCategories.js.map