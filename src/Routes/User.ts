import express from "express";
import {
  getAllUser,
  getUser,
  getUserById,
  Sign_in,
  Sign_up,
} from "../Controllers/User";
import { Auth } from "../Middleware/Auth";

const router = express.Router();

// GET
router.get("/", Auth, getUser);
router.get("/all", getAllUser);
router.get("/:userId", getUserById);

// POST
router.post("/sign-in", Sign_in);
router.post("/sign-up", Sign_up);

export default router;
