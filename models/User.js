const mongoose = require("mongoose");

const User = mongoose.model("User", {
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

module.exports = User;
