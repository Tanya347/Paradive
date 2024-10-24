import express from "express";
import {
  createComment,
  updateComment,
  deleteComment
} from "../controller/comments.js";
import { isOwner, protect } from "../controller/auth.js";
import Comment from "../models/Comment.js";
const router = express.Router();

router.post("/:post", protect, createComment);
router.put("/:id", protect, isOwner(Comment), updateComment);
router.delete('/:id', protect, isOwner(Comment), deleteComment);

export default router;
