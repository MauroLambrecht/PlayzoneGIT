const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");

exports.getUserInfo = async (req, res, next) => {
  const userID = req.userData.IDUser;

  try {
    const user = await User.findOne({
      where: {
        IDUser: userID,
      },
      attributes: [
        "IDUser",
        "username",
        "email",
        "firstname",
        "lastname",
        "tag",
        "level",
        "points",
        "clubId",
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while retrieving user information",
    });
  }
};

exports.getOtherUserInfo = async (req, res, next) => {
  const IDUser = req.params.IDUser;

  try {
    const user = await User.findOne({
      where: {
        IDUser: IDUser,
      },
      attributes: [
        "IDUser",
        "username",
        "email",
        "firstname",
        "lastname",
        "tag",
        "level",
        "points",
        "clubId",
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while retrieving user information",
    });
  }
};

exports.checkPassword = async (req, res, next) => {
  const userID = req.userData.IDUser;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        IDUser: userID,
      },
      attributes: ["password"],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // Compare the provided password with the user's hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    return res.status(200).json({
      isPasswordMatch: isPasswordMatch,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while checking the password",
    });
  }
};

exports.getProfilePicture = async (req, res, next) => {
  const userID = req.userData.IDUser;

  try {
    const user = await User.findOne({
      where: {
        IDUser: userID,
      },
      attributes: ["profilePicture"],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const profilePictureData = user.profilePicture;
    const base64String = Buffer.from(profilePictureData, "binary").toString(
      "base64"
    );

    return res.status(200).send(base64String);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while retrieving the profile picture",
    });
  }
};
