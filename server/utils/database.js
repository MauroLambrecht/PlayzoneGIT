const Sequelize = require("sequelize");

const sequelize = new Sequelize("playzonedb", "root", "C3OlUIaQjd-vwTR-", {
  dialect: "mysql",
  host: "18.212.195.193",
  port: 3306,
  logging: false,
});

module.exports = sequelize;
