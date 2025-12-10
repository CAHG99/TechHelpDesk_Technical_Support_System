import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Database configuration
  DB_HOST: Joi.string().required().messages({
    'any.required': 'DB_HOST is required',
    'string.empty': 'DB_HOST cannot be empty',
  }),
  DB_PORT: Joi.number().port().default(5432).messages({
    'number.base': 'DB_PORT must be a number',
  }),
  DB_USERNAME: Joi.string().required().messages({
    'any.required': 'DB_USERNAME is required',
  }),
  DB_PASSWORD: Joi.string().required().messages({
    'any.required': 'DB_PASSWORD is required',
  }),
  DB_NAME: Joi.string().required().messages({
    'any.required': 'DB_NAME is required',
  }),

  // JWT configuration
  JWT_SECRET: Joi.string().min(32).required().messages({
    'any.required': 'JWT_SECRET is required',
    'string.min': 'JWT_SECRET must be at least 32 characters for security',
  }),
  JWT_EXPIRES_IN: Joi.string().default('1h').messages({
    'string.base': 'JWT_EXPIRES_IN must be a string (e.g., "1h", "15m")',
  }),
  JWT_REFRESH_SECRET: Joi.string().min(32).required().messages({
    'any.required': 'JWT_REFRESH_SECRET is required',
    'string.min': 'JWT_REFRESH_SECRET must be at least 32 characters for security',
  }),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d').messages({
    'string.base': 'JWT_REFRESH_EXPIRES_IN must be a string (e.g., "7d", "30d")',
  }),

  // Application configuration
  APP_PORT: Joi.number().port().default(3000).messages({
    'number.base': 'APP_PORT must be a number',
  }),
  APP_CONTAINER_NAME: Joi.string().optional(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development')
    .messages({
      'any.only': 'NODE_ENV must be one of: development, production, test',
    }),

  // Optional database fields
  DB_CONTAINER_NAME: Joi.string().optional(),
  DB_LOCAL: Joi.number().optional(),
});
