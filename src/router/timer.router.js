import express from "express";
import passport from "passport";
import validarHandler from "./../middlewares/validatorHandler.middleware.js";
import {
  createTimer,
  startTimer,
  pauseTimer,
  resumeTimer,
  getTimerStatus,
  deleteTimer,
} from "./../controllers/timer.controller.js";
import { checkApiKey } from "../middlewares/auth.middleware.js";
import { checkRoles } from "../middlewares/auth.middleware.js";
import {
  createTimerSchema,
  timerIdParamSchema,
} from "./../schemas/timer.schema.js";

const router = express.Router();
router.use(checkApiKey);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validarHandler(createTimerSchema, "body"),
  checkRoles("free", "premium"),
  createTimer
);
router.patch(
  "/:timerId/start",
  passport.authenticate("jwt", { session: false }),
  validarHandler(timerIdParamSchema, "params"),
  checkRoles("free", "premium"),
  startTimer
);
router.patch(
  "/:timerId/pause",
  passport.authenticate("jwt", { session: false }),
  validarHandler(timerIdParamSchema, "params"),
  checkRoles("free", "premium"),

  pauseTimer
);
router.patch(
  "/:timerId/resume",
  passport.authenticate("jwt", { session: false }),
  validarHandler(timerIdParamSchema, "params"),
  checkRoles("free", "premium"),
  resumeTimer
);
router.get(
  "/:timerId",
  passport.authenticate("jwt", { session: false }),
  validarHandler(timerIdParamSchema, "params"),
  checkRoles("free", "premium"),
  getTimerStatus
);
router.delete(
  "/:timerId",
  passport.authenticate("jwt", { session: false }),
  validarHandler(timerIdParamSchema, "params"),
  checkRoles("free", "premium"),
  deleteTimer
);

export default router;
