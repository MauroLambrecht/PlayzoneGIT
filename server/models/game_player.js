const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

// Reorder the require statements
const Game = require("./game");
const User = require("./user");

const GamePlayer = sequelize.define("game_players", {
  IDGamePlayer: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tblgameIDGame: {
    // Update the column name
    type: DataTypes.INTEGER,
    references: {
      model: Game,
      key: "IDGame",
    },
    onUpdate: "cascade",
    onDelete: "cascade",
    allowNull: false,
  },
  tbluserIDUser: {
    // Update the column name
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "IDUser",
    },
    onUpdate: "cascade",
    onDelete: "cascade",
    allowNull: false,
  },
  teamSide: {
    type: DataTypes.ENUM("home", "out"),
    defaultValue: "home",
    allowNull: false,
  },
  winner: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

GamePlayer.belongsTo(User, { foreignKey: "tbluserIDUser" });

module.exports = GamePlayer;
