import express from "express";
import passport from "passport";
import { register, login } from "./../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/login", login);

export default router;
