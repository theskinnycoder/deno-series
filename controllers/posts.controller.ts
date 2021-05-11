import { Controller, Get } from "https://deno.land/x/alosaur@v0.31.0/mod.ts";

@Controller("/posts")
export default class PostsController {
  @Get("/")
  getAll() {
    return "Hello, There!";
  }
}
