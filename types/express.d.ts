import { UserD0cument } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: UserDOcument;
    }
  }
}

export {};
