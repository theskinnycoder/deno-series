import { Middleware } from "https://deno.land/x/oak/mod.ts";

const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.status;
    ctx.response.body = {
      message: err.message,
    };
  }
};

export default errorHandler;
