import { PORT } from "./utils/constants.ts";
import connectDB from "./utils/connectDB.ts";
import blogRoutes from "./blog/blog.routes.ts";
import authRoutes from "./auth/auth.routes.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";

await connectDB();

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Routes
app.use(blogRoutes.routes());
app.use(authRoutes.routes());
app.use(blogRoutes.allowedMethods());
app.use(authRoutes.allowedMethods());

console.log(`Server up & running at http://localhost:${PORT}`);
await app.listen({ port: +PORT });
