import mongoose from "mongoose";
import { z } from "zod";

const getCharactersSchema = z.object({
  limit: z.coerce.number().gte(0).optional(),
  skip: z.coerce.number().gte(0).optional(),
  name: z.string().optional(),
});

const getComicsSchema = z.object({
  limit: z.coerce.number().gte(0).optional(),
  skip: z.coerce.number().gte(0).optional(),
  title: z.string().optional(),
});

const characterIdSchema = z.object({
  characterId: z.custom<string>(
    (id) => mongoose.isValidObjectId(id),
    "Invalid Id format",
  ),
});

const comicIdSchema = z.object({
  comicId: z.custom<string>(
    (id) => mongoose.isValidObjectId(id),
    "Invalid Id format",
  ),
});

export {
  getCharactersSchema,
  getComicsSchema,
  characterIdSchema,
  comicIdSchema,
};
