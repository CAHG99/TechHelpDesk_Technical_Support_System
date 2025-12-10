import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";

async function bootstrap() {
  // Create the NestJS application instance using the AppModule
  const app = await NestFactory.create(AppModule);

  // Security middleware - Helmet helps secure your app by setting various HTTP headers
  app.use(helmet());

  // Enable Cross-Origin Resource Sharing (CORS) for the app
  app.enableCors();

  // Set a global API prefix for all routes (e.g., /api/v1)
  app.setGlobalPrefix("api/v1");

  // Global validation for incoming requests
  // This ensures all DTOs are validated based on the defined validation rules
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically remove properties that do not exist in the DTO
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are found
      transform: true, // Automatically transform payloads into DTO instances
    }),
  );

  // Global Interceptor - Transforms the response format to a consistent structure
  app.useGlobalInterceptors(new TransformInterceptor());

  // Global Exception Filter - Handles HTTP exceptions globally (e.g., error formatting)
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger configuration - Sets up API documentation using Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle("API Usuarios") // Set API documentation title
    .setDescription("Documentación de la API de usuarios") // Set description
    .setVersion("1.0") // Set version number
    .addBearerAuth(
      {
        type: "http", // Use HTTP bearer authentication
        scheme: "bearer", // Bearer scheme for authorization
        bearerFormat: "JWT", // JWT token format
        name: "Authorization", // Header name
        in: "header", // Location of the token (header)
      },
      "access-token", // Bearer token key in the Swagger docs
    )
    .build();

  // Generate the Swagger document based on the configuration
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Set up Swagger UI at /api/docs route
  SwaggerModule.setup("api/docs", app, document);

  // Fetch the application port from configuration or use 3000 as default
  const config = app.get(ConfigService);
  const port = config.get<number>("appPort") || 3000;

  // Start the application server
  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}

// Call bootstrap to launch the application
bootstrap();
