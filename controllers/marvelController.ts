import type { Request, Response, NextFunction } from "express";

import { fetchAll, fetchById } from "../services/marvelService";
import { MarvelGetAll } from "../types/marvel";

const getAll =
  (route: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as MarvelGetAll;
      const response = await fetchAll(route, query);

      res.status(response.status).json(response.data);
    } catch (error) {
      next(error);
    }
  };

const getById =
  (route: string, paramId: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params[paramId];

      if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid parameter format" });
      }

      const response = await fetchById(route, id);

      res.json(response.data);
    } catch (error) {
      next(error);
    }
  };

export { getAll, getById };
