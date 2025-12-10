export const EnvConfiguration = () => ({
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

    // Automatically sync entities with database schema (only in development).
    // WARNING: Never enable in production - use migrations instead
    synchronize: process.env.NODE_ENV !== "production",

    // Automatically load all entities registered in modules.
    autoLoadEntities: true,
  },

  // * JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
});
