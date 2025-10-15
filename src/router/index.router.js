import express from "express";
import { checkApiKey } from "../middlewares/auth.middleware.js";
import auth from "./auth.router.js";
import users from "./users.router.js";
import tasks from "./tasks.router.js";
import timer from "./timer.router.js";
import { dbMiddleware } from "../middlewares/db.middleware.js";

export default function routerApi(app) {
  const router = express.Router();
  router.use(dbMiddleware);
  router.use(checkApiKey);
  app.use("/api/v1", router);
  router.use("/auth", auth);
  router.use("/users", users);
  router.use("/tasks", tasks);
  router.use("/timer", timer);
}
