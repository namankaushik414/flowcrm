import IORedis from "ioredis";
import { config } from "./config.js";

export const redis = new IORedis(config.REDIS_URL, {
  maxRetriesPerRequest: null
});

export async function pingRedis(): Promise<void> {
  await redis.ping();
}
