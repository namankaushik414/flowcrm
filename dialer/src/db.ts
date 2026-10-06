import pg from "pg";
import { config } from "./config.js";

const { Pool } = pg;

export const db = new Pool({
  connectionString: config.DATABASE_URL,
  max: 20
});

export async function pingDb(): Promise<void> {
  await db.query("SELECT 1");
}
