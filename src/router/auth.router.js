import express from "express";
import {
  register,
  login,
  changeUser,
} from "./../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/login", login);
router.patch("/changeUser/:id", changeUser);

export default router;
