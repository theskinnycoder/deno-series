import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import Post from "./Post.model.ts";

export const postsIndex = async (ctx: RouterContext) => {
  const allPosts = await Post.where({ author: ctx.state?.user.id }).all();
  ctx.response.body = { data: allPosts };
};

export const postDetails = async (ctx: RouterContext) => {
  const post = await Post.where({
    author: ctx.state?.user.id,
    id: +ctx.params.id!,
  }).first();
  ctx.response.body = { data: post };
};

export const postCreate = async (ctx: RouterContext) => {
  const newPost = await Post.create({
    author: ctx.state?.user.id,
    ...ctx.request.body,
  });
  ctx.response.body = { data: newPost };
};

export const postPut = async (ctx: RouterContext) => {
  let post = await Post.where({
    author: ctx.state?.user.id,
    id: +ctx.params.id!,
  }).first();
  post = await ctx.request.body().value;
  await post.update();
  ctx.response.body = { data: post };
};

export const postDelete = async (ctx: RouterContext) => {
  const post = await Post.where({
    author: ctx.state?.user.id,
    id: +ctx.params.id!,
  }).first();
  await post.delete();
  ctx.response.body = { data: post.id };
};
