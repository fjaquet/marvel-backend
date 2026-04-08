import express from "express";

const router = express.Router();
import {
  signup,
  login,
  getFavoriteCharacters,
  addFavoriteCharacter,
  deleteFavoriteCharacter,
  getFavoriteComics,
  addFavoriteComic,
  deleteFavoriteComic,
} from "../controllers/userController";

import isAuthenticated from "../middlewares/isAuthenticated";
import payloadValidator from "../middlewares/payloadValidator";
import { signupSchema, loginSchema } from "../validations/userValidation";

router.post("/user/signup", payloadValidator(signupSchema, "body"), signup);

router.post("/user/login", payloadValidator(loginSchema, "body"), login);

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

export default router;
