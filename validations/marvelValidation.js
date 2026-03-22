const z = require("zod");
const mongoose = require("mongoose");

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
  characterId: z.custom(
    (id) => mongoose.isValidObjectId(id),
    "Invalid Id format",
  ),
});

const comicIdSchema = z.object({
  comicId: z.custom((id) => mongoose.isValidObjectId(id), "Invalid Id format"),
});

module.exports = {
  getCharactersSchema,
  getComicsSchema,
  characterIdSchema,
  comicIdSchema,
};
