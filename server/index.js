const express = require("express");
const port = 8080;
var cors = require("cors");
require("dotenv").config();

const sequelize = require("./utils/database.js");
const router = require("./routes/routes.js");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/joinlink/:gameId", (req, res) => {
  const { gameId } = req.params;
  console.log(gameId); // Check if the gameId is logged correctly

  // Redirect to the deep link URL with the game ID
  const deepLinkUrl = `playzone://joinGame/${gameId}`;
  res.redirect(deepLinkUrl);
});

app.use(router);

sequelize.sync();

app.listen(port, "0.0.0.0", () => console.log(`Listening on Port ${port}`));
