const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Location = sequelize.define("location", {
  IDLocation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

module.exports = Location;
