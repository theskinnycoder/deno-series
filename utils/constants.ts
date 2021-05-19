import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config({ safe: true, export: true });

export const { PORT, DB_URI, JWT_SECRET, COOKIE_NAME } = env;
