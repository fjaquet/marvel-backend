const express = require("express");

const router = express.Router();

const payloadValidator = require("../middlewares/payloadValidator");
const { getAll, getById } = require("../controllers/marvelController");
const {
  getCharactersSchema,
  getComicsSchema,
  characterIdSchema,
  comicIdSchema,
} = require("../validations/marvelValidation");

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

module.exports = router;
