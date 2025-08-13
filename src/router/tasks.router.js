import express from "express";
import {
  findTask,
  find,
  changeTask,
  remove,
  createTask,
} from "./../controllers/tasks.controller.js";
import validarHandler from "../middlewares/validar.middleware.js";
import {
  createTaskSchema,
  getTaskIdSchema,
  updateTaskSchema,
  deleteTaskIdSchema,
} from "../schemas/tasks.schema.js";
import { checkApiKey } from "../middlewares/auth.middleware.js";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(checkApiKey);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validarHandler(getTaskIdSchema, "params"),
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
  "/",
  passport.authenticate("jwt", { session: false }),
  validarHandler(createTaskSchema, "body"),
  checkRoles("free", "premium"),
  createTask
);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validarHandler(getTaskIdSchema, "params"),
  validarHandler(updateTaskSchema, "body"),
  checkRoles("free", "premium"),
  changeTask
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validarHandler(deleteTaskIdSchema, "params"),
  checkRoles("free", "premium"),
  remove
);

export default router;
