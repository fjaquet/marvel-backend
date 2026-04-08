import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

import type { Request, Response, NextFunction } from "express";

if (!MONGODB_URI || typeof MONGODB_URI !== "string") {
  throw new Error("Missing required Mongodb env vars");
}

mongoose.connect(MONGODB_URI);

const app = express();
app.use(cors());
app.use(express.json());

import errorHandler from "./middlewares/errorHandler";
import marvelRoutes from "./routes/marvelRoutes";
import userRoutes from "./routes/user";

app.use(marvelRoutes);
app.use(userRoutes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json("hello");
  } catch (error) {
    next(error);
  }
});

app.all(/.*/, (req: Request, res: Response) => {
  return res.status(404).json({ message: "Page not found" });
});

app.use(errorHandler);

app.listen(process.env.HTTP_PORT || 3000, () => {
  console.log("server started");
});
