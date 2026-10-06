import net from "node:net";
import { config } from "./config.js";

export class FreeSwitchService {
  private socket: net.Socket | null = null;
  private buffer = "";
  private connected = false;
  private readonly waiters: Array<(value: string) => void> = [];

  async connect(): Promise<void> {
    if (this.connected) return;
    await new Promise<void>((resolve, reject) => {
      const socket = net.createConnection({ host: config.FREESWITCH_HOST, port: config.FREESWITCH_PORT });
      this.socket = socket;
      const timeout = setTimeout(() => { socket.destroy(); reject(new Error("FreeSWITCH ESL connection timeout")); }, 10000);
      socket.on("data", (chunk) => { this.buffer += chunk.toString("utf8"); this.consume(); });
      socket.once("error", reject);
      socket.once("close", () => { this.connected = false; this.socket = null; });
      socket.once("connect", () => clearTimeout(timeout));
      const onHandshake = (chunk: Buffer) => {
        const text = chunk.toString("utf8");
        if (text.includes("Content-Type: auth/request")) socket.write(`auth ${config.FREESWITCH_PASSWORD}\n\n`);
        if (text.includes("Reply-Text: +OK accepted")) { this.connected = true; socket.off("data", onHandshake); resolve(); }
      };
      socket.on("data", onHandshake);
    });
  }

  private consume(): void {
    while (true) {
      const separator = this.buffer.indexOf("\n\n");
      if (separator < 0) return;
      const frame = this.buffer.slice(0, separator);
      this.buffer = this.buffer.slice(separator + 2);
      const waiter = this.waiters.shift();
      if (waiter) waiter(frame);
    }
  }

  private async command(command: string): Promise<string> {
    if (!this.socket || !this.connected) throw new Error("FreeSWITCH ESL is not connected");
    const result = new Promise<string>((resolve) => this.waiters.push(resolve));
    this.socket.write(command + "\n\n");
    return result;
  }

  async status(): Promise<string> { return this.command("api status"); }
  async originateTestCall(): Promise<string> { return this.command("api originate loopback/9999 &park"); }
  close(): void { this.socket?.destroy(); this.socket = null; this.connected = false; }
}
