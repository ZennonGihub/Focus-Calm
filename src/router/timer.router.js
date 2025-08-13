import express from "express";
import passport from "passport";

import {
  createTimer,
  startTimer,
  pauseTimer,
  resumeTimer,
  getTimerStatus,
  deleteTimer,
} from "./../controllers/timer.controller.js";

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), createTimer);
router.patch(
  "/:timerId/start",
  passport.authenticate("jwt", { session: false }),
  startTimer
);
router.patch(
  "/:timerId/pause",
  passport.authenticate("jwt", { session: false }),
  pauseTimer
);
router.patch(
  "/:timerId/resume",
  passport.authenticate("jwt", { session: false }),
  resumeTimer
);
router.get(
  "/:timerId",
  passport.authenticate("jwt", { session: false }),
  getTimerStatus
);
router.delete(
  "/:timerId",
  passport.authenticate("jwt", { session: false }),
  deleteTimer
);

export default router;
