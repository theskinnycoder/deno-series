import { COOKIE_NAME, JWT_SECRET } from "../utils/constants.ts";
import {
  Middleware,
  RouterContext,
  Status,
} from "https://deno.land/x/oak/mod.ts";
import { verify } from "https://deno.land/x/djwt@v2.2/mod.ts";
import User from "./User.model.ts";
import Post from "../blog/Post.model.ts";

export const protect: Middleware = async (ctx, next) => {
  const token = ctx.cookies.get(COOKIE_NAME);
  if (token) {
    const payload = await verify(token!, JWT_SECRET, "HS512");
    if (payload) {
      const user = await User.find(+payload);
      ctx.state.user = user;
      await next();
    } else ctx.throw(Status.Unauthorized, "UnAuthourized, Please login again.");
  } else ctx.throw(Status.Unauthorized, "UnAuthourized, Please login again.");
};

export const isAuthor = async (
  ctx: RouterContext,
  next: () => Promise<unknown>,
) => {
  const post = await Post.find(ctx.params.id!);
  if (ctx.state.user.id === post.author) await next();
  else {
    ctx.throw(
      Status.Forbidden,
      "Forbidden, You have no access over this utility.",
    );
  }
};
