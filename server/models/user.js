// user.model.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("tblusers", {
  IDUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
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
  tag: {
    type: DataTypes.INTEGER(8),
    allowNull: true,
    unique: true,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true,
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

User.beforeCreate(async (user) => {
  let uniqueNumber = "";
  let numberExists = true;
  while (numberExists) {
    uniqueNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
    const userWithNumber = await User.findOne({
      where: { tag: uniqueNumber },
      attributes: ["IDUser"],
    });
    if (!userWithNumber) {
      numberExists = false;
    }
  }
  user.tag = uniqueNumber;
});

User.findOneByEmail = async (email) => {
  return await User.findOne({
    where: { email },
    attributes: ["IDUser", "username", "email", "password", "tag"],
  });
};

User.sync().then(() => console.log("Table created!"));

module.exports = User;
