import { FreeSwitchService } from "./freeswitch.js";
import { startServer } from "./server.js";
import { callWorker } from "./worker.js";

const fs = new FreeSwitchService();
await fs.connect();
await startServer(fs);
const worker = callWorker(fs);

const shutdown = async () => {
  await worker.close();
  fs.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
