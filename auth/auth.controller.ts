import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";
import User from "./User.model.ts";
import { COOKIE_NAME, JWT_SECRET } from "../utils/constants.ts";
import { create } from "https://deno.land/x/djwt@v2.2/mod.ts";
import { compare, hash } from "https://deno.land/x/bcrypt/mod.ts";

export const register = async (ctx: RouterContext) => {
  const { email, password } = await ctx.request.body().value;
  if (await User.where({ email }).first()) {
    ctx.throw(Status.BadRequest, "Email is taken.");
  }
  const newUser = new User();
  newUser.email = email;
  newUser.password = await hash(password);
  await newUser.save();
  const token = await create(
    { alg: "HS512", typ: "JWT" },
    { user: newUser.id },
    JWT_SECRET,
  );
  ctx.cookies.set(COOKIE_NAME, token);
  ctx.response.body = { data: newUser };
};

export const login = async (ctx: RouterContext) => {
  const { email, password } = await ctx.request.body().value;
  const user = await User.where({ email }).first();
  if (user) {
    if (await compare(password, user.password as string)) {
      const token = await create(
        { alg: "HS512", typ: "JWT" },
        { user: user.id },
        JWT_SECRET,
      );
      ctx.cookies.set(COOKIE_NAME, token);
      ctx.response.body = { data: user };
    } else ctx.throw(Status.Unauthorized, "Invalid Credentials.");
  } else ctx.throw(Status.BadRequest, "No Account found.");
};

export const logout = (ctx: RouterContext) => {
  if (ctx.state.user && ctx.cookies.get(JWT_SECRET)) {
    ctx.state.user = null;
    ctx.cookies.delete(COOKIE_NAME);
  } else ctx.throw(Status.BadRequest, "Already Logged Out");
};
