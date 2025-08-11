import express from "express";

import {
  findUser,
  find,
  remove,
  changeUser,
} from "./../controllers/users.controller.js";
import { checkApiKey } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(checkApiKey);

router.get("/findUser/:id", findUser);
router.get("/", find);
router.patch("/changeUser/:id", changeUser);
router.delete("/removedAccount/:id", remove);

export default router;
