import { createServer } from "node:http";
import { config } from "./config.js";
import { pingDb } from "./db.js";
import { pingRedis } from "./redis.js";
import { FreeSwitchService } from "./freeswitch.js";

export function createHttpServer(fs: FreeSwitchService) {
  return createServer(async (req, res) => {
    try {
      if (req.method === "GET" && req.url === "/health") {
        await Promise.all([pingDb(), pingRedis(), fs.status()]);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
        return;
      }

      if (req.method === "GET" && req.url === "/freeswitch/status") {
        const status = await fs.status();
        res.writeHead(200, { "content-type": "text/plain" });
        res.end(status);
        return;
      }

      if (req.method === "POST" && req.url === "/freeswitch/test-call") {
        const result = await fs.originateTestCall();
        res.writeHead(202, { "content-type": "application/json" });
        res.end(JSON.stringify({ accepted: true, result }));
        return;
      }

      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "not_found" }));
    } catch (error) {
      console.error(error);
      res.writeHead(503, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "service_unavailable" }));
    }
  });
}

export async function startServer(fs: FreeSwitchService) {
  const server = createHttpServer(fs);
  await new Promise<void>((resolve) => server.listen(config.PORT, resolve));
  console.log(`FlowCRM dialer listening on :${config.PORT}`);
  return server;
}
