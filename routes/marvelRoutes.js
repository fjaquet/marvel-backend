const express = require("express");

const router = express.Router();
const { getAll, getById } = require("../controllers/marvelController");

const routesAll = ["/comics", "/characters"];

const routesById = [
  { route: "/comics", paramId: "characterId" },
  { route: "/comic", paramId: "comicId" },
  { route: "/character", paramId: "characterId" },
];

routesAll.forEach((route) => {
  router.get(route, getAll(route));
});

routesById.forEach((routeById) => {
  router.get(
    `${routeById.route}/:${routeById.paramId}`,
    getById(routeById.route, routeById.paramId),
  );
});

module.exports = router;
