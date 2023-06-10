const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "u671679018_mauthodb",
  "u671679018_mautho",
  "$4dFgKT~Ec",
  {
    dialect: "mysql",
    host: "81.16.28.103",
    port: 3306,
    logging: false,
  }
);

module.exports = sequelize;
