import { config } from "https://deno.land/x/dotenv/mod.ts";

config({ safe: true, export: true });

export const PORT = +Deno.env.get("PORT")!;
