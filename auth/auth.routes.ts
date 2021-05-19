import { Router } from "https://deno.land/x/oak/mod.ts";
import { login, logout, register } from "./auth.controller.ts";

import { protect } from "../auth/auth.middleware.ts";

const router = new Router();

router.prefix("/api/auth")
  .post("/register", register)
  .post("/login", login)
  .post("/logout", protect, logout);

export default router;
