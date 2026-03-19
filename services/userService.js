const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

const createUser = async (data) => {
  const password = data.password;
  const salt = uid2(16);
  const hash = SHA256(password + salt).toString(encBase64);
  const token = uid2(64);

  const user = await User.create({
    email: data.email,
    username: data.username,
    favorite_characters: [],
    favorite_comics: [],
    token: token,
    hash: hash,
    salt: salt,
  });

  return {
    token: user.token,
  };
};

const logUser = async (data) => {
  const email = data.email;
  const password = data.password;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw { message: "Unauthorized" };
  }

  const hash = SHA256(password + user.salt).toString(encBase64);

  if (hash !== user.hash) {
    throw { message: "Unauthorized" };
  } else {
    return {
      message: {
        token: user.token,
      },
    };
  }
};

const fetchFavoriteCharacters = async (user) => {
  return {
    favorite_characters: user.favorite_characters,
  };
};

const pushFavoriteCharacter = async (user, characterId) => {
  const favoriteCharacters = user.favorite_characters;
  favoriteCharacters.push(characterId);
  const response = await User.findByIdAndUpdate(
    user._id,
    {
      favorite_characters: favoriteCharacters,
    },
    {
      returnDocument: "after",
    },
  ).select("favorite_characters");

  return { response };
};

const removeFavoriteCharacter = async (user, characterId) => {
  const favoriteCharacters = user.favorite_characters;
  const index = favoriteCharacters.indexOf(characterId);
  favoriteCharacters.splice(index, 1);

  const response = await User.findByIdAndUpdate(
    user._id,
    {
      favorite_characters: favoriteCharacters,
    },
    {
      returnDocument: "after",
    },
  ).select("favorite_characters");

  return { response };
};

const fetchFavoriteComics = async (user) => {
  return {
    favorite_comics: user.favorite_comics,
  };
};

const pushFavoriteComic = async (user, comicId) => {
  const favoriteComics = user.favorite_comics;
  favoriteComics.push(comicId);
  const response = await User.findByIdAndUpdate(
    user._id,
    {
      favorite_comics: favoriteComics,
    },
    {
      returnDocument: "after",
    },
  ).select("favorite_comics");

  return { response };
};

const removeFavoriteComic = async (user, comicId) => {
  const favoriteComics = user.favorite_comics;
  const index = favoriteComics.indexOf(comicId);
  favoriteComics.splice(index, 1);

  const response = await User.findByIdAndUpdate(
    user._id,
    {
      favorite_comics: favoriteComics,
    },
    {
      returnDocument: "after",
    },
  ).select("favorite_comics");

  return { response };
};

removeFavoriteComic;

module.exports = {
  createUser,
  logUser,
  fetchFavoriteCharacters,
  pushFavoriteCharacter,
  removeFavoriteCharacter,
  fetchFavoriteComics,
  pushFavoriteComic,
  removeFavoriteComic,
};
