import { Area } from "https://deno.land/x/alosaur@v0.31.0/mod.ts";
import PostsController from "../controllers/posts.controller.ts";

@Area({
  controllers: [PostsController],
})
export default class HomeArea {}
