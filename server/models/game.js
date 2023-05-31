const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./user");

const Game = sequelize.define("tblgames", {
  IDGame: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  gameType: {
    type: DataTypes.ENUM("match", "freeplay", "shooting"),
    defaultValue: "match",
    allowNull: false,
  },
  gameStyle: {
    type: DataTypes.ENUM("1v1", "2v2", "3v3", "4v4", "5v5"),
    defaultValue: "1v1",
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  maxPlayers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currentPlayers: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  scoresThuisploeg: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  scoresBezoekers: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  finished: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  extraInfo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define the association between Game and User models
Game.belongsToMany(User, { through: "game_players", as: "Players" });
User.belongsToMany(Game, { through: "game_players", as: "Games" });

module.exports = Game;
