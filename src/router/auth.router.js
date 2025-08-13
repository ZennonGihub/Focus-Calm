import express from "express";
import passport from "passport";
import { register, login, profile } from "./../controllers/auth.controller.js";
import { checkApiKey } from "../middlewares/auth.middleware.js";
import validarHandler from "./../middlewares/validatorHandler.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = express.Router();
router.use(checkApiKey);

router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  validarHandler(loginSchema, "body"),
  login
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  validarHandler(registerSchema, "body"),
  profile
);
export default router;
