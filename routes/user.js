const express = require("express");

const router = express.Router();
const {
  signup,
  login,
  getFavoriteCharacters,
  addFavoriteCharacter,
  deleteFavoriteCharacter,
  getFavoriteComics,
  addFavoriteComic,
  deleteFavoriteComic,
} = require("../controllers/userController");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/user/signup", signup);

router.post("/user/login", login);

router.get("/user/favorite_characters", isAuthenticated, getFavoriteCharacters);
router.put(
  "/user/favorite_characters/:id",
  isAuthenticated,
  addFavoriteCharacter,
);
router.delete(
  "/user/favorite_characters/:id",
  isAuthenticated,
  deleteFavoriteCharacter,
);

router.get("/user/favorite_comics", isAuthenticated, getFavoriteComics);
router.put("/user/favorite_comics/:id", isAuthenticated, addFavoriteComic);
router.delete(
  "/user/favorite_comics/:id",
  isAuthenticated,
  deleteFavoriteComic,
);

module.exports = router;
