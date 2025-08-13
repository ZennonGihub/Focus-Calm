import express from "express";
import {
  findUser,
  find,
  remove,
  changeUser,
} from "./../controllers/users.controller.js";
import {
  updateUser,
  getUserIdSchema,
  deleteUser,
} from "./../schemas/users.schema.js";
import validarHandler from "./../middlewares/validator.middleware.js";
import { checkApiKey } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(checkApiKey);

router.get("/", passport.authenticate("jwt", { session: false }), find);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validarHandler(getUserIdSchema, "params"),
  checkRoles("free", "premium"),
  findUser
);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validarHandler(getUserIdSchema, "params"),
  validarHandler(updateUser, "body"),
  checkRoles("free", "premium"),
  changeUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validarHandler(deleteUser, "params"),
  checkRoles("free", "premium"),
  remove
);

export default router;
