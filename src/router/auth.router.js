import express from "express";
import passport from "passport";
import {
  register,
  login,
  profile,
  refresh,
} from "./../controllers/auth.controller.js";
import validarHandler from "./../middlewares/validatorHandler.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = express.Router();

router.post("/register", validarHandler(registerSchema, "body"), register);

router.post(
  "/login",
  validarHandler(loginSchema, "body"),
  passport.authenticate("local", { session: false }),
  login
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profile
);

router.post("/refresh", refresh);

export default router;
