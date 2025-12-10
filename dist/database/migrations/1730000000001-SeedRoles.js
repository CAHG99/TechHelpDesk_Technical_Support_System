"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedRoles1730000000001 = void 0;
class SeedRoles1730000000001 {
    async up(queryRunner) {
        await queryRunner.manager.insert("role", [
            { id: 1, name: "ADMIN", isActive: true },
            { id: 2, name: "TECHNICIAN", isActive: true },
            { id: 3, name: "CUSTOMER", isActive: true },
        ]);
    }
    async down(queryRunner) {
        await queryRunner.manager.delete("role", {});
    }
}
exports.SeedRoles1730000000001 = SeedRoles1730000000001;
//# sourceMappingURL=1730000000001-SeedRoles.js.map