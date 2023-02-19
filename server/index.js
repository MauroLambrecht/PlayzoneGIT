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

app.use(router);

sequelize.sync();

app.listen(port, () => console.log(`Listening on Port ${port}`));
