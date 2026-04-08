import mongoose, { Schema, InferSchemaType, HydratedDocument } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  favorite_characters: {
    type: [String],
    default: [],
  },
  favorite_comics: {
    type: [String],
    default: [],
  },
  token: String,
  hash: String,
  salt: String,
});

type UserType = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<UserType>;

const User = mongoose.model<UserType>("User", userSchema);

export default User;
