import type { Request, Response, NextFunction } from "express";

import User from "../models/User";
import { HttpError } from "./errorHandler";

const isAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpError(401, "Invalid token format");
    }

    const token = authHeader.replace("Bearer ", "");
    const user = await User.findOne({ token });

    if (!user) {
      throw new HttpError(401, "Unauthorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;
