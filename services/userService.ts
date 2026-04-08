import SHA256 from "crypto-js/sha256";
import encBase64 from "crypto-js/enc-base64";
import { randomBytes } from "node:crypto";

import User, { UserDocument } from "../models/User";

type CreateUser = {
  username: string;
  email: string;
  password: string;
};

type LogUser = {
  email: string;
  password: string;
};

const createUser = async (data: CreateUser) => {
  const password = data.password;
  const salt = randomBytes(8).toString("hex");
  const hash = SHA256(password + salt).toString(encBase64);
  const token = randomBytes(32).toString("hex");

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

const logUser = async (data: LogUser) => {
  const email = data.email;
  const password = data.password;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("Unauthorized");
  }

  const hash = SHA256(password + user.salt).toString(encBase64);

  if (hash !== user.hash) {
    throw new Error("Unauthorized");
  } else {
    return {
      message: {
        token: user.token,
      },
    };
  }
};

const fetchFavoriteCharacters = async (user: UserDocument) => {
  return {
    favorite_characters: user.favorite_characters,
  };
};

const pushFavoriteCharacter = async (
  user: UserDocument,
  characterId: string,
) => {
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

const removeFavoriteCharacter = async (
  user: UserDocument,
  characterId: string,
) => {
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

const fetchFavoriteComics = async (user: UserDocument) => {
  return {
    favorite_comics: user.favorite_comics,
  };
};

const pushFavoriteComic = async (user: UserDocument, comicId: string) => {
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

const removeFavoriteComic = async (user: UserDocument, comicId: string) => {
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

export {
  createUser,
  logUser,
  fetchFavoriteCharacters,
  pushFavoriteCharacter,
  removeFavoriteCharacter,
  fetchFavoriteComics,
  pushFavoriteComic,
  removeFavoriteComic,
};
