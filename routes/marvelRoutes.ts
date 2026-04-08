import express from "express";

const router = express.Router();

import payloadValidator from "../middlewares/payloadValidator";

import { getAll, getById } from "../controllers/marvelController";
import {
  getCharactersSchema,
  getComicsSchema,
  characterIdSchema,
  comicIdSchema,
} from "../validations/marvelValidation";

const routesById = [
  {
    route: "/comics",
    paramId: "characterId",
    schemaValidation: characterIdSchema,
  },
  { route: "/comic", paramId: "comicId", schemaValidation: comicIdSchema },
  {
    route: "/character",
    paramId: "characterId",
    schemaValidation: characterIdSchema,
  },
];

router.get(
  "/comics",
  payloadValidator(getComicsSchema, "query"),
  getAll("/comics"),
);

router.get(
  "/characters",
  payloadValidator(getCharactersSchema, "query"),
  getAll("/characters"),
);

routesById.forEach((routeById) => {
  router.get(
    `${routeById.route}/:${routeById.paramId}`,
    payloadValidator(routeById.schemaValidation, "params"),
    getById(routeById.route, routeById.paramId),
  );
});

export default router;
