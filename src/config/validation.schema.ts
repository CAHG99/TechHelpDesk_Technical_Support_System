import * as Joi from 'joi';

export const validationSchema = Joi.object({
    // App
    APP_CONTAINER_NAME: Joi.string().optional(),
    APP_PORT: Joi.number(),
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),

    // Postgres 
    DB_CONTAINER_NAME: Joi.string().optional(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_LOCAL: Joi.number().optional(),

    // JWT
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().default('24h'),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
});