"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfiguration = void 0;
const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || "development",
    appPort: Number(process.env.APP_PORT) || 3000,
    appContainerName: process.env.APP_CONTAINER_NAME || null,
    database: {
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: process.env.NODE_ENV !== "production",
        autoLoadEntities: true,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
});
exports.EnvConfiguration = EnvConfiguration;
//# sourceMappingURL=app.config.js.map