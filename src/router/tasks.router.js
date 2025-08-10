import express from "express";
import {
  findTask,
  find,
  changeTask,
  remove,
  createTask,
} from "./../controllers/tasks.controller.js";
import { checkApiKey } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(checkApiKey);

router.get("/findtask/:id", findTask);
router.get("/", find);
router.post("/createtask/:id", createTask);
router.patch("/changetask/:id", changeTask);
router.delete("/removedtask/:id", remove);

export default router;
