import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8080),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  FREESWITCH_HOST: z.string().min(1).default("freeswitch"),
  FREESWITCH_PORT: z.coerce.number().int().positive().default(8021),
  FREESWITCH_PASSWORD: z.string().min(1),
  MAX_CONCURRENCY: z.coerce.number().int().min(1).max(100).default(100)
});

export const config = envSchema.parse(process.env);
