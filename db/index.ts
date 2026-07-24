import { config } from "dotenv";

config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle({ client: sql });

export { db };