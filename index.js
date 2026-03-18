require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const errorHandler = require("./middlewares/errorHandler");
const marvelRoutes = require("./routes/marvelRoutes");

app.use(marvelRoutes);

app.all(/.*/, (req, res) => {
  return res.status(404).json({ message: "Page not found" });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("server started");
});
