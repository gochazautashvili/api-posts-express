import express from "express";
import { getLikedPosts, like } from "../Controllers/Like";

const router = express.Router();

// GET
router.get("/:userId", getLikedPosts);

// POST
router.post("/:postId", like);

export default router;
