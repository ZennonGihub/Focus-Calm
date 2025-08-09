import express from "express";
import { findUser, find, remove } from "./../controllers/users.controller.js";

const router = express.Router();

router.get("/findUser/:id", findUser);
router.get("/", find);
router.delete("/removedAccount/:id", remove);

export default router;
