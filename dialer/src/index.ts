import { FreeSwitchService } from "./freeswitch.js";
import { startServer } from "./server.js";

const fs = new FreeSwitchService();
await fs.connect();
await startServer(fs);

const shutdown = async () => {
  await fs.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
