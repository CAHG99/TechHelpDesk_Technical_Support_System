"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const Joi = __importStar(require("joi"));
exports.validationSchema = Joi.object({
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
    DB_CONTAINER_NAME: Joi.string().optional(),
    DB_LOCAL: Joi.number().optional(),
});
//# sourceMappingURL=validation.schema.js.map