import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", verifyAdmin, getUsers);

export default router;
