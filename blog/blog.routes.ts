import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  postCreate,
  postDelete,
  postDetails,
  postPut,
  postsIndex,
} from "./blog.controller.ts";

import { isAuthor, protect } from "../auth/auth.middleware.ts";

const router = new Router();

router.prefix("/api/blog")
  .get("/", protect, postsIndex)
  .get("/:id", protect, postDetails)
  .post("/", protect, isAuthor, postCreate)
  .put("/:id", protect, isAuthor, postPut)
  .delete("/:id", protect, isAuthor, postDelete);

export default router;
