import { EslClient } from "freeswitch-esl-node";
import { config } from "./config.js";

export class FreeSwitchService {
  private readonly client = new EslClient({
    host: config.FREESWITCH_HOST,
    port: config.FREESWITCH_PORT,
    password: config.FREESWITCH_PASSWORD,
    subscribe: ["CHANNEL_CREATE", "CHANNEL_ANSWER", "CHANNEL_HANGUP_COMPLETE"],
    reconnect: { retries: Infinity, delayMs: 1000, maxDelayMs: 30000 }
  });

  async connect(): Promise<void> {
    await this.client.connect();

    this.client.on("CHANNEL_ANSWER", (event) => {
      console.log(JSON.stringify({
        type: "freeswitch.channel_answer",
        uuid: event["Unique-ID"],
        number: event["Caller-Destination-Number"]
      }));
    });

    this.client.on("CHANNEL_HANGUP_COMPLETE", (event) => {
      console.log(JSON.stringify({
        type: "freeswitch.channel_hangup",
        uuid: event["Unique-ID"],
        cause: event["Hangup-Cause"]
      }));
    });
  }

  async status(): Promise<string> {
    return this.client.api("status");
  }

  async originateTestCall(): Promise<string> {
    // Local-only verification. This never contacts a carrier.
    // Extension 9999 is defined in the V1 test dialplan.
    return this.client.bgapi(
      "originate {origination_caller_id_number=1000000000}loopback/9999 &park"
    );
  }

  async close(): Promise<void> {
    this.client.close();
  }
}
