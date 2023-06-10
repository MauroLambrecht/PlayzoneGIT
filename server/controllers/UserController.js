const { Op } = require("sequelize");
const User = require("../models/user");
const GamePlayer = require("../models/game_player");
const upload = require("../middleware/multer.js");
const fs = require("fs");
const bcrypt = require("bcryptjs");

exports.searchUsersByName = async (req, res, next) => {
  const searchString = req.params.name;
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // exclude password field
      where: {
        username: {
          [Op.like]: `%${searchString}%`,
        },
      },
    });
    res.status(200).json({
      users: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
};

//maak een export aan
exports.changeUser = async (req, res, next) => {
  //variabel const userID initialiseren
  const userID = req.userData.IDUser;
  const newusername = req.body.newusername;

  //find a user with the userid from the authentication
  const user = await User.findOne({
    where: {
      IDUser: userID,
    },
  });

  //update the username with the newusername where the id = id
  await User.update(
    { username: newusername },
    {
      where: {
        IDUser: userID,
      },
    }
  );

  if (user.username === newusername) {
    return res.status(400).json({
      message: "This is already your current username!",
    });
  }

  return res.status(200).json({
    message: "Your name is succesfully changed.",
  });
};

exports.changeEmail = async (req, res, next) => {
  const userID = req.userData.IDUser;
  const newEmail = req.body.newEmail;

  try {
    const user = await User.findOne({
      where: {
        IDUser: userID,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update the email with the newEmail where the IDUser = userID
    await User.update(
      { email: newEmail },
      {
        where: {
          IDUser: userID,
        },
      }
    );

    return res.status(200).json({
      message: "Your email has been successfully changed.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while changing the email",
    });
  }
};

exports.changePassword = async (req, res, next) => {
  const userID = req.userData.IDUser;
  const newPassword = req.body.newPassword;

  try {
    const user = await User.findOne({
      where: {
        IDUser: userID,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Hash the new password
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    // Update the password with the newPasswordHash where the IDUser = userID
    await User.update(
      { password: newPasswordHash },
      {
        where: {
          IDUser: userID,
        },
      }
    );

    return res.status(200).json({
      message: "Your password has been successfully changed.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while changing the password",
    });
  }
};

exports.changeProfilePicture = [
  upload.single("profilePicture"), // Use the Multer middleware to handle a single file upload with field name 'profilePicture'

  async (req, res, next) => {
    const userID = req.userData.IDUser;
    const newProfilePicture = req.file; // Use req.file instead of req.files.profilePicture

    try {
      if (!newProfilePicture) {
        return res.status(400).json({
          message: "No profile picture provided",
        });
      }

      const user = await User.findOne({
        where: {
          IDUser: userID,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const fileData = fs.readFileSync(newProfilePicture.path);

      // Update the profile picture with the fileData where the IDUser = userID
      await User.update(
        { profilePicture: fileData },
        {
          where: {
            IDUser: userID,
          },
        }
      );

      return res.status(200).json({
        message: "Your profile picture has been successfully changed.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "An error occurred while changing the profile picture",
      });
    }
  },
];

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

    const gameCount = await GamePlayer.count({
      where: {
        tbluserIDUser: userID,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user: user,
      gameCount: gameCount,
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

exports.getOtherProfilePicture = async (req, res, next) => {
  const IDUser = req.params.IDUser;

  try {
    const user = await User.findOne({
      where: {
        IDUser: IDUser,
      },
      attributes: ["profilePicture"],
    });

    if (!user || !user.profilePicture) {
      return res.status(404).json({
        message: "User or profile picture not found",
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
