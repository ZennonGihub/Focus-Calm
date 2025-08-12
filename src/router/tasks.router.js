import express from "express";
import {
  findTask,
  find,
  changeTask,
  remove,
  createTask,
} from "./../controllers/tasks.controller.js";
import { checkApiKey } from "../middlewares/auth.middleware.js";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(checkApiKey);

router.get(
  "/findtask/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("free", "premium"),
  findTask
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("free", "premium"),
  find
);
router.post(
  "/createtask",
  passport.authenticate("jwt", { session: false }),
  checkRoles("free", "premium"),
  createTask
);
router.patch(
  "/changetask/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("free", "premium"),
  changeTask
);
router.delete(
  "/removedtask/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("free", "premium"),
  remove
);

export default router;
