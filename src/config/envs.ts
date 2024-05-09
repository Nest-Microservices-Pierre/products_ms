import 'dotenv/config';
import * as joi from 'joi';

interface envConfig {
  TRANSPORT: any;
  PORT: number;
  DATABASE_URL: string;
}

const envsSchema: joi.ObjectSchema = joi
  .object({
    PORT: joi.number().required().default(3000),
    DATABASE_URL: joi.string().required(),
    TRANSPORT: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envConfig: envConfig = value;

export const envs = {
  port: envConfig.PORT,
  baseUrl: envConfig.DATABASE_URL,
  transport: envConfig.TRANSPORT,
};
