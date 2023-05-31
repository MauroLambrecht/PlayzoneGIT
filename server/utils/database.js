const Sequelize = require("sequelize");

const sequelize = new Sequelize("playzonedb", "root", "C3OlUIaQjd-vwTR-", {
  dialect: "mysql",
  host: "18.206.114.25",
  port: 3306,
  logging: false,
});

module.exports = sequelize;
