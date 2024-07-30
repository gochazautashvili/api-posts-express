import express from "express";
import { getSavedPosts, save } from "../Controllers/Save";

const router = express.Router();

// GET
router.get("/:userId", getSavedPosts);

// POST
router.post("/:postId", save);

export default router;
