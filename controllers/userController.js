const {
  createUser,
  logUser,
  fetchFavoriteCharacters,
  pushFavoriteCharacter,
  removeFavoriteCharacter,
  fetchFavoriteComics,
  pushFavoriteComic,
  removeFavoriteComic,
} = require("../services/userService");

const signup = async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await logUser(req.body);

    return res.json(result.message);
  } catch (error) {
    if (error.message.includes("Unauthorized")) {
      return res.status(401).json(error.message);
    } else {
      next(error);
    }
  }
};

const getFavoriteCharacters = async (req, res, next) => {
  try {
    const favoriteCharacters = await fetchFavoriteCharacters(req.user);
    return res.json(favoriteCharacters);
  } catch (error) {
    next(error);
  }
};

const addFavoriteCharacter = async (req, res, next) => {
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

const deleteFavoriteCharacter = async (req, res, next) => {
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

const getFavoriteComics = async (req, res, next) => {
  try {
    const favoriteComics = await fetchFavoriteComics(req.user);
    return res.json(favoriteComics);
  } catch (error) {
    next(error);
  }
};

const addFavoriteComic = async (req, res, next) => {
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

const deleteFavoriteComic = async (req, res, next) => {
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

module.exports = {
  signup,
  login,
  getFavoriteCharacters,
  addFavoriteCharacter,
  deleteFavoriteCharacter,
  getFavoriteComics,
  addFavoriteComic,
  deleteFavoriteComic,
};
