import { Worker } from "bullmq";
import { config } from "./config.js";
import { redis } from "./redis.js";
import { FreeSwitchService } from "./freeswitch.js";

export const callWorker = (_fs: FreeSwitchService) => new Worker(
  "outbound-calls",
  async (job) => {
    const { destination } = job.data as { destination: string };
    console.log(JSON.stringify({ event: "call.requested", jobId: job.id, destination }));
    return { accepted: true, destination };
  },
  { connection: redis, concurrency: config.MAX_CONCURRENCY }
);
