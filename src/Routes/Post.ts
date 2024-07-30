import express from "express";
import {
  createPost,
  deletePostById,
  getAllPost,
  getFilteredPosts,
  getPostById,
  getUserPosts,
  updatePostById,
} from "../Controllers/Post";

const router = express.Router();

// GET
router.get("/", getAllPost);
router.get("/single/:postId", getPostById);
router.get("/search", getFilteredPosts);
router.get("/own/:userId", getUserPosts);

// POST
router.post("/", createPost);
router.delete("/:postId", deletePostById);
router.patch("/:postId", updatePostById);

export default router;
