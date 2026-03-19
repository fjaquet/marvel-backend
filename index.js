require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(express.json());

const errorHandler = require("./middlewares/errorHandler");
const marvelRoutes = require("./routes/marvelRoutes");
const userRoutes = require("./routes/user");

app.use(marvelRoutes);
app.use(userRoutes);

app.get("/", (req, res, next) => {
  try {
    return res.json("Marvel backend");
  } catch (error) {
    next(error);
  }
});

app.all(/.*/, (req, res) => {
  return res.status(404).json({ message: "Page not found" });
});

app.use(errorHandler);

app.listen(process.env.HTTP_PORT || 3000, () => {
  console.log("server started");
});
