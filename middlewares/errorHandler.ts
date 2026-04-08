import type { Request, Response, NextFunction } from "express";
import axios from "axios";
import { ZodError } from "zod";

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}

const isMongoDuplicateKey = (
  error: unknown,
): error is { code: 11000; keyValue?: Record<string, unknown> } =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  (error as { code: unknown }).code === 11000;

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (axios.isAxiosError(error) && error.response) {
    return res.status(error.response.status).json(error.response.data);
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      issues: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (isMongoDuplicateKey(error)) {
    const field = error.keyValue ? Object.keys(error.keyValue)[0] : "field";
    return res.status(409).json({
      message: `A record with this ${field} already exists`,
    });
  }

  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
