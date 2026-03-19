require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const errorHandler = require("./middlewares/errorHandler");
const marvelRoutes = require("./routes/marvelRoutes");

app.use(marvelRoutes);

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

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
