import type { Request, Response, NextFunction } from "express";

import {
  createUser,
  logUser,
  fetchFavoriteCharacters,
  pushFavoriteCharacter,
  removeFavoriteCharacter,
  fetchFavoriteComics,
  pushFavoriteComic,
  removeFavoriteComic,
} from "../services/userService";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await createUser(req.body);

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await logUser(req.body);

    return res.json(result.message);
  } catch (error) {
    next(error);
  }
};

const getFavoriteCharacters = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const favoriteCharacters = await fetchFavoriteCharacters(req.user);
    return res.json(favoriteCharacters);
  } catch (error) {
    next(error);
  }
};

const addFavoriteCharacter = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user.favorite_characters.includes(req.params.id)) {
      await pushFavoriteCharacter(req.user, req.params.id);
      return res.json({ message: "Character added to favorites" });
    } else {
      return res
        .status(409)
        .json({ message: "Character already in favorites" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteFavoriteCharacter = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user.favorite_characters.includes(req.params.id)) {
      const favoriteCharacters = await removeFavoriteCharacter(
        req.user,
        req.params.id,
      );
      return res.json(favoriteCharacters);
    } else {
      return res.status(400).json({ message: "Character not in favorites" });
    }
  } catch (error) {
    next(error);
  }
};

const getFavoriteComics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const favoriteComics = await fetchFavoriteComics(req.user);
    return res.json(favoriteComics);
  } catch (error) {
    next(error);
  }
};

const addFavoriteComic = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user.favorite_comics.includes(req.params.id)) {
      await pushFavoriteComic(req.user, req.params.id);
      return res.json({ message: "Comic added to favorites" });
    } else {
      return res.status(409).json({ message: "Comic already in favorites" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteFavoriteComic = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user.favorite_comics.includes(req.params.id)) {
      const favoriteComics = await removeFavoriteComic(req.user, req.params.id);
      return res.json(favoriteComics);
    } else {
      return res.status(400).json({ message: "Comic not in favorites" });
    }
  } catch (error) {
    next(error);
  }
};

export {
  signup,
  login,
  getFavoriteCharacters,
  addFavoriteCharacter,
  deleteFavoriteCharacter,
  getFavoriteComics,
  addFavoriteComic,
  deleteFavoriteComic,
};
