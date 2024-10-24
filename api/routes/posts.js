import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controller/posts.js";
import { isOwner, protect } from "../controller/auth.js";
import Post from "../models/Post.js";

const router = express.Router();

router.post("/", protect, createPost);
router.put("/:id", protect, isOwner(Post), updatePost);
router.delete("/:id", protect, isOwner(Post), deletePost);
router.get("/:id", getPost);
router.get("/", getPosts);

export default router;
