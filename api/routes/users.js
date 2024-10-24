import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/users.js";
import { isOwner, protect, restrictTo } from "../controller/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.put("/:id", protect, isOwner(User), updateUser);
router.delete("/:id", protect, isOwner(User), deleteUser);
router.get("/:id", getUser);
router.get("/", protect, restrictTo('admin'), getUsers);

export default router;
