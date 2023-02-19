const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Game = require("./game");
const User = require("./user");

const GamePlayer = sequelize.define("game_players", {
  IDGamePlayer: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  IDGame: {
    type: DataTypes.INTEGER,
    references: {
      model: Game,
      key: "IDGame",
    },
    onUpdate: "cascade",
    onDelete: "cascade",
    allowNull: false,
  },
  IDUser: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "IDUser",
    },
    onUpdate: "cascade",
    onDelete: "cascade",
    allowNull: false,
  },
});

module.exports = GamePlayer;
