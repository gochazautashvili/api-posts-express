import express from "express";
import cors from "cors";
import compression from "compression";
import "dotenv/config";

import UserRouter from "./Routes/User";
import PostRouter from "./Routes/Post";
import LikeRouter from "./Routes/Like";
import SaveRouter from "./Routes/Save";
import { Auth } from "./Middleware/Auth";

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());

// api routes

app.use("/auth", UserRouter);
app.use("/posts", Auth, PostRouter);
app.use("/like", Auth, LikeRouter);
app.use("/save", Auth, SaveRouter);

// server

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
