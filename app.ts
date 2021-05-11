import { PORT } from "./utils/constants.ts";
import connectDB from "./utils/connectDB.ts";
import { App } from "https://deno.land/x/alosaur@v0.31.0/mod.ts";

import PostsArea from "./areas/posts.area.ts";

await connectDB();

const app = new App({
  areas: [PostsArea],
  logging: true,
});

await app.listen({ port: PORT });
