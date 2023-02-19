const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("tblusers", {
  IDUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastOnline: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  lastPasswordChange: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  clubId: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.findOneByEmail = async (email) => {
  return await User.findOne({
    where: { email },
    attributes: ["IDUser", "username", "email", "password"],
  });
};

User.sync().then(() => console.log("Table created!"));

module.exports = User;
