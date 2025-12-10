"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedTechnicians1730000000005 = void 0;
class SeedTechnicians1730000000005 {
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.manager.delete("technicians", {});
    }
}
exports.SeedTechnicians1730000000005 = SeedTechnicians1730000000005;
//# sourceMappingURL=1730000000005-SeedTechnicians.js.map