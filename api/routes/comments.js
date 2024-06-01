import express from "express";
import {
  createComment,
} from "../controller/comments.js";

const router = express.Router();

router.post("/", createComment);

export default router;
