import * as Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import configuration from './configuration';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  isGlobal: true,
  load: [configuration],
  validationSchema: Joi.object({
    APP_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    APP_PORT: Joi.number().required(),
    APP_FALLBACK_LANGUAGE: Joi.string().optional(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().optional(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
    JWT_PUBLIC_KEY_BASE64: Joi.string().required(),
    JWT_PRIVATE_KEY_BASE64: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXP_IN_SEC: Joi.number().required(),
    JWT_REFRESH_TOKEN_EXP_IN_SEC: Joi.number().required(),
    DEFAULT_ADMIN_USER_PASSWORD: Joi.string().required(),
    MAIL_HOST: Joi.string().required(),
    MAIL_PORT: Joi.number().required(),
    MAIL_USER: Joi.string().optional(),
    MAIL_PASSWORD: Joi.string().optional(),
    MAIL_IGNORE_TLS: Joi.boolean().required(),
    MAIL_SECURE: Joi.boolean().required(),
    MAIL_REQUIRE_TLS: Joi.boolean().required(),
    MAIL_DEFAULT_EMAIL: Joi.string().required(),
    MAIL_DEFAULT_NAME: Joi.string().required(),
    MAIL_CLIENT_PORT: Joi.number().required(),
  }),
};
