import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { EnvConfiguration, validationSchema } from "./config";
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { ClientModule } from "./client/client.module";
import { TechnicianModule } from "./technician/technician.module";
import { TicketModule } from "./ticket/ticket.module";
import { HealthModule } from "./health/health.module";

let envFilePath = ".env.development";
if (process.env.ENVIRONMENT === "PRODUCTION") {
  envFilePath = ".env.production";
} else if (process.env.ENVIRONMENT === "TEST") {
  envFilePath = ".env.testing";
}

@Module({
  imports: [
    // * Settings
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      load: [EnvConfiguration],
      validationSchema: validationSchema,
    }),
    // * Database
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get("database.host"),
        port: config.get("database.port"),
        username: config.get("database.username"),
        password: config.get("database.password"),
        database: config.get("database.database"),
        autoLoadEntities: true,
        synchronize: config.get("database.synchronize"),
        migrations: [__dirname + "/migrations/*.ts"],
        migrationsRun: false,
      }),
    }),
    AuthModule,
    UserModule,
    RoleModule,
    CategoryModule,
    ClientModule,
    TechnicianModule,
    TicketModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
