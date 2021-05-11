import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config({ safe: true, export: true });

export const PORT = +env.PORT!;
export const DB_URI = env.DB_URI!;
