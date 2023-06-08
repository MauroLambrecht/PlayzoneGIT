const Sequelize = require("sequelize");

const sequelize = new Sequelize("u671679018_mauthodb", "u671679018_mautho", "$4dFgKT~Ec", {
  dialect: "mysql",
  host: "https://auth-db288.hstgr.io/index.php?db=u671679018_mauthodb",
  port: 3306,
  logging: false,
});

module.exports = sequelize;
