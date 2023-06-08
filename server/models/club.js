const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Club = sequelize.define("club", {
  IDClub: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ClubName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  QRCode: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  CreateDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  MemberCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ClubToken: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Club;
