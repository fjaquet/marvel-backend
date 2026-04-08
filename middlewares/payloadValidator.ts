import type { RequestHandler } from "express";
import z from "zod";

const payloadValidator = (
  schema: z.ZodTypeAny,
  payloadType: "body" | "query" | "params",
): RequestHandler => {
  return (req, _res, next) => {
    try {
      const result = schema.parse(req[payloadType]);
      Object.assign(req[payloadType], result);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default payloadValidator;
