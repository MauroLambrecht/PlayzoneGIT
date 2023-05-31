//maken een model
const upload = require("../middleware/multer.js");
const User = require("../models/user.js");
//library
const jwt = require("jsonwebtoken");
const fs = require("fs");

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
